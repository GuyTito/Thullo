const { logEvents } = require("./logger")

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.log')
  console.error(err.stack)
  
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({message: err.message, isError: true})
}

module.exports = errorHandler;