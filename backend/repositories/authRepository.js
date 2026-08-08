const User = require("../models/User");

const normalizeEmail = (email) => {
  return email.trim().toLowerCase();
};

const create = async (userData) => {
  return User.create(userData);
};

const findByEmail = async (email) => {
  return User.findOne({ email: normalizeEmail(email) });
};

const findByEmailWithPassword = async (email) => {
  return User.findOne({ email: normalizeEmail(email) }).select("+passwordHash");
};

const findById = async (id) => {
  return User.findById(id);
};

const update = async (id, updates) => {
  return User.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteById = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  create,
  createUser: create,
  delete: deleteById,
  deleteById,
  findByEmail,
  findByEmailWithPassword,
  findById,
  update,
};
