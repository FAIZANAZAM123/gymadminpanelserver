const express = require('express');
const app = express();
 const cors = require('cors');
const dotenv=require("dotenv")
const mongoose = require("mongoose");
const Admin=require('./model/admins');

const path=require('path');
dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const imagePath = 'uploads/2023-12-23T05-50-33.843Zimage (2).png';
const resolvedPath = path.resolve(imagePath);
console.log(resolvedPath)

app.use('/uploads', express.static('uploads'));
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.use(cors(corsOptions));
 
//ROUTES
app.use(require('./router/adminauth'));


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}); // Replace 'User' with your actual Mongoose model

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.use(require('./router/blog-route'));

const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port} 🔥`)); 