import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToDatabase, getCollection } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

app.get('/', (req, res) => res.json({ status: 'ok' }));

// mount routes
app.use('/auth', authRoutes);

// global error handler
app.use(errorHandler);

async function start() {
	try {
		const db = await connectToDatabase(MONGO_URI);
		// ensure unique index on email
		const users = db.collection('users');
		await users.createIndex({ email: 1 }, { unique: true });

		app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
	} catch (err) {
		console.error('Failed to start', err);
		process.exit(1);
	}
}

start();

