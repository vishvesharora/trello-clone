const express = require('express');
const { check } = require('express-validator');

const boardController = require('../controllers/board-controller');

const router = express.Router();

router.get('/', boardController.getBoards);

router.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty()
  ],
  boardController.createBoard
);

module.exports = router;
