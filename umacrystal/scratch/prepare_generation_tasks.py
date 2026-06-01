import os
import json
import re

# Paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA_DIR = os.path.join(BASE_DIR, "public", "client-media")
PRODUCTS_JSON = os.path.join(BASE_DIR, "data", "products.json")
TASKS_JSON = os.path.join(BASE_DIR, "scratch", "generation_tasks.json")

def escape_regex(s):
    return re.escape(s)

def match_file_to_product(filename, products):
    # Strip extension
    base, ext = os.path.splitext(filename.lower())
    
    # 1. Exact match logic (product_id or product_id-\d+)
    for product in products:
        prod_id = product["id"].lower()
        # Escaping special characters in product id
        escaped_id = escape_regex(prod_id)
        pattern = f"^{escaped_id}(-\\d+)?$"
        if re.match(pattern, base):
            return product

    # 2. Abbreviation matches
    for product in products:
        prod_id = product["id"].lower()
        
        # Check known prefixes
        if base.startswith("sgb") and "sodalite" in prod_id and "bracelet" in prod_id:
            return product
        if base.startswith("amtstb") and "amethyst" in prod_id and "bracelet" in prod_id:
            return product
        if base.startswith("te") and "tiger" in prod_id and "eye" in prod_id and "bracelet" in prod_id:
            return product
            
        # Check initials
        words = prod_id.split("-")
        initials = "".join([w[0] for w in words if w])
        if len(initials) >= 3 and base.startswith(initials):
            return product
            
        if words[0] == "natural" and len(words) > 2:
            sub_initials = "".join([w[0] for w in words[1:] if w])
            if len(sub_initials) >= 3 and base.startswith(sub_initials):
                return product

    return None

def get_material_from_name(name, category_id):
    name_lower = name.lower()
    
    # List of known gemstone/materials to check in name
    stones = [
        "amethyst", "rose quartz", "clear quartz", "quartz", "black obsidian", "obsidian",
        "black tourmaline", "tourmaline", "pyrite", "green aventurine", "aventurine",
        "green jade", "jade", "lapis lazuli", "lapis", "tiger eye", "sodalite",
        "red carnelian", "carnelian", "citrine", "selenite", "red jasper", "jasper",
        "malachite", "labradorite", "fluorite", "hematite", "howlite", "opalite",
        "turquoise", "moonstone", "blood stone", "bloodstone", "garnet", "peridot",
        "shukra mani", "machh mani", "zultanite", "aquamarine", "rudraksha"
    ]
    
    for stone in stones:
        if stone in name_lower:
            return stone.title()
            
    if category_id == "rudraksha" or "rudraksha" in name_lower:
        return "Natural Rudraksha"
        
    return "Natural Crystal"

def main():
    print(f"Reading products from {PRODUCTS_JSON}...")
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Flatten products list
    all_products = []
    for category in data.get("categories", []):
        for product in category.get("products", []):
            product["category_id"] = category["id"]
            all_products.append(product)
        
    print(f"Total products found: {len(all_products)}")
    
    print(f"Scanning files in {MEDIA_DIR}...")
    files = os.listdir(MEDIA_DIR)
    
    tasks = []
    unmatched_files = []
    
    for filename in files:
        if filename.lower() in ["readme.txt", "sample-video.mp4"]:
            continue
            
        filepath = os.path.join(MEDIA_DIR, filename)
        if not os.path.isfile(filepath):
            continue
            
        # Get file size
        filesize = os.path.getsize(filepath)
        
        # We only care about blurry files (under 20KB)
        if filesize < 20000:
            product = match_file_to_product(filename, all_products)
            if product:
                # Extract relevant specs for a good prompt
                specs = product.get("specs", {})
                stone_type = specs.get("Stone Type", specs.get("Material", ""))
                
                # If stone type is missing, infer it from name/category
                if not stone_type:
                    stone_type = get_material_from_name(product["name"], product["category_id"])
                    
                color = specs.get("Color", "")
                shape = specs.get("Shape", specs.get("Bracelet Type", ""))
                
                # Clean up specs text
                color_desc = f", Color: {color}" if color else ""
                shape_desc = f", Shape: {shape}" if shape else ""
                stone_desc = f" made of {stone_type}" if stone_type else ""
                
                # Build custom prompt
                prompt = f"A premium, high-resolution product photograph of {product['name']}{stone_desc}{color_desc}{shape_desc}. Exact visual match to the reference image, studio lighting, clean solid white background, sharp focus, professional gemstone macro photography, highly detailed texture. Saved as high-quality JPG."

                
                tasks.append({
                    "filename": filename,
                    "filepath": filepath,
                    "product_id": product["id"],
                    "product_name": product["name"],
                    "prompt": prompt,
                    "filesize_bytes": filesize
                })
            else:
                unmatched_files.append(filename)
                
    print(f"Found {len(tasks)} blurry images that match products.")
    print(f"Unmatched blurry images: {len(unmatched_files)}")
    if unmatched_files:
        print("First 10 unmatched:", unmatched_files[:10])
        
    # Save tasks
    os.makedirs(os.path.join(BASE_DIR, "scratch"), exist_ok=True)
    with open(TASKS_JSON, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2)
        
    print(f"Saved {len(tasks)} tasks to {TASKS_JSON}")

if __name__ == "__main__":
    main()
