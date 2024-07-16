import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { connectDB } from './config/database.js';

import CitiesRouter from './routes/CitiesRouter/CitiesRouter.js';
import HotspotRouter from './routes/HotspotRouter/HotspotRouter.js';
import NationsRouter from './routes/NationsRouter/NationsRouter.js';
import LandmarksRouter from './routes/LandmarksRouter/LandmarksRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'wasm-unsafe-eval'", "'inline-speculation-rules'", (req, res) => `'nonce-${res.locals.nonce}'`],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https:"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors({
    origin: 'https://travel-guide-frontend.onrender.com', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    res.setHeader('Content-Security-Policy', `script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' 'nonce-${res.locals.nonce}';`);
    next();
});
app.use("/images", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.json('Hello World');
});

//api endpoints
app.use('/api/city', CitiesRouter);
app.use('/api/hotspot', HotspotRouter);
app.use('/api/nations', NationsRouter);
app.use('/api/landmarks', LandmarksRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});


