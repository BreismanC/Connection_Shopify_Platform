const sequelize = require("../database/config/config");
const { UserRepository } = require("../repositories/user.repository");
const { ImageService } = require("./Image.service");

class UserService {
  static async postUser(data) {
    try {
      const { user, image } = data;
      const userCreated = sequelize.transaction(async (transaction) => {
        const userInstance = await UserRepository.postUser(user, transaction);
        const imageInstance = await ImageService.postImage(image, transaction);
        await userInstance.addImage(imageInstance, { transaction });
        userInstance.dataValues.image = imageInstance;
        // throw new Error("error de prueba");
        return userInstance;
      });
      return userCreated;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await UserRepository.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      return await UserRepository.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  static async putUser(id, data) {
    try {
      const userFounded = await UserRepository.getUserById(id);
      if (!userFounded) {
        throw new Error("User not found");
      }

      const result = await sequelize.transaction(async (transaction) => {
        const { user, image } = data;
        const userInstance = await UserRepository.putUser(
          id,
          user,
          transaction
        );

        const imageInstance = await ImageService.putImage(
          userFounded.images[0].id,
          image,
          transaction
        );
        await userInstance.setImages([imageInstance], { transaction });
        userInstance.dataValues.image = imageInstance;

        // throw new Error("error de prueba");
        return userInstance;
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const userFounded = await UserRepository.getUserById(id);
      if (!userFounded) {
        throw new Error("user not found");
      }

      await sequelize.transaction(async (transaction) => {
        await UserRepository.deleteUser(id, transaction);
        await ImageService.deleteImage(userFounded.images[0].id, transaction);
        // throw new Error("error de prueba");
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserService };
