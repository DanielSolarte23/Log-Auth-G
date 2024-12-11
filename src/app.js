import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { TOKEN_SECRET } from "./config/config.js";
import dotenv from 'dotenv';

dotenv.config(); 


import session from 'express-session';
import passport from 'passport';
import googleAuthRoutes from './routes/googleAuth.routes.js';

import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js";

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(session({
  secret: TOKEN_SECRET, 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

app.use("/api", userRoutes);
app.use("/api/auth", googleAuthRoutes);

export default app;
