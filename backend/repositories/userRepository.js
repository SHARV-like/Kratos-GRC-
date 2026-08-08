const User = require("../models/User");

const createUser = async (userData) => {
  return User.create(userData);
};

const findByEmail = async (email) => {
  return User.findOne({ email: email.toLowerCase() });
};

const findByEmailWithPassword = async (email) => {
  return User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
};

const findById = async (id) => {
  return User.findById(id);
};

module.exports = {
  createUser,
  findByEmail,
  findByEmailWithPassword,
  findById,
};
