const allowedOrigins = require("./allowedOrigins")


const corsOptions = {
  origin: (origin, callback) => {
    // remove !origin when ready to push. !origin for origins whiout headers like postman etc
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}


module.exports = {corsOptions}