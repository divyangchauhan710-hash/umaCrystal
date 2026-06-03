import os
import json
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA_DIR = os.path.join(BASE_DIR, "public", "client-media")
PRODUCTS_JSON = os.path.join(BASE_DIR, "data", "products.json")

def escape_regex(s):
    return re.escape(s)

def match_file_to_product(filename, products):
    base, ext = os.path.splitext(filename.lower())
    for product in products:
        prod_id = product["id"].lower()
        escaped_id = escape_regex(prod_id)
        pattern = f"^{escaped_id}(-\\d+)?$"
        if re.match(pattern, base):
            return product

    # Abbreviation matches
    for product in products:
        prod_id = product["id"].lower()
        if base.startswith("sgb") and "sodalite" in prod_id and "bracelet" in prod_id:
            return product
        if base.startswith("amtstb") and "amethyst" in prod_id and "bracelet" in prod_id:
            return product
        if base.startswith("te") and "tiger" in prod_id and "eye" in prod_id and "bracelet" in prod_id:
            return product
            
        words = prod_id.split("-")
        initials = "".join([w[0] for w in words if w])
        if len(initials) >= 3 and base.startswith(initials):
            return product
            
        if words[0] == "natural" and len(words) > 2:
            sub_initials = "".join([w[0] for w in words[1:] if w])
            if len(sub_initials) >= 3 and base.startswith(sub_initials):
                return product
    return None

def main():
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    files = os.listdir(MEDIA_DIR)
    
    # Map files to products
    all_products = []
    prod_map = {}
    for category in data.get("categories", []):
        for product in category.get("products", []):
            product["category_id"] = category["id"]
            product["category_name"] = category["name"]
            all_products.append(product)
            prod_map[product["id"].lower()] = product

    # Classify files
    file_info = {}
    for filename in files:
        if filename.lower() in ["readme.txt", "sample-video.mp4"]:
            continue
        filepath = os.path.join(MEDIA_DIR, filename)
        if not os.path.isfile(filepath):
            continue
        size = os.path.getsize(filepath)
        is_blurry = size < 20000
        
        product = match_file_to_product(filename, all_products)
        if product:
            file_info[filename] = {
                "size": size,
                "is_blurry": is_blurry,
                "category_id": product["category_id"],
                "category_name": product["category_name"]
            }
        else:
            file_info[filename] = {
                "size": size,
                "is_blurry": is_blurry,
                "category_id": "unmatched",
                "category_name": "Unmatched"
            }

    print("\n--- CATEGORY PROGRESS ---")
    for i, category in enumerate(data.get("categories", [])):
        cat_id = category["id"]
        cat_name = category["name"]
        
        cat_files = [f for f, info in file_info.items() if info["category_id"] == cat_id]
        blurry_count = sum(1 for f in cat_files if file_info[f]["is_blurry"])
        hd_count = sum(1 for f in cat_files if not file_info[f]["is_blurry"])
        total_files = len(cat_files)
        
        pct = (hd_count / total_files * 100) if total_files > 0 else 0
        print(f"Cat {i+1}: {cat_name} ({cat_id})")
        print(f"  Products: {len(category.get('products', []))} | Total Images: {total_files} | Blurry: {blurry_count} | HD: {hd_count} ({pct:.1f}% HD)")

    unmatched_files = [f for f, info in file_info.items() if info["category_id"] == "unmatched"]
    if unmatched_files:
        print(f"\nUnmatched files: {len(unmatched_files)}")
        for uf in unmatched_files[:10]:
            print(f"  {uf} ({os.path.getsize(os.path.join(MEDIA_DIR, uf))} bytes)")

if __name__ == "__main__":
    main()
