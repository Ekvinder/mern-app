const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path= require('path');
 
//import Routers
const AuthRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const pdfRoutes = require('./routes/pdfRoutes');
const publicSignRoutes = require('./routes/publicSignRoutes')
const signatureRoutes = require('./routes/signatureRoutes');
const auditRoutes = require('./routes/auditRoutes');

app.set("views","./views")




//load environment variables
dotenv.config();

// Middleware
app.use(express.json()); // parse JSON
app.use(cors());         // enable CORS
       



//connect to mondoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Mongo error:', err));




 const limiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 100, // limit each IP to 100 requests per windowMs
       message: 'Too many requests from this IP, please try again after 15 minutes'
   });


 app.use(limiter); 
 
 app.use('/api/auth',AuthRoutes );
 app.use("/api/user", userRoutes);
 app.use('/api/docs',uploadRoutes);
 app.use('/uploads',express.static(path.join(__dirname,"uploads")));
 app.use("/signed_docs", express.static("signed_docs"));
 app.use('/api/pdf',pdfRoutes);
 app.use('/api/sign', publicSignRoutes)
 app.use('/api/signatures', signatureRoutes);
app.use('/api/audit', auditRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log("server running")
});