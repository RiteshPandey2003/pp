import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();
const Port = process.env.PORT ;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(Port, () => {
  console.log('Server is running on port ',Port);
});

app.use('/api/user', userRoutes);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


