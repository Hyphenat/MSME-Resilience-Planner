exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.formatResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

exports.generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

exports.isEmpty = (value) => {
  return value === undefined || value === null || value === '';
};
