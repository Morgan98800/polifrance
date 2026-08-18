import struct
import subprocess
import os

def create_bmp_pixel_art(width, height, pixel_grid, output_bmp_path):
    # BMP 24-bit RGB
    row_padding = (4 - (width * 3) % 4) % 4
    image_size = (width * 3 + row_padding) * height
    file_size = 54 + image_size

    # Header
    bmp_header = struct.pack('<2sIHHI', b'BM', file_size, 0, 0, 54)
    # DIB Header (BITMAPINFOHEADER)
    dib_header = struct.pack('<IIIHHIIIIII', 40, width, height, 1, 24, 0, image_size, 2835, 2835, 0, 0)

    with open(output_bmp_path, 'wb') as f:
        f.write(bmp_header)
        f.write(dib_header)
        
        # BMP stores rows bottom-to-top
        for y in range(height - 1, -1, -1):
            row_data = bytearray()
            for x in range(width):
                r, g, b = pixel_grid[y][x]
                # BMP is BGR
                row_data.extend([b, g, r])
            row_data.extend([0] * row_padding)
            f.write(row_data)

def render_portrait(character_type, output_jpg_path):
    W, H = 48, 48
    # Default retro background gradient (slate/dark blue arcade background)
    grid = [[(20, 26, 38) for _ in range(W)] for _ in range(H)]

    # Background gradient
    for y in range(H):
        for x in range(W):
            shade = int(18 + y * 0.5)
            grid[y][x] = (shade - 5, shade, shade + 15)

    if character_type == 'retailleau':
        # Bruno Retailleau:
        # Hair: Silver/Grey (180, 185, 195)
        # Face: Pale Caucasian skin (235, 200, 180), shading (205, 165, 145)
        # Suit: Deep Navy (15, 25, 50), Lapels (25, 38, 70), Shirt (245, 245, 250), Tie (30, 80, 180)
        
        # Shoulders / Suit (y: 28 to 47)
        for y in range(28, 48):
            spread = int((y - 28) * 1.3) + 10
            for x in range(24 - spread, 24 + spread + 1):
                if 0 <= x < W:
                    grid[y][x] = (18, 28, 55)

        # Suit lapels & shading
        for y in range(30, 48):
            grid[y][24 - int((y-30)*0.4) - 4] = (28, 44, 82)
            grid[y][24 + int((y-30)*0.4) + 4] = (28, 44, 82)

        # White Shirt (V-neck at chest)
        for y in range(27, 42):
            w_w = max(1, 6 - int((y - 27) * 0.45))
            for x in range(24 - w_w, 24 + w_w + 1):
                grid[y][x] = (245, 245, 250)

        # Blue Tie
        for y in range(29, 48):
            tie_w = 1 if y < 35 else 2
            for x in range(24 - tie_w, 24 + tie_w + 1):
                grid[y][x] = (25, 75, 175)
                # Tie highlight
                grid[y][24] = (45, 105, 215)

        # Neck (y: 24 to 28)
        for y in range(24, 29):
            for x in range(21, 27):
                grid[y][x] = (210, 170, 150)
            grid[y][21] = (185, 145, 125) # neck shadow

        # Head / Face shape (y: 11 to 25, x: 16 to 31)
        for y in range(11, 25):
            face_w = 6
            if y < 13: face_w = 5
            if y > 21: face_w = 5 - (y - 21)
            for x in range(24 - face_w, 24 + face_w + 1):
                grid[y][x] = (240, 205, 185) # Base skin

        # Face shading / Jawline
        for y in range(15, 25):
            grid[y][24 - 6 if y <= 21 else 24 - (5-(y-21))] = (210, 170, 150)
            grid[y][24 + 6 if y <= 21 else 24 + (5-(y-21))] = (210, 170, 150)
        for x in range(22, 26):
            grid[24][x] = (195, 155, 135) # chin shadow

        # Ears (y: 16 to 20)
        grid[17][17] = (225, 185, 165)
        grid[18][17] = (210, 170, 150)
        grid[17][30] = (225, 185, 165)
        grid[18][30] = (210, 170, 150)

        # Eyes & Eyebrows (y: 16-17)
        # Eyebrows (Silver-grey/dark)
        for x in range(19, 23): grid[15][x] = (140, 145, 155)
        for x in range(25, 29): grid[15][x] = (140, 145, 155)
        # Eyes
        grid[17][20] = (25, 25, 30)
        grid[17][21] = (40, 50, 60)
        grid[17][27] = (25, 25, 30)
        grid[17][28] = (40, 50, 60)
        # Eye whites
        grid[17][19] = (250, 250, 250)
        grid[17][26] = (250, 250, 250)

        # Nose (y: 18-20)
        grid[18][24] = (220, 180, 160)
        grid[19][24] = (215, 175, 155)
        grid[20][23] = (205, 165, 145)
        grid[20][24] = (195, 155, 135)

        # Mouth (y: 22)
        for x in range(22, 26):
            grid[22][x] = (180, 120, 110)
        grid[22][24] = (160, 100, 95)

        # Hair: Bruno Retailleau (neat, silver/grey combed back) (y: 7 to 14)
        for y in range(7, 14):
            hair_w = 7
            if y == 7: hair_w = 4
            elif y == 8: hair_w = 6
            for x in range(24 - hair_w, 24 + hair_w + 1):
                # Silver / Grey gradient highlights
                if y <= 9:
                    grid[y][x] = (215, 220, 230) if (x + y) % 2 == 0 else (185, 190, 200)
                else:
                    grid[y][x] = (165, 170, 180) if (x % 3 == 0) else (145, 150, 160)

        # Hair sides (temples)
        for y in range(12, 17):
            grid[y][18] = (175, 180, 190)
            grid[y][17] = (145, 150, 160)
            grid[y][29] = (175, 180, 190)
            grid[y][30] = (145, 150, 160)

    elif character_type == 'glucksmann':
        # Raphaël Glucksmann:
        # Hair: Dark Curly Brown/Black (30, 25, 25) with volume
        # Beard: Trimmed dark beard/stubble (50, 40, 40)
        # Clothes: Dark casual blazer (35, 40, 50), Open white shirt (245, 245, 250)

        # Shoulders / Jacket (y: 28 to 47)
        for y in range(28, 48):
            spread = int((y - 28) * 1.3) + 10
            for x in range(24 - spread, 24 + spread + 1):
                if 0 <= x < W:
                    grid[y][x] = (32, 38, 48)

        # Open Collar White Shirt
        for y in range(27, 43):
            w_w = max(1, 5 - int((y - 27) * 0.35))
            for x in range(24 - w_w, 24 + w_w + 1):
                grid[y][x] = (245, 245, 250)

        # Open Chest/Collar skin
        for y in range(27, 34):
            for x in range(23, 26):
                grid[y][x] = (220, 180, 160)

        # Neck
        for y in range(24, 28):
            for x in range(21, 27):
                grid[y][x] = (210, 170, 150)

        # Head / Face shape (y: 11 to 25, x: 16 to 31)
        for y in range(11, 25):
            face_w = 6
            if y < 13: face_w = 5
            if y > 21: face_w = 5 - (y - 21)
            for x in range(24 - face_w, 24 + face_w + 1):
                grid[y][x] = (235, 195, 175)

        # Beard / Stubble (y: 20 to 25)
        for y in range(20, 25):
            b_w = 5 if y <= 22 else 4
            for x in range(24 - b_w, 24 + b_w + 1):
                if (x + y) % 2 == 0 or y >= 23:
                    grid[y][x] = (85, 65, 55)

        # Eyes & Eyebrows (y: 16-17)
        # Eyebrows (Dark, thick)
        for x in range(19, 23): grid[15][x] = (35, 28, 25)
        for x in range(25, 29): grid[15][x] = (35, 28, 25)
        # Eyes
        grid[17][20] = (25, 20, 18)
        grid[17][21] = (50, 40, 35)
        grid[17][27] = (25, 20, 18)
        grid[17][28] = (50, 40, 35)
        # Whites
        grid[17][19] = (245, 245, 245)
        grid[17][26] = (245, 245, 245)

        # Nose (y: 18-20)
        grid[18][24] = (215, 175, 155)
        grid[19][24] = (210, 170, 150)
        grid[20][23] = (195, 155, 135)
        grid[20][24] = (185, 145, 125)

        # Mouth (y: 22)
        for x in range(22, 26):
            grid[22][x] = (120, 75, 70)

        # Curly Dark Hair with volume (y: 6 to 14)
        for y in range(6, 14):
            hair_w = 7
            if y == 6: hair_w = 4
            elif y == 7: hair_w = 6
            for x in range(24 - hair_w, 24 + hair_w + 1):
                # Curly textures (variations of 35, 30, 28)
                if (x * 3 + y * 7) % 3 == 0:
                    grid[y][x] = (55, 45, 40)
                else:
                    grid[y][x] = (30, 24, 22)

        # Curly Sideburns
        for y in range(12, 18):
            grid[y][18] = (40, 32, 28)
            grid[y][17] = (30, 24, 22)
            grid[y][29] = (40, 32, 28)
            grid[y][30] = (30, 24, 22)

    # Save to temp BMP
    temp_bmp = f"./scripts/{character_type}.bmp"
    create_bmp_pixel_art(W, H, grid, temp_bmp)

    # Convert and scale up cleanly to 512x512 with sips (nearest neighbor crisp pixelation)
    subprocess.run(["sips", "-z", "512", "512", temp_bmp, "--out", output_jpg_path, "-s", "format", "jpeg"], check=True)
    if os.path.exists(temp_bmp):
        os.remove(temp_bmp)
    print(f"Generated {output_jpg_path} successfully!")

if __name__ == '__main__':
    render_portrait('retailleau', '/Users/morgancanteri/Documents/polifrance/public/bruno_retailleau.jpg')
    render_portrait('glucksmann', '/Users/morgancanteri/Documents/polifrance/public/raphael_glucksmann.jpg')
