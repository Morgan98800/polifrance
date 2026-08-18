import subprocess
import os
import struct

def fetch_and_pixelate():
    retailleau_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bruno_Retailleau_-_Ministre_de_l%27Int%C3%A9rieur_fran%C3%A7ais_%28cropped%29.jpg/960px-Bruno_Retailleau_-_Ministre_de_l%27Int%C3%A9rieur_fran%C3%A7ais_%28cropped%29.jpg"
    glucksmann_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/1720448398743_20240708_GLUCKSMANN_Raphael_FR_006.jpg/960px-1720448398743_20240708_GLUCKSMANN_Raphael_FR_006.jpg"

    os.makedirs("./scripts/downloaded", exist_ok=True)
    raw_retailleau = "./scripts/downloaded/raw_retailleau.jpg"
    raw_glucksmann = "./scripts/downloaded/raw_glucksmann.jpg"

    # 1. Download
    print("Downloading Bruno Retailleau...")
    subprocess.run(["curl", "-s", "-L", "-A", "Mozilla/5.0", retailleau_url, "-o", raw_retailleau], check=True)
    print("Downloading Raphaël Glucksmann...")
    subprocess.run(["curl", "-s", "-L", "-A", "Mozilla/5.0", glucksmann_url, "-o", raw_glucksmann], check=True)

    # 2. Process Retailleau: Crop head & shoulders square, downscale to 48x48 pixel grid, then upscale to 512x512
    # sips crop to square
    sq_retailleau = "./scripts/downloaded/sq_retailleau.jpg"
    subprocess.run(["sips", "-c", "750", "750", raw_retailleau, "--out", sq_retailleau], check=True)
    
    # Downsample to 56x56 pixel blocks
    small_retailleau = "./scripts/downloaded/small_retailleau.bmp"
    subprocess.run(["sips", "-z", "56", "56", sq_retailleau, "-s", "format", "bmp", "--out", small_retailleau], check=True)
    
    # Upscale to 512x512 with nearest-neighbor crispness
    subprocess.run(["sips", "-z", "512", "512", small_retailleau, "-s", "format", "jpeg", "--out", "./public/bruno_retailleau.jpg"], check=True)

    # 3. Process Glucksmann: Crop head & shoulders square, downscale to 48x48 pixel grid, then upscale to 512x512
    sq_glucksmann = "./scripts/downloaded/sq_glucksmann.jpg"
    subprocess.run(["sips", "-c", "750", "750", raw_glucksmann, "--out", sq_glucksmann], check=True)
    
    small_glucksmann = "./scripts/downloaded/small_glucksmann.bmp"
    subprocess.run(["sips", "-z", "56", "56", sq_glucksmann, "-s", "format", "bmp", "--out", small_glucksmann], check=True)
    
    subprocess.run(["sips", "-z", "512", "512", small_glucksmann, "-s", "format", "jpeg", "--out", "./public/raphael_glucksmann.jpg"], check=True)

    print("Successfully pixelated Bruno Retailleau and Raphaël Glucksmann!")

if __name__ == '__main__':
    fetch_and_pixelate()
