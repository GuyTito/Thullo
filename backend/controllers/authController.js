const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')




// @desc Create a new User
// @route POSt /auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body

  // Confirm data
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate username
  const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
  if (duplicateEmail) return res.status(409).json({ message: 'This email is already taken' })

  const duplicateFullname = await User.findOne({ fullname }).collation({ locale: 'en', strength: 2 }).lean().exec()
  if (duplicateFullname) return res.status(409).json({ message: 'This full name is already taken' })

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

  const userObject = { fullname, email, "password": hashedPwd }

  // Create and store new user 
  const user = await User.create(userObject)

  // if (user) { //created
  //   res.status(201).json({ message: `New user ${fullname} created` })
  // } 
  if (!user) {
    res.status(400).json({ message: 'Invalid user data received' })
  }

  // create secret with this in Node repl: require('crypto').randomBytes(64).toString('hex')
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "fullname": user.fullname,
        "email": user.email,
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { "email": user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  // Create secure cookie with refresh token 
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    // secure: true, //https . omit "secure: true" when using Postman
    sameSite: 'None', //cross-site cookie 
    maxAge: 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  })

  // Send accessToken containing fullname and email 
  res.json({ accessToken })
})


// @desc login User
// @route POSt /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundUser = await User.findOne({ email }).exec()

  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  // create secret with this in Node repl: require('crypto').randomBytes(64).toString('hex')
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "fullname": foundUser.fullname,
        "email": foundUser.email,
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { "email": foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  // Create secure cookie with refresh token 
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    // secure: true, //https . omit "secure: true" when using Postman
    sameSite: 'None', //cross-site cookie 
    maxAge: 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  })

  // Send accessToken containing fullname and email 
  res.json({ accessToken })
})


// @desc get new access token
// @route POSt /auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      const foundUser = await User.findOne({ email: decoded.email }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "fullname": foundUser.fullname,
            "email": foundUser.email
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ accessToken })
    })
  )
})


// @desc signout User
// @route POSt /auth/signout
// @access Public
const signout = asyncHandler(async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    // secure: true,  // omit "secure: true" when using Postman
  })
  res.json({ message: 'Cookie cleared' })
})


module.exports = { register, login, refresh, signout }