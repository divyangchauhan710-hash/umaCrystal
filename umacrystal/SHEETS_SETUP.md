# Google Sheets Setup Guide for Product Management

This guide helps your client easily manage products and categories through a Google Sheet instead of editing JSON files.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ New"** and select **"Blank spreadsheet"**
3. Name it **"Uma Crystal Products"** (or your preferred name)
4. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit#...`
   - Copy the ID between `/d/` and `/edit`

## Step 2: Set Up the Spreadsheet

### Sheet Name
Rename the first sheet to **"Products"** (if not already named)

### Column Headers
Add these headers in Row 1 (copy-paste this exactly):

```
Category ID | Category Name | Category Description | Category Icon | Product ID | Product Name | Price | Image URL | Image 2 URL | Image 3 URL | YouTube Video URL | Video Thumbnail URL | Stone Type | Gender | Color | WhatsApp Message
```

### Example Data (Row 2):
```
gemstone-bracelets | Gemstone Bracelets | Handcrafted bracelets made from natural gemstones. | 💎 | sodalite-bracelet | Sodalite Gemstone Bracelet | 117 | https://image1.jpg | https://image2.jpg | https://image3.jpg | https://www.youtube.com/watch?v=dQw4w9WgXcQ | https://thumbnail.jpg | Sodalite | Unisex | Blue | Hi, I am interested in Sodalite Gemstone Bracelet priced at ₹117
```

## Step 3: Create Google Cloud Project & Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click the project dropdown at top
   - Click **"NEW PROJECT"**
   - Name it "Uma Crystal"
   - Click **"CREATE"**

3. Enable Google Sheets API:
   - In the search bar, type **"Google Sheets API"**
   - Click **"Google Sheets API"**
   - Click **"ENABLE"**

4. Create API Key:
   - In the left menu, click **"Credentials"**
   - Click **"+ CREATE CREDENTIALS"**
   - Select **"API Key"**
   - Copy the generated key

5. Restrict the API Key (Optional but recommended):
   - Click on your API Key
   - Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
   - Add your website URLs (e.g., `https://yourdomain.com/*`)
   - Under **"API restrictions"**, select **"Google Sheets API"**
   - Click **"SAVE"**

## Step 4: Configure Environment Variables

1. In your project root, create or edit `.env.local`:

```
NEXT_PUBLIC_SHEET_ID=your_sheet_id_from_step_1
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_from_step_3
```

2. Restart your development server

## Step 5: Share the Sheet with Your Client

1. In Google Sheets, click **"Share"** (top right)
2. Add the client's email
3. Give **"Editor"** permission so they can update products
4. Provide them with the **SHEETS_MANAGEMENT_GUIDE.md** (instructions for managing products)

## Column Reference

### Category Columns (All products in a row must have the same category)
- **Category ID**: Unique identifier (lowercase, hyphens) - e.g., `gemstone-bracelets`
- **Category Name**: Display name - e.g., `Gemstone Bracelets`
- **Category Description**: Short description - e.g., `Handcrafted bracelets...`
- **Category Icon**: Emoji icon - e.g., `💎`

### Product Columns
- **Product ID**: Unique identifier (lowercase, hyphens) - e.g., `sodalite-bracelet`
- **Product Name**: Full product name - e.g., `Sodalite Gemstone Bracelet`
- **Price**: Numeric value in rupees - e.g., `117`
- **Image URL**: Primary product image - must be a valid image URL
- **Image 2 URL, Image 3 URL, etc.**: Additional product images (optional)
- **YouTube Video URL**: Full YouTube link (optional) - e.g., `https://www.youtube.com/watch?v=VIDEO_ID`
- **Video Thumbnail URL**: Image to show before video plays (optional)
- **Specs**: Stone Type, Gender, Color, Weight, Size, Metal, Beads, Origin, etc. - add any spec as a column
- **WhatsApp Message**: Custom WhatsApp inquiry message (optional)

## How It Works

1. **Client updates Google Sheet** with new products/categories
2. **System automatically fetches** from Google Sheets via API
3. **Data is cached** for 1 hour to optimize performance
4. **Fallback to products.json** if Sheets API is not configured
5. **No coding required** - pure spreadsheet management

## Caching & Updates

- Product data is cached for **1 hour** (3600 seconds)
- Changes in Google Sheet appear within **1 minute** of next page load
- To force immediate update: Clear browser cache or wait 1 hour

## Troubleshooting

### "Google Sheets not configured" warning
- Ensure both `NEXT_PUBLIC_SHEET_ID` and `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY` are set in `.env.local`
- Restart the development server after setting environment variables

### "Sheets API error"
- Verify the Sheet ID is correct
- Check that Google Sheets API is enabled in Cloud Console
- Confirm API Key has permissions for Google Sheets API

### Products not updating
- Verify the sheet is named **"Products"** (case-sensitive)
- Check column headers match exactly (see Column Reference above)
- Ensure Product ID and Product Name columns have values

### API Key errors
- Make sure the API Key is in `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY` (must be public)
- Verify Sheet is accessible (not in trash)
- Check Google Cloud Console quota limits

## Migration from JSON to Sheets

If already using `products.json`, you can:
1. **Keep using JSON**: Leave Sheets API unconfigured, system uses `products.json`
2. **Migrate to Sheets**: Configure Sheets API and system automatically uses Sheets first
3. **Use both**: System tries Sheets first, falls back to JSON if unavailable

## Security Notes

- The API Key and Sheet ID are public (prefixed with `NEXT_PUBLIC_`)
- This is intentional - needed for client-side and server-side access
- API Key should be restricted to your domain (see Step 3)
- Sensitive data should not be stored in the Sheet
