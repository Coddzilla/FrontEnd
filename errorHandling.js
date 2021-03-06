const handle400 = (err, req, res, next) => {
  const codes = {
    "23503": "username not found",

    "22P02": 'invalid input syntax for integer: "NaN"',
    "23502": 'null value in column "body" violates not-null constraint',
    "2201X": "OFFSET must not be negative"
  };
  if (codes[err.code] || err.status === 400) {
    return res.status(400).send({ msg: "sorry there was a 400, bad request!" });
  } else {
    next(err);
  }
};

const handle404 = (err, req, res, next) => {
  const codes = {};
  if (err.status === 404 || codes[err.code]) {
    res.status(404).send({ msg: "sorry, that was not found" });
  } else {
    next(err);
  }
};
const handle405 = (req, res, next) => {
  res
    .status(405)
    .send({ msg: "sorry, that request is not supported at this end point" });
};
const handle422 = (err, req, res, next) => {
  const codes = {
    "23505": 'duplicate key value violates unique constraint "topics_pkey"',
    "42703": "That sort order cannot be implimented"
  };
  if (err.status === 422 || codes[err.code]) {
    res.status(422).send({
      msg: 'duplicate key value violates unique constraint "topics_pkey"'
    });
  } else {
    next(err);
  }
};
const handle500 = (err, req, res, next) => {
  res
    .status(500)
    .send({ msg: "there was a 500 or another error yet to be accounted for" });
};

module.exports = { handle400, handle500, handle404, handle422, handle405 };
