  import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Shield, 
  Check, 
  Flag, 
  Zap, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Megaphone, 
  X,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import SupportedBrands from './SupportedBrands.jsx';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    initials: 'DM',
    name: 'David M.',
    location: 'Miami, FL',
    service: 'Desktop Support',
    text: '"Outstanding service. My desktop was taking forever to load applications. After the remote session, everything became noticeably faster."'
  },
  {
    id: 2,
    initials: 'LH',
    name: 'Lisa H.',
    location: 'Houston, TX',
    service: 'Wireless Printer Setup',
    text: '"My wireless printer stopped communicating with my computer after a router update. The technician quickly reconfigured everything and solved the issue."'
  },
  {
    id: 3,
    initials: 'MS',
    name: 'Mark S.',
    location: 'Atlanta, GA',
    service: 'Slow Computer Optimization',
    text: '"I thought I needed a new computer because of how slow it was. Sky Techiez cleaned up the system and restored the performance completely."'
  },
  {
    id: 4,
    initials: 'JD',
    name: 'John D.',
    location: 'New York, NY',
    service: 'Network Peripherals Setup',
    text: '"Configuring my network peripherals was proving difficult after shifting my router setup. The technician resolved it in under 15 minutes over the phone."'
  },
  {
    id: 5,
    initials: 'SM',
    name: 'Sarah M.',
    location: 'Chicago, IL',
    service: 'Driver Configuration',
    text: '"Excellent customer onboarding workflow. The step-by-step documentation was straightforward, and the phone agent helped finalize the driver stack profile."'
  },
  {
    id: 6,
    initials: 'RK',
    name: 'Robert K.',
    location: 'Austin, TX',
    service: 'System Optimization',
    text: '"My computer was lagging significantly during application launches. The cleanup checklist optimization made a noticeable difference."'
  },
  {
    id: 7,
    initials: 'EW',
    name: 'Emily W.',
    location: 'Seattle, WA',
    service: 'Smart Home Device Setup',
    text: '"Setting up my home network smart hub was a nightmare until I called. The technician patiently walked me through every connection and it works perfectly."'
  },
  {
    id: 8,
    initials: 'JL',
    name: 'James L.',
    location: 'Boston, MA',
    service: 'Secure Wi-Fi Configuration',
    text: '"I needed help setting up a secure network for my home office. They configured my dual-band router and set up firewall rules in no time."'
  }
];

const DEVICE_GUIDES = {
  'hp deskjet 3755': {
    title: 'HP DeskJet 3755 Setup Guide',
    steps: [
      'Unpack the printer and connect the power cable. Turn the printer on.',
      'Open the cartridge access door, install the setup ink cartridges, and load letter paper in the tray.',
      'Download and install HP Smart App or driver software on your computer/mobile device.',
      'Follow instructions in the app to connect the printer to your local Wi-Fi network and start printing.'
    ]
  },
  'officejet 3830': {
    title: 'HP OfficeJet 3830 Wireless Setup Guide',
    steps: [
      'Remove all tape and packing materials from the print carriage. Power on the printer.',
      'Select your language and region on the printer control panel.',
      'Install the black and tri-color ink cartridges, load paper, and complete the printhead alignment.',
      'On the printer screen, go to Network Settings -> Wireless Setup Wizard to find and connect to your Wi-Fi.'
    ]
  },
  'pixma mg3620': {
    title: 'Canon Pixma MG3620 Setup Guide',
    steps: [
      'Plug in and turn on the printer. Verify that the power LED is lit solid.',
      'Hold the Wi-Fi button down until the alarm lamp flashes once, then release.',
      'Press the Color button first, and then the Wi-Fi button. Ensure the Wi-Fi lamp flashes quickly.',
      'Open the Canon Print Utility on your laptop/phone to connect the printer to your local router.'
    ]
  },
  'epson ecotank et-2800': {
    title: 'Epson EcoTank ET-2800 Setup Guide',
    steps: [
      'Unpack printer, fill the tanks with the included ink bottles (ensure color matching). Keep bottles upright.',
      'Connect the power cord, turn it on, and wait for ink charging initialization (approx. 10 minutes).',
      'Load letter-sized paper in the rear paper feed slot.',
      'Use the LCD control panel to navigate to Wi-Fi Setup and select your network SSID to enter the password.'
    ]
  },
  'brother hl-l2350dw': {
    title: 'Brother HL-L2350DW Setup Guide',
    steps: [
      'Install the drum unit and toner cartridge assembly into the machine.',
      'Slide open the paper tray and load plain paper, adjusting the guides.',
      'Connect the power cord and turn on the power button.',
      'Press Menu, navigate to Network -> WLAN -> Setup Wizard, and select your network to connect.'
    ]
  }
};

const GENERAL_PRINTER_GUIDE = {
  title: 'Standard Printer Setup Guide',
  steps: [
    'Unpack the printer and remove all protective tape, labels, and orange inserts from all compartments.',
    'Connect the power cord to a wall outlet, plug it into the printer, and turn on the unit.',
    'Insert the ink cartridges or toner into their respective color slots.',
    'Load standard letter-sized paper in the input tray.',
    'On the printer control panel, search for Wi-Fi/Network settings and use the Setup Wizard to connect.',
    'Go to system settings on your computer (Printers & Scanners) and select "Add Printer" to link the device.'
  ]
};

function App() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setReviews(data);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showBubble, setShowBubble] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "How may I help you today?", sender: 'bot' }
  ]);
  const [chatOptions, setChatOptions] = useState([
    'Printer Offline',
    'New printer Setup',
    'Drivers Not Install',
    'Other issue'
  ]);
  const [chatInputText, setChatInputText] = useState('');
  const chatBodyRef = useRef(null);

  // Scroll chatbot to bottom when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleOptionClick = (opt) => {
    // Add user message
    const userMsgId = Date.now();
    setChatMessages(prev => [
      ...prev,
      { id: userMsgId, text: opt, sender: 'user' }
    ]);
    setChatOptions([]);

    // Add chatbot response with a slight delay
    setTimeout(() => {
      let reply = '';
      let nextOpts = [];
      if (opt === 'Printer Offline') {
        reply = "I see your printer is offline. Please make sure the printer is turned on and connected to the same Wi-Fi network as your computer. If the problem persists, please call our toll-free line to speak with a technician immediately.";
        nextOpts = ['Call Support', 'Main Menu'];
      } else if (opt === 'New printer Setup') {
        reply = "I can help with that! Type your printer model in the search bar above to see the guide, or call our toll-free line at +1 (888) 908-1218 to have a technician set it up for you.";
        nextOpts = ['Call Support', 'Main Menu'];
      } else if (opt === 'Drivers Not Install') {
        reply = "Driver issues are very common. Let's get the correct driver package. Please search your specific model in the search bar on our page, or dial our toll-free support line.";
        nextOpts = ['Call Support', 'Main Menu'];
      } else if (opt === 'Other issue') {
        reply = "Please describe your issue or connect with our support team by calling +1 (888) 908-1218 for immediate help.";
        nextOpts = ['Main Menu'];
      } else if (opt === 'Main Menu') {
        reply = "How may I help you today?";
        nextOpts = ['Printer Offline', 'New printer Setup', 'Drivers Not Install', 'Other issue'];
      } else if (opt === 'Call Support') {
        reply = "Connecting you... For immediate assistance, please call our toll-free number +1 (888) 908-1218 to speak directly with an independent IT technician.";
        nextOpts = ['Main Menu'];
      }

      setChatMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: 'bot' }
      ]);
      setChatOptions(nextOpts);
    }, 800);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    const userMsg = chatInputText.trim();
    setChatInputText('');

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), text: userMsg, sender: 'user' }
    ]);
    setChatOptions([]);

    setTimeout(() => {
      const reply = `Thank you for the details. To fix your issue with "${userMsg}" immediately, please dial our toll-free line +1 (888) 908-1218 to speak directly with Patrick or other available IT technicians.`;
      setChatMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: 'bot' }
      ]);
      setChatOptions(['Main Menu']);
    }, 800);
  };

  // Handle scroll event to update active dot
  const handleScroll = () => {
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;
      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      const cards = scroller.children;
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(scrollerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
      setActiveIndex(closestIndex);
    }
  };

  // Scroll to a specific card
  const scrollToCard = (index) => {
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;
      const card = scroller.children[index];
      if (card) {
        const targetScroll = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
        scroller.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  };

  // Autoplay function
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      if (scrollerRef.current && reviews.length > 0) {
        const nextIndex = (activeIndex + 1) % reviews.length;
        scrollToCard(nextIndex);
      }
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  // Model search logic
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    let found = null;

    // Direct match check
    for (const key in DEVICE_GUIDES) {
      if (query.includes(key) || key.includes(query)) {
        found = DEVICE_GUIDES[key];
        break;
      }
    }

    if (found) {
      setSearchResults(found);
    } else {
      // General Fallback Guide
      setSearchResults({
        title: `Generic Setup Guide for "${searchQuery}"`,
        steps: GENERAL_PRINTER_GUIDE.steps,
        isFallback: true
      });
    }
  };

  return (
    <div className="layout-container">
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="top-bar-info" id="top-announcement-text">
          Expert IT consultations & Support - Available 24/7
        </div>
        <div className="top-bar-actions">
          <a href="tel:+18889081218" className="phone-outline-btn" id="header-phone-btn">
            <Phone size={14} />
            <span>+1 (888) 908-1218</span>
          </a>
        </div>
      </div>

      {/* Main Hero Banner */}
      <header className="hero-section" id="main-hero">
        <div className="live-badge" id="live-support-badge">
          <span className="pulse-dot"></span>
          Live Support Available Now
        </div>
        <h1 className="hero-title" id="hero-heading">
          Your Printer Problems End Here
        </h1>
        <p className="hero-subtitle" id="hero-description">
          Expert help for printer setup, drivers, network config, and device troubleshooting — solved by a real technician.
        </p>

        <a href="tel:+18889081218" className="cta-button" id="hero-cta-btn">
          <Phone size={20} fill="currentColor" />
          <span>Call +1 (888) 908-1218</span>
        </a>

        <div className="trust-badges" id="trust-badges-container">
          <div className="trust-badge-item" id="badge-secure">
            <span className="trust-badge-icon"><Shield size={18} /></span>
            <span>Secure Sessions</span>
          </div>
          <div className="trust-badge-item" id="badge-experts">
            <span className="trust-badge-icon"><CheckCircle size={18} /></span>
            <span>Independent IT Experts</span>
          </div>
          <div className="trust-badge-item" id="badge-location">
            <span className="trust-badge-icon"><Flag size={18} /></span>
            <span>US-Based Support</span>
          </div>
          <div className="trust-badge-item" id="badge-speed">
            <span className="trust-badge-icon"><Zap size={18} /></span>
            <span>Avg. Fix: 15 min</span>
          </div>
        </div>
      </header>

      {/* Interactive Search Section */}
      <main className="search-section" id="device-setup-search-section">
        <div className="search-container">
          <span className="search-title-label">Find Your Device Setup Guide</span>
          <h2 className="search-title" id="search-heading">Enter Your Model Information</h2>
          <p className="search-desc">
            Type your hardware model name to view configuration instructions immediately.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-bar-wrapper" id="search-form">
            <input 
              type="text" 
              placeholder="Enter your printer model (e.g. HP DeskJet 3755)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="model-search-input"
            />
            <button type="submit" className="search-btn" id="model-search-btn">
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>

          {!searchResults && (
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
              Please enter your device model to see configuration steps.
            </p>
          )}
        </div>
      </main>

      {/* Setup Guide Section showing detailed steps and sticky blue sidebar */}
      {searchResults && (
        <section className="guide-section" id="universal-guide-section">
          <div className="guide-section-inner">
            <div className="row-flex">
              {/* Left Column: 7-step flow card */}
              <div className="col-left">
                <div className="guide-flow-card">
                  <h2>Universal Setup Instructions</h2>
                  
                  {/* Step 1 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 1</span> Power On Device</h3>
                    <p>Plug your device securely into a nearby power source and press the power toggle. Wait for the initialization sequence to complete, confirming that the front panel screen or indicator status light is steady and clear of alerts.</p>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image2.png" 
                      className="flow-step-img" 
                      alt="Power Initialization" 
                    />
                  </div>

                  {/* Step 2 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 2</span> Choose Connection Protocol</h3>
                    <p>Establish a physical or wireless interface connection between your desktop/laptop computer and your external hardware device:</p>
                    
                    <div className="sub-method-box">
                      <h4>Option A: Wi-Fi Setup</h4>
                      <ul>
                        <li>1. Access your device control panel interface and open the <strong>Network Settings</strong> tab.</li>
                        <li>2. Select your local Wi-Fi router network SSID name.</li>
                        <li>3. Enter your password configuration key and verify the connection is active.</li>
                        <li>4. Confirm that your workstation is connected to the same network.</li>
                      </ul>
                      <img 
                        src="https://skytechiez.online/printer-setup-images/image1.png" 
                        className="flow-step-img" 
                        alt="Network Wireless Setup" 
                        style={{ marginTop: '15px' }}
                      />
                    </div>
                    
                    <div className="sub-method-box" style={{ borderLeftColor: '#1d4ed8' }}>
                      <h4>Option B: USB Hardwire Setup</h4>
                      <ul>
                        <li>1. Insert one end of the standard USB connection cable into your device port.</li>
                        <li>2. Attach the opposite end to an available high-speed USB socket on your laptop or computer.</li>
                        <li>3. Your operating system will automatically play an interface detection sound.</li>
                      </ul>
                    </div>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image3.png" 
                      className="flow-step-img" 
                      alt="Hardwire Connection Setup" 
                    />
                  </div>

                  {/* Step 3 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 3</span> Open Operating System Preferences</h3>
                    <p>Open your system control manager settings to begin the pairing process:</p>
                    <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #eef2f6', fontSize: '14px' }}>
                      <p style={{ marginBottom: '6px' }}><strong>Windows OS:</strong> Navigate to <em>Start → Settings → Devices → Printers & Scanners</em></p>
                      <p style={{ marginBottom: '0' }}><strong>macOS:</strong> Navigate to <em>Apple Menu → System Preferences → Printers & Scanners</em></p>
                    </div>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image4.png" 
                      className="flow-step-img" 
                      alt="System Panel Navigation" 
                    />
                  </div>

                  {/* Step 4 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 4</span> Detect and Add Hardware</h3>
                    <p>Click on <strong>Add Device</strong> or <strong>Add Printer</strong>. Your system will scan local networks and USB connections. Select your device model name when it appears in the scanned list.</p>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image5.png" 
                      className="flow-step-img" 
                      alt="Detecting Local Hardware" 
                    />
                  </div>

                  {/* Step 5 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 5</span> System Settings Integration</h3>
                    <p>The operating system will check internal archives and configure the device parameters. If your system requires additional setup utilities, open the system hardware wizard or contact your network administrator.</p>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image6.png" 
                      className="flow-step-img" 
                      alt="System Settings Alignment" 
                    />
                  </div>

                  {/* Step 6 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 6</span> Apply Final Configurations</h3>
                    <p>Walk through any final setup calibration checks on your desktop interface. Set your preferred defaults (e.g. layout choices, color settings) and confirm alignment options.</p>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image7.png" 
                      className="flow-step-img" 
                      alt="Applying Device Settings" 
                    />
                  </div>

                  {/* Step 7 */}
                  <div className="flow-step">
                    <h3><span className="flow-step-badge">Step 7</span> Run a Test Output</h3>
                    <p>Conduct a test output run to confirm setup calibration. Choose <strong>Print Test Page</strong> or run a test scan command. If the document queues but fails to complete, restart device spooler services or contact support.</p>
                    <img 
                      src="https://skytechiez.online/printer-setup-images/image8.png" 
                      className="flow-step-img" 
                      alt="Test Calibration Run" 
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Sidebar Box */}
              <div className="col-right">
                <div className="sidebar-card">
                  <h3>🖥️ IT Consultation</h3>
                  <p style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.5', color: '#ffffff', marginBottom: '18px' }}>
                    Additional setup assistance may be required depending on wireless configuration and operating system settings.
                  </p>
                  <div className="sidebar-num">
                    <span>Toll-Free Support</span>
                    <a href="tel:+18889081218">+1 (888) 908-1218</a>
                  </div>
                  <a href="tel:+18889081218" className="sidebar-call">Call Now</a>
                  <div className="sidebar-free">Free Support</div>

                  <div className="driver-alert-box">
                    <strong>⚠ CAN'T FIND YOUR PRINTER DRIVER?</strong>
                    <div className="alert-text">
                      Need Immediate Assistance? Our Printer Experts Are Available 24/7.
                    </div>
                    <a href="tel:+18889081218">
                      <Phone size={14} style={{ marginRight: '6px' }} />
                      <span>CALL NOW: +1 (888) 908-1218</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Carousel Section */}
      <section className="reviews-section" id="customer-reviews-section">
        <div className="reviews-header">
          <span className="reviews-badge">Reviews</span>
          <h2 className="reviews-title">What Our Customers Say</h2>
          <p className="reviews-subtitle">
            Real people, real problems solved. Here's what they had to say after calling us.
          </p>
        </div>

        <div className="carousel-container" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
          {/* Previous Arrow */}
          <button 
            onClick={() => scrollToCard(activeIndex === 0 ? reviews.length - 1 : activeIndex - 1)}
            className="nav-arrow" 
            id="carousel-prev-arrow"
            aria-label="Previous Review"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Card Viewport */}
          <div className="carousel-viewport">
            <div 
              className="carousel-track" 
              ref={scrollerRef} 
              onScroll={handleScroll}
              style={{
                scrollSnapType: 'x mandatory',
                overflowX: 'auto',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none',  // IE
              }}
            >
              {reviews.map((review, idx) => (
                <div 
                  key={review._id || review.id || idx} 
                  className="review-card"
                  style={{
                    scrollSnapAlign: 'center',
                  }}
                >
                  <div>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="review-content">{review.text}</p>
                  </div>
                  <div className="author-block">
                    <div className="avatar-circle">{review.initials}</div>
                    <div className="author-info">
                      <span className="author-name">{review.name}</span>
                      <span className="author-details">{review.location} • {review.service}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button 
            onClick={() => scrollToCard((activeIndex + 1) % reviews.length)}
            className="nav-arrow" 
            id="carousel-next-arrow"
            aria-label="Next Review"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots" id="carousel-dots-list">
          {reviews.map((_, idx) => (
            <span 
              key={idx} 
              onClick={() => scrollToCard(idx)}
              className={`dot ${activeIndex === idx ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Bottom Footer Call to Action */}
      <section className="cta-footer-section" id="footer-cta-section">
        <div className="cta-footer-icon" id="footer-cta-monitor-icon">
          <span style={{ fontSize: '3rem' }}>🖥️</span>
        </div>
        <h2 className="cta-footer-title" id="footer-cta-title">
          Still Need Help? We'll Fix It Right Now.
        </h2>
        <p className="cta-footer-subtitle" id="footer-cta-desc">
          Call our toll-free line — a real technician answers in under 2 minutes. No robots. No confusing menus.
        </p>

        <a href="tel:+18889081218" className="cta-footer-btn" id="footer-phone-cta-btn">
          <Phone size={18} fill="currentColor" />
          <span>+1 (888) 908-1218 — Call Free</span>
        </a>

        <div className="footer-features-list" id="footer-features">
          <div className="feature-item-tick" id="feature-corporate">
            <span className="tick-icon"><Check size={16} /></span>
            <span>Corporate IT Strategy</span>
          </div>
          <div className="feature-item-tick" id="feature-network">
            <span className="tick-icon"><Check size={16} /></span>
            <span>Office Network Setup</span>
          </div>
          <div className="feature-item-tick" id="feature-software">
            <span className="tick-icon"><Check size={16} /></span>
            <span>Enterprise Software</span>
          </div>
          <div className="feature-item-tick" id="feature-managed">
            <span className="tick-icon"><Check size={16} /></span>
            <span>Managed IT Support</span>
          </div>
        </div>
      </section>

      {/* Floating Sidebar Support Badge */}
      {!isChatOpen && showBubble && (
        <div 
          className="support-bubble" 
          id="support-bubble-box"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setIsChatOpen(true);
            setShowBubble(false);
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="close-btn" 
            id="close-support-bubble"
            aria-label="Close message"
            type="button"
          >
            <X size={14} />
          </button>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
            <Megaphone size={16} className="tick-icon" />
            <div className="bubble-title">We Are Here!</div>
          </div>
          <p className="bubble-text">
            Speak to a live technician. Get setup and connection help now.
          </p>
        </div>
      )}

      {!isChatOpen && (
        <div 
          onClick={() => {
            setIsChatOpen(true);
            setShowBubble(false);
          }} 
          className="online-tag-vertical"
          id="online-vertical-tab"
        >
          <span className="pulse-dot" style={{ margin: '0 0 8px 0' }}></span>
          Online
        </div>
      )}

      {/* Interactive Chatbot Window */}
      {isChatOpen && (
        <div className="chatbot-window" id="patrick-chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div 
              className="chatbot-header-left" 
              onClick={() => setIsChatOpen(false)}
              id="chatbot-back-btn"
            >
              <span style={{ fontSize: '1.1rem', marginRight: '4px', fontWeight: 'bold' }}>&lt;</span>
              <span>Patrick</span>
            </div>
            <div className="chatbot-header-right">
              <button className="chatbot-header-btn" aria-label="Menu" type="button">
                <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>☰</span>
              </button>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="chatbot-header-btn" 
                id="chatbot-close-btn"
                aria-label="Close Chat"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="chatbot-body" ref={chatBodyRef} id="chatbot-msg-list">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-message-row ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="chat-avatar">
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                      <circle cx="18" cy="18" r="18" fill="#E2E8F0"/>
                      <path d="M9 16C9 11.0294 13.0294 7 18 7C22.9706 7 27 11.0294 27 16V22H9V16Z" fill="#78350F"/>
                      <circle cx="18" cy="17" r="7" fill="#FDBA74"/>
                      <path d="M11 27C11 23.6863 13.6863 21 17 21H19C22.3137 21 25 23.6863 25 27V31H11V27Z" fill="#2563EB"/>
                      <path d="M16 21L18 24L20 21H16Z" fill="#FFFFFF"/>
                    </svg>
                  </div>
                )}
                <div className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {chatOptions.length > 0 && (
              <div className="chat-options-container" id="chatbot-options-pills">
                {chatOptions.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className="chat-option-pill"
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="chatbot-footer">
            <div className="tawk-powered">
              <span className="tawk-dot"></span>
              <span>Powered by tawk.to</span>
            </div>
            <form onSubmit={handleChatSubmit} className="chatbot-input-row" id="chatbot-input-form">
              <input 
                type="text" 
                placeholder="Type here and press enter.." 
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="chatbot-input"
                id="chatbot-text-input"
              />
              <div className="chatbot-input-icons">
                <button type="button" className="chatbot-icon-btn" aria-label="Like" onClick={() => setChatInputText(prev => prev + ' 👍')}>
                  <span>👍</span>
                </button>
                <button type="button" className="chatbot-icon-btn" aria-label="Attach File">
                  <span>📎</span>
                </button>
                <button type="button" className="chatbot-icon-btn" aria-label="Emoji" onClick={() => setChatInputText(prev => prev + ' 😊')}>
                  <span>😊</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supported Brands Section */}
      <SupportedBrands />

      {/* Footer Disclaimer & Links */}
      <footer className="site-footer" id="site-footer-info">
        <div className="footer-nav-links" id="footer-links-container">
          <a href="/privacy" className="footer-nav-link" id="link-privacy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="footer-nav-link" id="link-terms">Terms of Service</a>
          <span>|</span>
          <a href="/disclaimer" className="footer-nav-link" id="link-disclaimer">Disclaimer</a>
          <span>|</span>
          <a href="/contact" className="footer-nav-link" id="link-contact">Contact Us</a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} TechSupport Pro. We are an independent technical resource providing generic configuration overviews. All product names, logos, and brands are property of their respective owners.
        </p>
      </footer>
    </div>
  );
}

export default App;
