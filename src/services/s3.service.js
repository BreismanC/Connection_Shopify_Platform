const {
  s3Instance,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("../config/s3config");
const globalConstants = require("../const/globalConstants");

class S3Service {
  static async uploadFileAction(file) {
    const uploadParams = {
      Bucket: globalConstants.AWS_BUCKET_NAME,
      Key: file.endpoint(),
      Body: file.buffer,
    };
    const command = new PutObjectCommand(uploadParams);
    return await s3Instance.send(command);
  }

  static async uploadBase64(fileImage) {
    try {
      await this.uploadFileAction(fileImage);
    } catch (error) {
      throw error;
    }
  }

  static async getAllObjectsAction() {
    const command = new ListObjectsCommand({
      Bucket: globalConstants.AWS_BUCKET_NAME,
    });
    return await s3Instance.send(command);
  }

  static async getbjectByKeyAction(key) {
    const command = new GetObjectCommand({
      Bucket: globalConstants.AWS_BUCKET_NAME,
      Key: key,
    });
    return await s3Instance.send(command);
  }

  static async deleteObjectAction(objectKey) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: globalConstants.AWS_BUCKET_NAME,
        Key: objectKey,
      });
      await s3Instance.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = { S3Service };
