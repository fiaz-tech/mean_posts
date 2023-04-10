import { notFound, errorHandler } from './backend/middleware/errorMiddleware.js';

import express from 'express'
import connectDB from './backend/config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'

import postRoutes from './backend/routes/postRoutes.js'
import userRoutes from './backend/routes/userRoutes.js'

const app = express();

dotenv.config();

connectDB();

app.use(cors())
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/imageuploads", express.static(path.join("backend/imageuploads")));


app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 33000
app.listen(33000, console.log(
  `Server running in ${process.env.NODE_ENV} mode from PORT ${PORT}`
  ))




