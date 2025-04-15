import cloudinary from "../../config/cloudinary"

export const uploadToCloudinary = async(filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath,{
     folder: "blogging_api" 
    });
    return {
      url: result.url,
      publicId: result.publicId
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}
