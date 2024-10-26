const multer = require('multer');


const imagestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/swati/keval/newtut/MERN/backend/uploadedimages');
    },
    filename: (req, file, cb) => {
        console.log("filename : ", Date.now() + '-' + file.originalname);
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const imageupload = multer({
    storage: imagestorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .jpeg and .png format allowed!'));
        }
    }
})

module.exports = { imageupload, imagestorage };