import sys
import os
from PIL import Image

def convert_and_optimize(src_path, dest_path, quality=85):
    try:
        if not os.path.exists(src_path):
            print(f"Error: Source file {src_path} does not exist.")
            sys.exit(1)
            
        print(f"Opening generated image: {src_path}")
        img = Image.open(src_path)
        
        # Handle alpha channel (transparency) if present in PNG
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            # Create a solid white background
            bg = Image.new('RGB', img.size, (255, 255, 255))
            # Paste the image onto white background using itself as mask (for alpha)
            bg.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else img.split()[1])
            img_rgb = bg
        else:
            img_rgb = img.convert('RGB')
            
        # Get original file size (of the generated image)
        gen_size = os.path.getsize(src_path)
        
        # Save as optimized JPEG
        img_rgb.save(dest_path, 'JPEG', quality=quality, optimize=True)
        
        # Get final compressed size
        final_size = os.path.getsize(dest_path)
        
        print(f"Successfully converted and saved to: {dest_path}")
        print(f"Original generated size: {gen_size / 1024:.2f} KB")
        print(f"Optimized JPG size: {final_size / 1024:.2f} KB")
        
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_and_save.py <src_png_path> <dest_jpg_path>")
        sys.exit(1)
        
    src = sys.argv[1]
    dest = sys.argv[2]
    convert_and_optimize(src, dest)
