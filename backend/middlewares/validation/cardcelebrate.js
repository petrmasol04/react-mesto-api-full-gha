const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../utils/constants');

const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(patternLink),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateCardData,
  validateCardId,
};
