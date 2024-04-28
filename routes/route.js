const { UserController } = require("../controllers/UserController.js");
const AuthenticationController = require("../controllers/AuthenticationController.js");

module.exports = (app) => {
  const userController = new UserController();

  // route to create user
  app.post("/user/create", userController.Create);

  // route to create user
  app.put("/user/update/:id", userController.Update);

  // route to get user by accountNumber
  app.get(
    "/user/accountNumber/:accountNumber",
    userController.ReadByAccountNumber,
  );

  // route to get user by IdentityNumber
  app.get(
    "/user/identityNumber/:identityNumber",
    userController.ReadByIdentityNumber,
  );

  // route to delete user by ID
  app.delete("/user/delete/:id", userController.Delete);

  // route to generate token
  app.post("/accesstoken", AuthenticationController.GenerateToken);
};
