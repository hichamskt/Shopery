const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const productRoutes = require("./routes/productRoute")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

app.use(cookieParser());




const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created:', uploadsDir);
}



// app.use('/api/user',userRoutes)



const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then(() =>{
    console.log('Database connection successful')
     })
    .catch((err) => console.log('Database connection error:', err))


const httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT,() => console.log('it work !!!',process.env.PORT ));