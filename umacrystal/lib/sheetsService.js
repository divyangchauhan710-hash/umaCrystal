/**
 * Google Sheets Integration for Product Management
 * 
 * This service fetches product data from a Google Sheet instead of products.json
 * The client can easily update products through a familiar spreadsheet interface
 */

const SHEETS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;

/**
 * Fetch products from Google Sheets
 * Sheet format:
 * | Category ID | Category Name | Category Description | Category Icon | Product ID | Product Name | Price | Stone Type | Gender | Color | YouTube Video URL | Thumbnail URL | WhatsApp Message |
 */
export async function getProductsFromSheets() {
  if (!SHEETS_API_KEY || !SHEET_ID) {
    console.warn("Google Sheets is not configured. Falling back to local product data.");
    return null;
  }

  const range = encodeURIComponent("'Products'!A:Z");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `Sheets API error: ${response.status} ${response.statusText}`;
      console.warn(message);
      return null;
    }

    const data = await response.json();
    const rows = data.values || [];

    if (rows.length < 2) {
      console.warn("Google Sheet is empty or not properly formatted. Falling back to local product data.");
      return null;
    }

    const headers = rows[0];
    const dataRows = rows.slice(1);

    return transformSheetData(headers, dataRows);
  } catch (error) {
    console.warn("Google Sheets fetch failed. Falling back to local product data.", error?.message || error);
    return null;
  }
}

/**
 * Transform raw sheet data into the expected product format
 */
function transformSheetData(headers, rows) {
  const categoryMap = {};

  rows.forEach((row) => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header.toLowerCase().trim()] = row[index] || "";
    });

    // Skip empty rows
    if (!rowData["product id"]) return;

    const categoryId = rowData["category id"];
    const categoryName = rowData["category name"];

    // Initialize category if not exists
    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        id: categoryId,
        name: categoryName,
        description: rowData["category description"] || "",
        icon: rowData["category icon"] || "📦",
        products: [],
      };
    }

    // Build media array
    const media = [];

    // Add main image
    if (rowData["image url"]) {
      media.push({
        type: "image",
        url: rowData["image url"],
      });
    }

    // Add additional images (Image 2, Image 3, etc.)
    for (let i = 2; i <= 10; i++) {
      const imageKey = `image ${i} url`;
      if (rowData[imageKey]) {
        media.push({
          type: "image",
          url: rowData[imageKey],
        });
      }
    }

    // Add video if present
    if (rowData["youtube video url"]) {
      media.push({
        type: "video",
        url: rowData["youtube video url"],
        thumbnail: rowData["video thumbnail url"] || rowData["image url"] || "",
      });
    }

    // Build specs object
    const specs = {};
    const specColumns = [
      "stone type",
      "gender",
      "color",
      "beads",
      "origin",
      "size",
      "weight",
      "metal",
      "shape",
      "quality",
      "bead size",
      "length",
      "type",
    ];

    specColumns.forEach((spec) => {
      if (rowData[spec]) {
        specs[spec.charAt(0).toUpperCase() + spec.slice(1)] = rowData[spec];
      }
    });

    // Build product object
    const product = {
      id: rowData["product id"],
      name: rowData["product name"],
      price: parseInt(rowData["price"]) || 0,
      image: rowData["image url"] || "", // Keep for fallback
      specs,
      whatsappMessage:
        rowData["whatsapp message"] ||
        `Hi, I am interested in ${rowData["product name"]} priced at ₹${rowData["price"]}`,
    };

    // Add media if available
    if (media.length > 0) {
      product.media = media;
    }

    categoryMap[categoryId].products.push(product);
  });

  // Convert to array format
  return {
    categories: Object.values(categoryMap),
  };
}

/**
 * Fetch from Google Sheets or fallback to JSON
 * This is the main function to use in API routes
 */
export async function getProducts() {
  // Try Google Sheets first
  const sheetsData = await getProductsFromSheets();
  if (sheetsData) {
    return sheetsData;
  }

  const localData = await getLocalProducts();
  if (localData) {
    return localData;
  }

  return { categories: [] };
}

export async function getLocalProducts() {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path");
    const jsonPath = path.join(process.cwd(), "data", "products.json");
    const fileContent = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.warn("Error reading local products.json:", error?.message || error);
    return null;
  }
}
