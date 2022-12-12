const jwt = require('jsonwebtoken')


function useTokens(user){
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

  const cookieOptions = {
    httpOnly: true, //accessible only by web server 
    secure: true, //https . omit "secure: true" when using Postman
    sameSite: 'None', //cross-site cookie 
    maxAge: 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  }

  return { accessToken, refreshToken, cookieOptions }
}

module.exports = { useTokens }