import subprocess
import struct
import os

def crop_retailleau_portrait():
    input_png = "/Users/morgancanteri/.gemini/antigravity/brain/fa4454d3-c724-4523-8391-54a21ae57653/.user_uploaded/media_1787150209968.png"
    temp_tga = "./scripts/downloaded/retailleau_full.tga"
    os.makedirs("./scripts/downloaded", exist_ok=True)

    # Convert PNG to uncompressed or RLE TGA with sips
    subprocess.run(["sips", "-s", "format", "tga", input_png, "--out", temp_tga], check=True)

    with open(temp_tga, 'rb') as f:
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

    # Check if RLE
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

    # Find the square border of the left portrait box
    # The portrait has a dark/black outer border around x in [30..50], y in [80..100]
    # Let's detect the bounding box of the main square on the left:
    # Outer border is dark (near black), inside is deep red (r > 100, g < 30, b < 30)
    
    # Let's scan for the top-left corner of the black frame
    min_x, min_y, max_x, max_y = None, None, None, None

    for y in range(50, 200):
        for x in range(30, 100):
            # Check for black border corner
            if rows[y][x][0] < 30 and rows[y][x][1] < 30 and rows[y][x][2] < 30:
                # Check if it continues horizontally and vertically as a black line
                is_h_line = all(rows[y][x+k][0] < 40 for k in range(50))
                is_v_line = all(rows[y+k][x][0] < 40 for k in range(50))
                if is_h_line and is_v_line and min_x is None:
                    min_x, min_y = x, y
                    break
        if min_x is not None:
            break

    print(f"Top-left corner found at: x={min_x}, y={min_y}")

    # Find bottom-right corner of this square frame
    for y in range(min_y + 300, h):
        if rows[y][min_x][0] < 40:
            is_h_bottom = all(rows[y][min_x+k][0] < 40 for k in range(50))
            if is_h_bottom:
                max_y = y
        else:
            if max_y is not None:
                break

    for x in range(min_x + 300, w):
        if rows[min_y][x][0] < 40:
            is_v_right = all(rows[min_y+k][x][0] < 40 for k in range(50))
            if is_v_right:
                max_x = x
        else:
            if max_x is not None:
                break

    print(f"Bottom-right corner found at: x={max_x}, y={max_y}")

    crop_w = max_x - min_x + 1
    crop_h = max_y - min_y + 1
    print(f"Crop size: {crop_w} x {crop_h}")

    cropped_rows = []
    for y in range(min_y, max_y + 1):
        cropped_rows.append(rows[y][min_x : max_x + 1])

    # Write cropped image to uncompressed TGA
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

    # Convert to public/bruno_retailleau.jpg (and scale up crisply to 512x512)
    subprocess.run(["sips", "-s", "format", "jpeg", "-z", "512", "512", temp_cropped_tga, "--out", "./public/bruno_retailleau.jpg"], check=True)
    print("Successfully cropped and saved ./public/bruno_retailleau.jpg")

if __name__ == '__main__':
    crop_retailleau_portrait()
