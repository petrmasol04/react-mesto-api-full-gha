const router = require('express').Router();
const {
  getMe, getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const {
  validateIdData,
  validateUpdationInfoData,
  validateAvatarData,
} = require('../middlewares/validation/usercelebrate');

router.get('/me', getMe);
router.get('/', getUsers);
router.get('/:id', validateIdData, getUserById);
router.patch('/me', validateUpdationInfoData, updateUser);
router.patch('/me/avatar', validateAvatarData, updateAvatar);

module.exports = router;
