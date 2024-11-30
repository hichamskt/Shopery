const multer = require('multer');
const path = require('path');

// Define storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    const logoDir = path.join(uploadsDir, 'logo');
    const imagesDir = path.join(uploadsDir, 'images');
    const categoryDir = path.join(uploadsDir, 'category');

    if (file.fieldname === 'brandLogo') {
      cb(null, logoDir); // Save brand logo to 'logo' folder
    } else if (file.fieldname === 'images') {
      cb(null, imagesDir); // Save images to 'images' folder
    }else if (file.fieldname === 'categoryimg') {
      cb(null, categoryDir); // Save images to 'images' folder
    }
     else {
      cb(new Error('Invalid file field'));
    }
  },
  filename: (req, file, cb) => {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);

  }
});

// Set file filter to only allow certain types of files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG are allowed.'));
  }
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB per file
});

module.exports = upload;
