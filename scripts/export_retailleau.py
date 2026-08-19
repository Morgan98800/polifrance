import struct
import subprocess
import os

def crop_and_export():
    with open('./scripts/downloaded/retailleau_full.tga', 'rb') as f:
        data = f.read()

    w = struct.unpack('<H', data[12:14])[0]
    h = struct.unpack('<H', data[14:16])[0]
    desc = data[17]
    is_top_to_bottom = bool(desc & 0x20)
    idx = 18 + data[0]
    bpp = data[16]
    bytes_per_pixel = bpp // 8

    pixels = []
    total = w * h
    image_type = data[2]
    if image_type == 10: # RLE
        while len(pixels) < total and idx < len(data):
            pkt = data[idx]
            idx += 1
            count = (pkt & 0x7f) + 1
            if pkt & 0x80:
                b, g, r = data[idx], data[idx+1], data[idx+2]
                idx += bytes_per_pixel
                pixels.extend([(r, g, b)] * count)
            else:
                for _ in range(count):
                    b, g, r = data[idx], data[idx+1], data[idx+2]
                    idx += bytes_per_pixel
                    pixels.append((r, g, b))
    else:
        for _ in range(total):
            b, g, r = data[idx], data[idx+1], data[idx+2]
            idx += bytes_per_pixel
            pixels.append((r, g, b))

    rows = []
    for y in range(h):
        rows.append(pixels[y*w : (y+1)*w])

    if not is_top_to_bottom:
        rows.reverse()

    # Exact inner frame coordinates without any border artifact
    min_x, max_x = 42, 516
    min_y, max_y = 86, 580

    crop_w = max_x - min_x + 1
    crop_h = max_y - min_y + 1

    cropped_rows = []
    for y in range(min_y, max_y + 1):
        cropped_rows.append(rows[y][min_x : max_x + 1])

    # Save to uncompressed TGA
    temp_cropped_tga = "./scripts/downloaded/retailleau_cropped.tga"
    header = bytearray([
        0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        crop_w & 0xff, (crop_w >> 8) & 0xff,
        crop_h & 0xff, (crop_h >> 8) & 0xff,
        24, 0x20
    ])
    raw = bytearray()
    for y in range(crop_h):
        for x in range(crop_w):
            r, g, b = cropped_rows[y][x]
            raw.extend([b, g, r])

    with open(temp_cropped_tga, 'wb') as f:
        f.write(header)
        f.write(raw)

    # Convert to public/bruno_retailleau.jpg (512x512)
    subprocess.run(["sips", "-s", "format", "jpeg", "-z", "512", "512", temp_cropped_tga, "--out", "./public/bruno_retailleau.jpg"], check=True)
    print("Successfully exported clean public/bruno_retailleau.jpg!")

if __name__ == '__main__':
    crop_and_export()
