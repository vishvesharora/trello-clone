const express = require('express');
const { check } = require('express-validator');

const cardController = require('../controllers/card-controller');

const router = express.Router();

router.get('/:cid', cardController.getCardById);

router.get('/board/:bid', cardController.getCardsByBoardId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  cardController.createCard
);

router.patch(
  '/:cid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  cardController.updateCard
);

router.delete('/:cid', cardController.deleteCard);

module.exports = router;
