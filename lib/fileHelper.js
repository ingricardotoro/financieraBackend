const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

/*******TO UPLOAD FILE OR PHOTO */
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, 'public/customers/photos');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const multerFilter = (req, file, cb) => {
    console.log("dentro de multerFilter")
        //const allowedFileTypes = ['image/jpeg', 'image/jpg', , 'image/JPG', 'image/png', 'image/PNG'];
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
    file.mimetype.startsWith('image')
}

const upload = multer({
    storage,
    fileFilter: multerFilter,
})


module.exports = { upload }