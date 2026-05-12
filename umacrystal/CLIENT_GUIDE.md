# Product Management Guide - For Client

This is a simple guide to manage your products through Google Sheets. No technical knowledge required!

## Quick Overview

Instead of editing code files, you now manage all your products in a **Google Sheet**. Any changes you make appear on the website automatically within a few minutes.

## How to Add a New Product

### Step 1: Open the Shared Google Sheet
Your team should have sent you a link to a Google Sheet named "Uma Crystal Products" (or similar). Open it.

### Step 2: Find the Right Category Row
Products are organized by category. Find the category your product belongs to:
- **Gemstone Bracelets** → Category ID: `gemstone-bracelets`
- **Rudraksha** → Category ID: `rudraksha`
- **Healing Wands** → Category ID: `gemstone-healing-wand`
- etc.

### Step 3: Add a New Row
1. Scroll to the bottom of your category's products
2. Click the row below the last product
3. Fill in these columns (left to right):

| What to Fill | Example | Notes |
|---|---|---|
| Category ID | `gemstone-bracelets` | Use existing category or ask team |
| Category Name | `Gemstone Bracelets` | The displayed category name |
| Category Description | `Handcrafted bracelets...` | Short description |
| Category Icon | `💎` | An emoji representing the category |
| **Product ID** | `amethyst-cluster` | **Must be unique**, lowercase, with hyphens |
| **Product Name** | `Amethyst Cluster` | **What customers see** |
| **Price** | `450` | **Just the number**, no ₹ symbol |
| Image URL | `https://example.com/image.jpg` | **Must be a working image link** |
| Image 2 URL | `https://example.com/image2.jpg` | *Optional* - another angle of product |
| Image 3 URL | `https://example.com/image3.jpg` | *Optional* - close-up or detail |
| YouTube Video URL | `https://www.youtube.com/watch?v=dQw4w9WgXcQ` | *Optional* - full YouTube link |
| Video Thumbnail URL | `https://example.com/thumb.jpg` | *Optional* - image shown before video plays |
| Stone Type | `Amethyst` | *Optional* - or any other spec |
| Gender | `Unisex` | *Optional* - or any other spec |
| Color | `Purple` | *Optional* - or any other spec |
| WhatsApp Message | `Hi, interested in Amethyst Cluster...` | *Optional* - custom message for inquiries |

### Step 4: Save
Google Sheets auto-saves. Your product appears on the website within **1 minute**.

---

## How to Update a Product

1. Find the product row
2. Click the cell you want to change
3. Edit the value
4. Press Enter - it's saved automatically
5. Website updates within 1 minute

---

## How to Add More Images

You can add up to **10 images** per product!

Column names for images:
- Image URL (primary)
- Image 2 URL
- Image 3 URL
- Image 4 URL
- ... and so on

**Example:**
```
Product Name: Gold Ring
Image URL: https://example.com/gold-ring-front.jpg
Image 2 URL: https://example.com/gold-ring-side.jpg
Image 3 URL: https://example.com/gold-ring-back.jpg
Image 4 URL: https://example.com/gold-ring-closeup.jpg
```

---

## How to Add a Product Video

1. Upload your product video to **YouTube** (or get a YouTube link)
2. Copy the full YouTube URL: `https://www.youtube.com/watch?v=VIDEO_ID`
3. Paste in the **"YouTube Video URL"** column
4. *Optional:* Add a thumbnail image in **"Video Thumbnail URL"** column

The video will appear in the product gallery on the website.

---

## How to Add Specifications

You can add any product specs/details as new columns:

Examples of common specs:
- Stone Type
- Gender  
- Color
- Weight
- Size
- Material
- Origin
- Quality
- Beads
- Shape
- Length

**To add a new spec:**
1. Click on an empty column to the right
2. Add a header name (e.g., "Weight")
3. Fill in values for each product

The specs automatically appear in the product details!

---

## How to Add a New Category

1. Open a new row
2. Fill in the category columns:
   - **Category ID**: unique identifier (lowercase, no spaces) - e.g., `gemstone-earrings`
   - **Category Name**: display name - e.g., `Gemstone Earrings`
   - **Category Description**: what makes this category special
   - **Category Icon**: relevant emoji - e.g., `👂`
3. Add your products to this category in rows below

---

## Tips & Best Practices

### Image URLs
- Use **high-quality images** (at least 400x400 pixels)
- Ensure images are **well-lit and clear**
- Use **unique, descriptive filenames** to avoid confusion
- Test that links work before publishing

### Product IDs
- Use **lowercase letters and hyphens** only
- No spaces, special characters, or uppercase
- Make them **descriptive** - e.g., `rose-quartz-pendant` instead of `prod123`
- ✅ Good: `clear-quartz-bracelet`
- ❌ Bad: `Clear Quartz Bracelet!`

### Prices
- Enter **only the number** - e.g., `450` not `₹450`
- Leave blank if price is custom/on-request

### WhatsApp Messages
- Keep them **short and friendly**
- Include product name and price
- Default message is fine if you don't customize

---

## Common Issues

### **Product not appearing?**
- Check that **Product ID** and **Product Name** are filled
- Verify **Image URL** is valid (visit the link to confirm)
- Wait 1-2 minutes and refresh the website

### **Images not showing?**
- Click the image URL link to confirm it works
- Image must be at least 400x400 pixels
- Check URL doesn't have special characters

### **Can't find my category?**
- Scroll left and check the **Category ID** column
- Make sure category name matches exactly

### **Changes aren't appearing?**
- Wait 1-2 minutes (there's a small delay)
- Hard refresh the website (Ctrl+Shift+R on Windows)
- Clear browser cache

---

## Need Help?

If you have questions:
1. **Check this guide** - answer might be here
2. **Contact your development team** - they set this up for you

Happy updating! 🎉
