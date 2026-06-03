import os
import json
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TASKS_JSON = os.path.join(BASE_DIR, "scratch", "generation_tasks.json")

def main():
    if len(sys.argv) < 2:
        print("Usage: python get_active_tasks.py <category_id>")
        sys.exit(1)
        
    category_id = sys.argv[1]
    
    # We will reuse check_categories' match logic or just read from check_categories.py
    # But since prepare_generation_tasks.py has already filtered blurry images, we can check which category each task belongs to
    # by matching its product_id in products.json
    PRODUCTS_JSON = os.path.join(BASE_DIR, "data", "products.json")
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    prod_to_cat = {}
    for category in data.get("categories", []):
        for product in category.get("products", []):
            prod_to_cat[product["id"].lower()] = category["id"]

    if not os.path.exists(TASKS_JSON):
        print(f"Error: {TASKS_JSON} not found. Run prepare_generation_tasks.py first.")
        sys.exit(1)
        
    with open(TASKS_JSON, "r", encoding="utf-8") as f:
        tasks = json.load(f)
        
    cat_tasks = []
    for task in tasks:
        prod_id = task["product_id"].lower()
        if prod_to_cat.get(prod_id) == category_id:
            cat_tasks.append(task)
            
    print(f"Found {len(cat_tasks)} tasks for category '{category_id}'.")
    
    out_path = os.path.join(BASE_DIR, "scratch", "active_category_tasks.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(cat_tasks, f, indent=2)
    print(f"Saved category tasks to {out_path}")

if __name__ == "__main__":
    main()
