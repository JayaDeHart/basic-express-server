module.exports = (req, res, next) => {
  console.log(req.method);
  console.log(req.path);
  next();
};
