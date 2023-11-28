const { ImageRepository } = require("../repositories/image.repository");
const { S3Service } = require("./s3.service");
const globalConstants = require("../const/globalConstants");

class ImageService {
  static async postImage(image, transaction) {
    try {
      const fileImage = {
        fieldname: "user-images-project",
        originalName: image.originalName,
        buffer: Buffer.from(image.attachment, "base64"),
        endpoint: function () {
          return `${this.fieldname}/${this.originalName}`;
        },
        src: function () {
          return `https://${globalConstants.AWS_BUCKET_NAME}.s3.${
            globalConstants.AWS_BUCKET_REGION
          }.amazonaws.com/${this.endpoint()}`;
        },
      };
      const imageToBBDD = {
        src: fileImage.src(),
        awsAccessKey: fileImage.endpoint(),
        originalName: fileImage.originalName,
      };

      transaction.afterCommit(
        async () => await S3Service.uploadBase64(fileImage)
      );

      return await ImageRepository.postImage(imageToBBDD, transaction);
    } catch (error) {
      throw error;
    }
  }

  static async getAllImages() {
    try {
      return await ImageRepository.getAllImages();
    } catch (error) {
      throw error;
    }
  }

  static async getImageById(id) {
    try {
      return await ImageRepository.getImageById(id);
    } catch (error) {
      throw error;
    }
  }

  static async putImage(id, image, transaction = null) {
    try {
      const imageFounded = await ImageRepository.getImageById(id);
      if (!imageFounded) {
        throw new Error("Image not found");
      }

      const fileImage = {
        fieldname: "user-images-project",
        originalName: image.originalName,
        buffer: Buffer.from(image.attachment, "base64"),
        endpoint: function () {
          return `${this.fieldname}/${this.originalName}`;
        },
        src: function () {
          return `https://${globalConstants.AWS_BUCKET_NAME}.s3.${
            globalConstants.AWS_BUCKET_REGION
          }.amazonaws.com/${this.endpoint()}`;
        },
      };

      const imageToBBDD = {
        src: fileImage.src(),
        awsAccessKey: fileImage.endpoint(),
        originalName: fileImage.originalName,
      };

      transaction.afterCommit(async () => {
        if (fileImage.originalName !== imageFounded.originalName) {
          await S3Service.deleteObjectAction(imageFounded.awsAccessKey);
        }

        await S3Service.uploadBase64(fileImage);
      });

      return await ImageRepository.putImage(id, imageToBBDD, transaction);
    } catch (error) {
      throw error;
    }
  }

  static async deleteImage(id, transaction) {
    try {
      const imageFounded = await ImageRepository.getImageById(id);

      if (!imageFounded) {
        throw new Error("image not found");
      }

      await ImageRepository.deleteImage(id, transaction);

      transaction.afterCommit(
        async () =>
          await S3Service.deleteObjectAction(imageFounded.awsAccessKey)
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ImageService };
