import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Review from './models/Review.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wiredwizards";
let isMongoConnected = false;

// In-memory fallback database for local development/testing when MongoDB is unreachable
let inMemoryReviews = [
  {
    _id: "1",
    initials: "DM",
    name: "David M.",
    location: "Miami, FL",
    service: "Desktop Support",
    text: '"Outstanding service. My desktop was taking forever to load applications. After the remote session, everything became noticeably faster."',
    rating: 5,
    createdAt: new Date()
  },
  {
    _id: "2",
    initials: "LH",
    name: "Lisa H.",
    location: "Houston, TX",
    service: "Wireless Printer Setup",
    text: '"My wireless printer stopped communicating with my computer after a router update. The technician quickly reconfigured everything and solved the issue."',
    rating: 5,
    createdAt: new Date()
  }
];

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB');
    isMongoConnected = true;
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed (likely internal hostname unreachable locally). Using in-memory fallback for local testing.');
    isMongoConnected = false;
  });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  const jwtSecret = process.env.JWT_SECRET || "defaultsecret";

  if (!token) {
    return res.status(401).json({ message: "Access denied: No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access denied: Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Admin Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const validUsername = process.env.ADMIN_USERNAME || "admin";
  const validPassword = process.env.ADMIN_PASSWORD || "secretadmin";
  const jwtSecret = process.env.JWT_SECRET || "defaultsecret";

  if (username === validUsername && password === validPassword) {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '24h' });
    return res.json({ token, message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Get all reviews (Public endpoint for main landing page and admin list)
app.get('/api/reviews', async (req, res) => {
  if (isMongoConnected) {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.json(inMemoryReviews);
  }
});

// Create a review (Protected Endpoint)
app.post('/api/reviews', authenticateToken, async (req, res) => {
  if (isMongoConnected) {
    const review = new Review({
      initials: req.body.initials,
      name: req.body.name,
      location: req.body.location,
      service: req.body.service,
      text: req.body.text,
      rating: req.body.rating
    });

    try {
      const newReview = await review.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    const newReview = {
      _id: Date.now().toString(),
      initials: req.body.initials || "AN",
      name: req.body.name || "Anonymous",
      location: req.body.location || "USA",
      service: req.body.service || "General Support",
      text: req.body.text || "",
      rating: req.body.rating || 5,
      createdAt: new Date()
    };
    inMemoryReviews.unshift(newReview);
    res.status(201).json(newReview);
  }
});

// Delete a review (Protected Endpoint)
app.delete('/api/reviews/:id', authenticateToken, async (req, res) => {
  if (isMongoConnected) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    inMemoryReviews = inMemoryReviews.filter(r => r._id !== req.params.id);
    res.json({ message: 'Review deleted from in-memory fallback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
