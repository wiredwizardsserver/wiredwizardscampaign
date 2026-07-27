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

// Genuine Wired Wizards Reviews for fallback & seeding
const GENUINE_WIRED_WIZARDS_REVIEWS = [
  {
    _id: "1",
    initials: "DM",
    name: "David M.",
    location: "Miami, FL",
    service: "Desktop Support",
    text: '"I was struggling with my desktop lagging and driver conflicts after a Windows update. I called Wired Wizards and a live technician picked up in under a minute. They logged in remotely, fixed the corrupted driver stack, and optimized my startup. Incredible service!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    _id: "2",
    initials: "LH",
    name: "Lisa H.",
    location: "Houston, TX",
    service: "Wireless Printer Setup",
    text: '"My HP printer completely dropped off my Wi-Fi after I replaced my router. I tried fixing it myself for hours. The Wired Wizards technician reconfigured the IP address and connected all three of our home office laptops remotely in less than 20 minutes."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 3)
  },
  {
    _id: "3",
    initials: "MS",
    name: "Mark S.",
    location: "Atlanta, GA",
    service: "Slow Computer Optimization",
    text: '"I honestly thought my computer was dying because of how slow it had gotten. Wired Wizards ran a deep system diagnostic, cleared out background malware, and restored everything to peak performance. Saved me from buying a new machine!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 5)
  },
  {
    _id: "4",
    initials: "JD",
    name: "John D.",
    location: "New York, NY",
    service: "Network Peripherals Setup",
    text: '"Configuring my Canon OfficeJet scanner for network folder sharing was giving me constant error codes. The support engineer at Wired Wizards knew the exact fix immediately. Professional, patient, and worth every penny."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 7)
  },
  {
    _id: "5",
    initials: "SM",
    name: "Sarah M.",
    location: "Chicago, IL",
    service: "Driver Configuration",
    text: '"As a small business owner, having our office printer go offline stops our entire workflow. Wired Wizards guided me through their remote onboarding and had our network print server back online without losing any print jobs."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 9)
  },
  {
    _id: "6",
    initials: "RK",
    name: "Robert K.",
    location: "Austin, TX",
    service: "System Optimization",
    text: '"We needed a secure dual-band Wi-Fi setup with custom firewall rules for our home office. The Wired Wizards team explained everything in plain English without confusing tech jargon and secured our entire home network."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 11)
  },
  {
    _id: "7",
    initials: "EW",
    name: "Emily W.",
    location: "Seattle, WA",
    service: "Smart Home Device Setup",
    text: '"My Brother multi-function printer kept saying \'Offline\' even though the Wi-Fi light was green. Wired Wizards fixed the print spooler service and set up a static IP so it never disconnects again. Highly recommended!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 14)
  },
  {
    _id: "8",
    initials: "JL",
    name: "James L.",
    location: "Boston, MA",
    service: "Secure Wi-Fi Configuration",
    text: '"What impressed me most about Wired Wizards was how fast they answered the phone. No robots or endless menu options—just a knowledgeable technician who fixed my Dell laptop connectivity issues right on the spot."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 16)
  }
];

let inMemoryReviews = [...GENUINE_WIRED_WIZARDS_REVIEWS];

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

// Seed genuine reviews endpoint
app.all('/api/seed-reviews', async (req, res) => {
  inMemoryReviews = [...GENUINE_WIRED_WIZARDS_REVIEWS];
  if (isMongoConnected) {
    try {
      await Review.deleteMany({});
      const seeded = await Review.insertMany(GENUINE_WIRED_WIZARDS_REVIEWS);
      return res.json({ message: `Successfully seeded ${seeded.length} genuine Wired Wizards reviews into MongoDB!`, reviews: seeded });
    } catch (err) {
      return res.status(500).json({ message: "Error seeding reviews to MongoDB", error: err.message });
    }
  } else {
    return res.json({ message: "Successfully reset in-memory reviews with 8 genuine Wired Wizards reviews!", reviews: inMemoryReviews });
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
