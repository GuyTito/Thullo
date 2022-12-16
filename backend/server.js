require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const { corsOptions } = require('./config/corsOptions');
const cors = require('cors');



const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

connectDB();

//middleware
app.use(logger); //log every request
app.use(cors(corsOptions));
app.use(express.json()); //process all json coming thru
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //access static files like css etc
app.use("/uploads", express.static("uploads"));

//public routes
app.use('/', require('./routes/rootRoute'));
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/usersRoutes'))
app.use('/boards', require('./routes/boardsRoutes'))



//error routes
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" })
  } else {
    res.type('txt').send("404 Not Found")
  }
})


app.use(errorHandler);


// cant receive requests without connecting to mongodb
mongoose.connection.once('open', () => {
  console.log("Connected to mongodb");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// listen for errors on connections to mongodb
mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
