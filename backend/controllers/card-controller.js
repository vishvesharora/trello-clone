
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const Card = require('../models/card');
const Board = require('../models/board');

const getCardById = async (req, res, next) => {
  const cardId = req.params.cid;

  let card;
  try {
    card = await Card.findById(cardId).populate('board').exec();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a card.',
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError(
      'Could not find card for the provided id.',
      404
    );
    return next(error);
  }

  card

  res.json({ card: card.toObject({ getters: true }) });
};

const getCardsByBoardId = async (req, res, next) => {
  const boardId = req.params.bid;
  
  let board;
  try{
    board =  await Board.findById(boardId).exec();
  }catch(err){
    const error = new HttpError(
      'Fetching cards failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if(!board){
    return next(
        new HttpError('Could not find board', 404)
    );
  }

  let cards;
  try {
    cards = await Card.find({board: boardId})
  } catch (err) {
    const error = new HttpError(
      'Fetching cards failed, please try again later.',
      500
    );
    return next(error);
  }


  // if (!cards || cards.length === 0) {
  //   return next(
  //     new HttpError('Could not find cards for the provided user id.', 404)
  //   );
  // }

  res.json({ cards: cards.map(card => card.toObject({ getters: true, versionKey: false })) });
}

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, board } = req.body;

  const createdCard = new Card({
    title,
    description,
    board
  });

  let b;
  try {
    b = await Board.findById(board);
  } catch (err) {
    const error = new HttpError(
      'Creating card failed, please try again.',
      500
    );
    return next(error);
  }

  if (!b) {
    const error = new HttpError('Could not find the board', 404);
    return next(error);
  }

  try {
    await createdCard.save(); 
  } catch (err) {
    const error = new HttpError(
      'Creating card failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ card: createdCard.toObject({ getters: true, versionKey: false }) });
};

const updateCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description } = req.body;
  const cardId = req.params.cid;

  let card;
  try {
    card = await Card.findById(cardId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update card.',
      500
    );
    return next(error);
  }

  card.title = title;
  card.description = description;

  try {
    await card.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update card.',
      500
    );
    return next(error);
  }

  res.status(200).json({ card: card.toObject({ getters: true }) });
};

const deleteCard = async (req, res, next) => {
  const cardId = req.params.pid;

  let card;
  try {
    card = await Card.findById(cardId).populate('board');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete card.',
      500
    );
    return next(error);
  }

  if (!card) {
    const error = new HttpError('Could not find card for this id.', 404);
    return next(error);
  }

  try {
    await card.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete card.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted card.' });
};

exports.getCardById = getCardById;
exports.getCardsByBoardId = getCardsByBoardId;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;
