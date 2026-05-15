const { User } = require("../models");

const activeUserMiddleware = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user || !user.isActive) {
    return res.status(403).json({ message: "User is inactive" });
  }

  next();
};

module.exports = activeUserMiddleware;
    