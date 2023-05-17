const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../utils/constants');

const validateRegisterData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(patternLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateIdData = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const validateUpdationInfoData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateAvatarData = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(patternLink).required(),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateRegisterData,
  validateIdData,
  validateUpdationInfoData,
  validateAvatarData,
  validateLoginData,
};
