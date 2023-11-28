const { User } = require("../database/models/user.model");
const { Image } = require("../database/models/image.model");

class UserRepository {
  static async postUser(user, transaction = null) {
    try {
      return await User.create(user, { transaction });
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await User.findAll({
        include: {
          model: Image,
          as: "images",
          through: {
            attributes: [],
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      return await User.findByPk(id, {
        include: {
          model: Image,
          as: "images",
          through: {
            attributes: [],
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async putUser(id, user, transaction = null) {
    try {
      const [, userUpdated] = await User.update(user, {
        where: {
          id,
        },
        returning: true,
        plain: true,
        transaction,
      });
      return userUpdated;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id, transaction = null) {
    try {
      await User.destroy(
        {
          where: { id },
          transaction,
        },
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { UserRepository };
