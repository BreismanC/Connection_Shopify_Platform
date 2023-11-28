const { ImageService } = require("../services/Image.service");
const globalConstants = require("../const/globalConstants");

class ImageController {
  static async postImage(req, res) {
    try {
      const data = req.body;
      const fileImage = {
        fieldname: "user-images-project",
        originalName: data.originalName,
        buffer: Buffer.from(data.attachment, "base64"),
        endpoint: function () {
          return `${this.fieldname}/${this.originalName}`;
        },
        src: function () {
          return `https://${globalConstants.AWS_BUCKET_NAME}.s3.${
            globalConstants.AWS_BUCKET_REGION
          }.amazonaws.com/${this.endpoint()}`;
        },
      };
      const imageCreated = await ImageService.postImage(fileImage);
      return res.status(201).json({
        status: "OK",
        details: "image created",
        data: imageCreated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "image created error",
        data: error.message,
      });
    }
  }
}

module.exports = { ImageController };
