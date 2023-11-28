const { Image } = require("../database/models/image.model");

class ImageRepository {
  static async postImage(image, transaction = null) {
    try {
      return await Image.create(image, { transaction });
    } catch (error) {
      throw error;
    }
  }

  static async getAllImages() {
    try {
      await Image.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getImageById(id) {
    try {
      return await Image.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  static async putImage(id, image, transaction) {
    try {
      const [, imageUpdated] = await Image.update(image, {
        where: {
          id,
        },
        returning: true,
        plain: true,
        transaction,
      });
      return imageUpdated;
    } catch (error) {
      throw error;
    }
  }

  static async deleteImage(id, transaction = null) {
    try {
      await Image.destroy({
        where: { id },
        transaction,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { ImageRepository };
