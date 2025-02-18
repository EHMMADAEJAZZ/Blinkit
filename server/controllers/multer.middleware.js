import multer from  'multer';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') ){
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
}

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: fileFilter
})

export default upload;