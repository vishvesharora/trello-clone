const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Board = require('../models/board');

const getBoards = async (req, res, next) => {
  let boards;
  try {
    boards = await Board.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching boards failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ boards: boards.map(board => board.toObject({ getters: true, versionKey: false })) });
};

const createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name } = req.body;

  const createdBoard = new Board({
    name,
  });

  try {
    await createdBoard.save(); 
  } catch (err) {
    const error = new HttpError(
      'Creating card failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ board: createdBoard.toObject({ getters: true, versionKey: false }) });
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
