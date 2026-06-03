import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PRODUCTS_JSON = os.path.join(BASE_DIR, "data", "products.json")

def main():
    if not os.path.exists(PRODUCTS_JSON):
        print(f"Error: {PRODUCTS_JSON} not found.")
        return
        
    print(f"Reading {PRODUCTS_JSON}...")
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        content = f.read()
        
    old_brand = "Divine Crystal Ocean"
    new_brand = "Uma Crystal"
    
    count = content.count(old_brand)
    print(f"Found {count} occurrences of '{old_brand}'.")
    
    if count > 0:
        new_content = content.replace(old_brand, new_brand)
        with open(PRODUCTS_JSON, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Successfully replaced all occurrences and saved {PRODUCTS_JSON}.")
    else:
        print("No occurrences found to replace.")

if __name__ == "__main__":
    main()
