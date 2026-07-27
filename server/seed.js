import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Review.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wiredwizards";

const GENUINE_WIRED_WIZARDS_REVIEWS = [
  {
    initials: "DM",
    name: "David M.",
    location: "Miami, FL",
    service: "Desktop Support",
    text: '"I was struggling with my desktop lagging and driver conflicts after a Windows update. I called Wired Wizards and a live technician picked up in under a minute. They logged in remotely, fixed the corrupted driver stack, and optimized my startup. Incredible service!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    initials: "LH",
    name: "Lisa H.",
    location: "Houston, TX",
    service: "Wireless Printer Setup",
    text: '"My HP printer completely dropped off my Wi-Fi after I replaced my router. I tried fixing it myself for hours. The Wired Wizards technician reconfigured the IP address and connected all three of our home office laptops remotely in less than 20 minutes."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 3)
  },
  {
    initials: "MS",
    name: "Mark S.",
    location: "Atlanta, GA",
    service: "Slow Computer Optimization",
    text: '"I honestly thought my computer was dying because of how slow it had gotten. Wired Wizards ran a deep system diagnostic, cleared out background malware, and restored everything to peak performance. Saved me from buying a new machine!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 5)
  },
  {
    initials: "JD",
    name: "John D.",
    location: "New York, NY",
    service: "Network Peripherals Setup",
    text: '"Configuring my Canon OfficeJet scanner for network folder sharing was giving me constant error codes. The support engineer at Wired Wizards knew the exact fix immediately. Professional, patient, and worth every penny."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 7)
  },
  {
    initials: "SM",
    name: "Sarah M.",
    location: "Chicago, IL",
    service: "Driver Configuration",
    text: '"As a small business owner, having our office printer go offline stops our entire workflow. Wired Wizards guided me through their remote onboarding and had our network print server back online without losing any print jobs."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 9)
  },
  {
    initials: "RK",
    name: "Robert K.",
    location: "Austin, TX",
    service: "System Optimization",
    text: '"We needed a secure dual-band Wi-Fi setup with custom firewall rules for our home office. The Wired Wizards team explained everything in plain English without confusing tech jargon and secured our entire home network."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 11)
  },
  {
    initials: "EW",
    name: "Emily W.",
    location: "Seattle, WA",
    service: "Smart Home Device Setup",
    text: '"My Brother multi-function printer kept saying \'Offline\' even though the Wi-Fi light was green. Wired Wizards fixed the print spooler service and set up a static IP so it never disconnects again. Highly recommended!"',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 14)
  },
  {
    initials: "JL",
    name: "James L.",
    location: "Boston, MA",
    service: "Secure Wi-Fi Configuration",
    text: '"What impressed me most about Wired Wizards was how fast they answered the phone. No robots or endless menu options—just a knowledgeable technician who fixed my Dell laptop connectivity issues right on the spot."',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 16)
  }
];

async function seed() {
  console.log('Connecting to MongoDB...', MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB.');
    
    console.log('Clearing existing reviews...');
    await Review.deleteMany({});
    
    console.log('Seeding genuine Wired Wizards reviews...');
    const inserted = await Review.insertMany(GENUINE_WIRED_WIZARDS_REVIEWS);
    console.log(`✅ Successfully seeded ${inserted.length} genuine reviews into MongoDB!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed MongoDB:', error);
    process.exit(1);
  }
}

seed();
