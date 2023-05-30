const { RequestError } = require('../helpers');

const validation = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) throw RequestError(400, error.message);

    next();
  };
};

module.exports = validation;
