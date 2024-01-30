const tables = require("../tables");

const secureUser = async (req, res, next) => {
  const user = await tables.user.read(req.params.id);
  req.body.hashedPassword = user.hashed_password;
  next();
};

module.exports = secureUser;
