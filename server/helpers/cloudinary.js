const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const crypto = require("crypto");
const { Readable } = require("stream"); // Import Readable from stream
const {
  cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} = require("../config/default");

cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(fileBuffer) {
  try {
    // חישוב hash של התמונה עם crypto
    const hash = crypto.createHash("md5").update(fileBuffer).digest("hex");

    // חיפוש תמונה קיימת על פי public_id המבוסס על ה-hash
    const existingImages = await cloudinary.search
      .expression(`public_id=${hash}`)
      .execute();

    if (existingImages.total_count > 0) {
      // אם קיימת כבר תמונה כזו, נחזיר את ה-URL שלה
      return existingImages.resources[0];
    }

    // אם התמונה לא קיימת, נעלה אותה עם אותו hash כ-public_id
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: hash, // שימוש ב-hash כ-public_id כדי למנוע כפילות עתידית
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            return reject(new Error("Image upload failed: " + error.message));
          }
          return resolve(result);
        }
      );

      // יצירת זרם קריא מתוך ה-Buffer של התמונה
      const readableStream = Readable.from(fileBuffer);
      readableStream.pipe(uploadStream);

      uploadStream.on("error", (error) => {
        reject(new Error("Upload stream failed: " + error.message));
      });
    });
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Image upload failed");
  }
}

module.exports = { upload, imageUploadUtil };
