import Joi from "joi";

const register = Joi.object({
  username: Joi.string().required().max(20),
  email: Joi.string().email().required().max(50),
  password: Joi.string().required().max(50).min(8),
});

const login = Joi.object({
  email: Joi.string().email().required().max(50),
  password: Joi.string().required().max(50),
});

export default {
  register,
  login,
};
