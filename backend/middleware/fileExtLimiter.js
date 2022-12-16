const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    if (req.files){
      const userFile = req.files.userFile
      const allowed = allowedExtArray.includes(path.extname(userFile.name).toLowerCase())

      if (!allowed) {
        const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

        return res.status(422).json({ status: "error", message });
      }
    }

    next()
  }
}

module.exports = fileExtLimiter