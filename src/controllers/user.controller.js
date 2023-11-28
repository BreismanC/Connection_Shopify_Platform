const { UserService } = require("../services/User.service");

class UserController {
  static async postUser(req, res) {
    try {
      const data = req.body;
      const userCreated = await UserService.postUser(data);
      return res.status(201).json({
        status: "OK",
        details: "user created",
        data: userCreated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "user created error",
        data: error.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json({
        status: "OK",
        details: "user list",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "user list error",
        data: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      return res.status(200).json({
        status: "OK",
        details: "user list",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "user list error",
        data: error.message,
      });
    }
  }

  static async putUser(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const userUpdated = await UserService.putUser(id, data);
      return res.status(200).json({
        status: "OK",
        details: "user updated",
        data: userUpdated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "user update error",
        data: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      return res.status(200).json({
        status: "OK",
        details: "user deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "ERROR",
        details: "user delete error",
        data: error.message,
      });
    }
  }
}

module.exports = { UserController };
