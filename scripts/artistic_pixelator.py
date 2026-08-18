import subprocess
import os
import math
import struct

def read_tga_rle(tga_path):
    with open(tga_path, 'rb') as f:
        data = f.read()
    
    id_length = data[0]
    w = struct.unpack('<H', data[12:14])[0]
    h = struct.unpack('<H', data[14:16])[0]
    bpp = data[16]
    desc = data[17]
    is_top_to_bottom = bool(desc & 0x20)
    bytes_per_pixel = bpp // 8

    idx = 18 + id_length
    pixels = []
    total = w * h

    while len(pixels) < total and idx < len(data):
        pkt_header = data[idx]
        idx += 1
        count = (pkt_header & 0x7f) + 1
        if pkt_header & 0x80: # RLE packet
            b, g, r = data[idx], data[idx+1], data[idx+2]
            idx += bytes_per_pixel
            pixels.extend([(r, g, b)] * count)
        else: # Raw packet
            for _ in range(count):
                b, g, r = data[idx], data[idx+1], data[idx+2]
                idx += bytes_per_pixel
                pixels.append((r, g, b))

    rows = []
    for y in range(h):
        rows.append(pixels[y*w : (y+1)*w])

    if not is_top_to_bottom:
        rows.reverse()
    return w, h, rows

def write_tga_uncompressed(w, h, pixels, output_tga):
    header = bytearray([
        0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        w & 0xff, (w >> 8) & 0xff,
        h & 0xff, (h >> 8) & 0xff,
        24, 0x20 # 24 bpp, top-to-bottom
    ])
    raw = bytearray()
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[y][x]
            raw.extend([b, g, r])

    with open(output_tga, 'wb') as f:
        f.write(header)
        f.write(raw)

def quantize_val(v, steps):
    step_size = 255 / (steps - 1)
    return int(round(v / step_size) * step_size)

def process_character(input_jpg, output_jpg, character_name):
    # 1. Downscale to 48x48 TGA using sips
    temp_small_tga = f"./scripts/downloaded/temp_{character_name}_48.tga"
    subprocess.run(["sips", "-z", "48", "48", input_jpg, "-s", "format", "tga", "--out", temp_small_tga], check=True)

    W, H, raw_pixels = read_tga_rle(temp_small_tga)

    # Clean Solid Arcade Background matching Attal & Philippe (Dark Slate Blue)
    ARCADE_BG = (24, 28, 38)
    processed = [[ARCADE_BG for _ in range(W)] for _ in range(H)]

    cx, cy = W // 2, H // 2

    for y in range(H):
        for x in range(W):
            r, g, b = raw_pixels[y][x]
            lum = (r * 0.299 + g * 0.587 + b * 0.114)
            dist_to_center = math.hypot(x - cx, y - cy)

            # Background detection: if near border and bright/neutral or far from center
            is_bg = (x < 6 or x > W - 7 or y < 4) and (lum > 170 or lum < 40 or dist_to_center > 21)

            if is_bg and dist_to_center > 17:
                processed[y][x] = ARCADE_BG
            else:
                is_skin = (r > g) and (g > b) and (r > 105) and (b < 190) and (y > 8)

                if is_skin:
                    if lum > 195:
                        nr, ng, nb = 246, 210, 190 # highlight
                    elif lum > 155:
                        nr, ng, nb = 232, 180, 155 # midtone
                    elif lum > 115:
                        nr, ng, nb = 205, 145, 120 # shadow
                    else:
                        nr, ng, nb = 168, 110, 90  # deep shadow
                elif character_name == 'retailleau' and y < 16:
                    # Silver/Grey hair for Retailleau
                    if lum > 140:
                        nr, ng, nb = 215, 220, 230
                    elif lum > 100:
                        nr, ng, nb = 170, 175, 185
                    else:
                        nr, ng, nb = 120, 125, 135
                elif character_name == 'glucksmann' and y < 17 and not is_skin:
                    # Dark wavy hair for Glucksmann
                    if lum > 65:
                        nr, ng, nb = 58, 48, 42
                    else:
                        nr, ng, nb = 28, 22, 18
                elif lum < 90 and y > 24:
                    # Navy/Dark suit
                    if lum > 50:
                        nr, ng, nb = 30, 44, 72
                    else:
                        nr, ng, nb = 14, 20, 36
                else:
                    nr = quantize_val(r, 4)
                    ng = quantize_val(g, 4)
                    nb = quantize_val(b, 4)

                processed[y][x] = (nr, ng, nb)

    # 2. Glasses for Retailleau
    if character_name == 'retailleau':
        GLASSES = (20, 22, 30)
        # Left rim
        for x in range(17, 23):
            processed[16][x] = GLASSES
            processed[20][x] = GLASSES
        processed[17][17] = GLASSES
        processed[18][17] = GLASSES
        processed[19][17] = GLASSES
        processed[17][22] = GLASSES
        processed[18][22] = GLASSES
        processed[19][22] = GLASSES
        # Bridge
        processed[18][23] = GLASSES
        processed[18][24] = GLASSES
        # Right rim
        for x in range(25, 31):
            processed[16][x] = GLASSES
            processed[20][x] = GLASSES
        processed[17][25] = GLASSES
        processed[18][25] = GLASSES
        processed[19][25] = GLASSES
        processed[17][30] = GLASSES
        processed[18][30] = GLASSES
        processed[19][30] = GLASSES

    # 3. Save to temp uncompressed TGA and upscale cleanly with sips
    temp_out_tga = f"./scripts/downloaded/temp_{character_name}_out.tga"
    write_tga_uncompressed(W, H, processed, temp_out_tga)

    subprocess.run(["sips", "-z", "512", "512", temp_out_tga, "-s", "format", "jpeg", "--out", output_jpg], check=True)
    
    for f_clean in [temp_small_tga, temp_out_tga]:
        if os.path.exists(f_clean):
            os.remove(f_clean)
    print(f"Generated clean arcade pixel sprite for {character_name} -> {output_jpg}")

if __name__ == '__main__':
    process_character('./scripts/downloaded/sq_retailleau.jpg', './public/bruno_retailleau.jpg', 'retailleau')
    process_character('./scripts/downloaded/sq_glucksmann.jpg', './public/raphael_glucksmann.jpg', 'glucksmann')
