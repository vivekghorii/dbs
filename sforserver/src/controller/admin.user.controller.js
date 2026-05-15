const bcrypt = require("bcryptjs");
const { User } = require("../models");

// CREATE USER (ADMIN ONLY)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
      isActive: true,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "User creation failed" });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role", "isActive"],
    order: [["createdAt", "DESC"]],
  });

  res.json(users);
};

// ACTIVATE / DEACTIVATE USER
const toggleUserStatus = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
    isActive: user.isActive,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  toggleUserStatus,
};
