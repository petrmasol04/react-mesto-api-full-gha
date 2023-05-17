const routerCard = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCardData, validateCardId } = require('../middlewares/validation/cardcelebrate');

routerCard.get('/', getCards);
routerCard.post('/', validateCardData, createCard);
routerCard.put('/:id/likes', validateCardId, likeCard);
routerCard.delete('/:id', validateCardId, deleteCard);
routerCard.delete('/:id/likes', validateCardId, dislikeCard);

module.exports = routerCard;
