import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Review from './models/Review.js';
import Ticket from './models/Ticket.js';

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

let inMemoryTickets = [
  {
    _id: "101",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    deviceModel: "HP DeskJet 3755",
    message: "Printer is showing offline after wireless router restart.",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    _id: "102",
    name: "Sarah Jenkins",
    email: "sarah.j@test.com",
    phone: "+1 (555) 123-4567",
    deviceModel: "Canon OfficeJet Pro",
    message: "Scanner driver is failing to install on Windows 11.",
    status: "In Progress",
    createdAt: new Date(Date.now() - 7200000)
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

// --- Ticket / Support Request Endpoints ---

// Get all support tickets (Protected Endpoint - Admin Only)
app.get('/api/tickets', authenticateToken, async (req, res) => {
  if (isMongoConnected) {
    try {
      const tickets = await Ticket.find().sort({ createdAt: -1 });
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.json(inMemoryTickets);
  }
});

// Create a support ticket (Public Endpoint from Contact Us page)
app.post('/api/tickets', async (req, res) => {
  if (isMongoConnected) {
    const ticket = new Ticket({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      deviceModel: req.body.deviceModel || 'Not specified',
      message: req.body.message
    });

    try {
      const newTicket = await ticket.save();
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    const newTicket = {
      _id: Date.now().toString(),
      name: req.body.name || "Anonymous",
      email: req.body.email || "No email",
      phone: req.body.phone || "No phone",
      deviceModel: req.body.deviceModel || "Not specified",
      message: req.body.message || "",
      status: "Pending",
      createdAt: new Date()
    };
    inMemoryTickets.unshift(newTicket);
    res.status(201).json(newTicket);
  }
});

// Update ticket status (Protected Endpoint)
app.patch('/api/tickets/:id/status', authenticateToken, async (req, res) => {
  const { status } = req.body;
  if (isMongoConnected) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    const ticket = inMemoryTickets.find(t => t._id === req.params.id);
    if (ticket) {
      ticket.status = status;
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found in memory' });
    }
  }
});

// Delete a support ticket (Protected Endpoint)
app.delete('/api/tickets/:id', authenticateToken, async (req, res) => {
  if (isMongoConnected) {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json({ message: 'Ticket deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    inMemoryTickets = inMemoryTickets.filter(t => t._id !== req.params.id);
    res.json({ message: 'Ticket deleted from in-memory fallback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
