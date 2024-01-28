const multer = require('multer')

const DIR = 'public/images';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR);
    },
    filename: function (req, file, cb) {
      if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png';
        cb(null, file.fieldname + '-' + uniqueName);
      }else
      {
        cb(new Error("Just Image You can add it"))
      }
    }
});

  
const upload = multer({ storage: storage })
module.exports = upload
