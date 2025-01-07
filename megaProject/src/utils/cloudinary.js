import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!localFilePath) {
      return null;
    }

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "megaProject", // folder name on cloudinary
    });
    //file has been uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);
    //remove file from server
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    //remove file from server if file failed to upload
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
