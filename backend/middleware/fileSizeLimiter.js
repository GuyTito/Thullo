

const fileSizeLimiter = (MB) => {
  //3MB
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;

  return (req, res, next) => {
    if (req.files) {
      const userFile = req.files.userFile
      if (userFile.size > FILE_SIZE_LIMIT) {
        const message = `Upload failed. ${userFile} is over the file size limit of ${MB}MB.`

        return res.status(413).json({ status: "error", message }); // file too big
      }
    }
    
    next();
  }
}


module.exports = fileSizeLimiter;