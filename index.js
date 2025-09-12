import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const app = Express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cookieParser());

import { connectDB } from './db/db.js';

connectDB();

import userRoute from './routes/user.routes.js';
import doctorRoute from './routes/doctor.route.js';
import medicineShopRoute from './routes/medicineShop.route.js';

app.use("/doctor", doctorRoute);
app.use("/medicineShop", medicineShopRoute);
app.use("/user", userRoute);

app.get('/health', (req, res) => {
  res.send('API is healthy, running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});