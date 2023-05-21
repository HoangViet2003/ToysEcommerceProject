const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
            
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
},limits:{
    fileSize: 1024 * 1024 * 5
}
});

module.exports = upload;
