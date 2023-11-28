const S3Service = require("./s3.service");

class UploadImagesService {
  static async upload(file) {
    try {
      return await S3Service.uploadFile(file);
    } catch (error) {
      throw error;
    }
  }

  static async upoladBase64(files) {
    try {
      for (let fileBase64 of files) {
        const { name, attachment } = fileBase64;
        const fileImage = {
          fieldname: "images-products",
          originalName: `${name}.jpg`,
          buffer: Buffer.from(attachment, "base64"),
        };
        const result = await S3Service.uploadFile(fileImage);
        console.log(result);
      }
      return "Uploaded images successfully";
    } catch (error) {
      throw error;
    }
  }

  static async getAllImages(bucketName) {
    try {
      return await S3Service.getAllObjects(bucketName);
    } catch (error) {
      throw error;
    }
  }

  static async getImageById(bucketName, id) {
    try {
      const result = await S3Service.getbjectByKey(bucketName, id);
      return result.$metadata;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UploadImagesService;
