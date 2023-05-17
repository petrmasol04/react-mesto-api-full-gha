const router = require('express').Router();
const {
  createUsers, login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/error/not-found');
const {
  validateLoginData, validateRegisterData,
} = require('../middlewares/validation/usercelebrate');

const routerUsers = require('./users');
const routerCards = require('./cards');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUsers);
router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
