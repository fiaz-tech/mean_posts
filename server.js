import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js';

import express from 'express'
import connectDB from './backend/config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import postRoutes from './backend/routes/postRoutes.js'

const app = express();

dotenv.config();

connectDB();

app.use(cors())
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use('/api/posts', postRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 33000
app.listen(33000, console.log(
  `Server running in ${process.env.NODE_ENV} mode from PORT ${PORT}`
  ))




