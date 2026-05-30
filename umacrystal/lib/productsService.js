import fs from "fs";
import path from "path";
import productsData from "@/data/products.json";

// Helper to get all files in public/client-media
function getClientMediaFiles() {
  try {
    const mediaDir = path.join(process.cwd(), "public", "client-media");
    if (fs.existsSync(mediaDir)) {
      return fs.readdirSync(mediaDir).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".mov", ".webm"].includes(ext);
      });
    }
  } catch (error) {
    console.error("Error reading client-media directory:", error);
  }
  return [];
}

// Check if a file matches a product ID or abbreviation
function getMatchedFilesForProduct(productId, clientFiles) {
  const idLower = productId.toLowerCase();
  
  // 1. Look for files matching the product ID (ID or ID-[number])
  const exactMatches = clientFiles.filter(file => {
    const nameLower = file.toLowerCase();
    const ext = path.extname(nameLower);
    const base = path.basename(nameLower, ext);
    
    const escapedId = idLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`^${escapedId}(-\\d+)?$`);
    return regex.test(base);
  });
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // 2. Fallback to abbreviation matches
  return clientFiles.filter(file => {
    const nameLower = file.toLowerCase();
    
    // Check known prefixes
    if (nameLower.startsWith("sgb") && idLower.includes("sodalite") && idLower.includes("bracelet")) {
      return true;
    }
    if (nameLower.startsWith("amtstb") && idLower.includes("amethyst") && idLower.includes("bracelet")) {
      return true;
    }
    if (nameLower.startsWith("te") && idLower.includes("tiger") && idLower.includes("eye") && idLower.includes("bracelet")) {
      return true;
    }
    
    // Check initials
    const words = idLower.split("-");
    const initials = words.map(w => w[0]).join("");
    if (initials.length >= 3 && nameLower.startsWith(initials)) {
      return true;
    }
    
    if (words[0] === "natural" && words.length > 2) {
      const subInitials = words.slice(1).map(w => w[0]).join("");
      if (subInitials.length >= 3 && nameLower.startsWith(subInitials)) {
        return true;
      }
    }
    
    return false;
  });
}

function augmentProducts(data) {
  if (!data || !data.categories) return data;
  
  // Read available client media files at request time
  const clientFiles = getClientMediaFiles();
  
  const augmentedCategories = data.categories.map((category) => {
    const augmentedProducts = category.products.map((product) => {
      const matchedFiles = getMatchedFilesForProduct(product.id, clientFiles);
      
      const matchedImages = matchedFiles
        .filter(file => [".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(path.extname(file).toLowerCase()))
        .map(file => `/client-media/${file}`)
        .sort(); // Sort alphabetically (e.g. sgb1, sgb2, sgb3)
        
      const matchedVideos = matchedFiles
        .filter(file => [".mp4", ".mov", ".webm"].includes(path.extname(file).toLowerCase()))
        .map(file => `/client-media/${file}`)
        .sort();
      
      let images = [];
      if (matchedImages.length > 0) {
        images = matchedImages;
      } else {
        // Fallback: use product.image as first image, and add a "Coming Soon" placeholder as the second
        images = [
          product.image,
          `https://placehold.co/400x400/A8BFDB/1B3A6B?text=${encodeURIComponent(product.name)}+Image+2+Coming+Soon`
        ];
      }
      
      // Map to media array objects
      const media = images.map((url) => ({
        type: "image",
        url: url
      }));
      
      // Add video (if available, show coming soon if not)
      if (matchedVideos.length > 0) {
        matchedVideos.forEach((videoUrl) => {
          media.push({
            type: "video",
            url: videoUrl,
            thumbnail: images[0]
          });
        });
      } else {
        // Fallback: sample-video.mp4 triggers the "Video Coming Soon" placeholder in the UI
        media.push({
          type: "video",
          url: "/client-media/sample-video.mp4",
          thumbnail: images[0]
        });
      }
      
      return {
        ...product,
        image: images[0],
        media: media
      };
    });
    
    return {
      ...category,
      products: augmentedProducts
    };
  });
  
  return {
    ...data,
    categories: augmentedCategories
  };
}

export async function getProducts() {
  return augmentProducts(productsData);
}