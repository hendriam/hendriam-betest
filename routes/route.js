const UserController = require("../controllers/UserController.js");
const AuthenticationController = require("../controllers/AuthenticationController.js");

module.exports = (app) => {
  // route to create user
  app.post("/user/create", UserController.Create);

  // route to create user
  app.put("/user/update/:id", UserController.Update);

  // route to get user by accountNumber
  app.get(
    "/user/accountNumber/:accountNumber",
    UserController.ReadByAccountNumber,
  );

  // route to get user by IdentityNumber
  app.get(
    "/user/identityNumber/:identityNumber",
    UserController.ReadByIdentityNumber,
  );

  // route to delete user by ID
  app.delete("/user/delete/:id", UserController.Delete);

  // route to generate token
  app.post("/accesstoken", AuthenticationController.GenerateToken);
};
