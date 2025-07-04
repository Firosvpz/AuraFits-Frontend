export const flow = {
  start: {
    message: "👋 Hello! Welcome to Aurafits! I'm your fitness assistant. How can I help you today?",
    options: [
      "💪 Gym Membership",
      "🏋️ Personal Training",
      "👥 Group Classes",
      "🥗 Nutrition Plans",
      "🏢 Gym Facilities",
      "⏰ Gym Timings",
      "👨‍💼 Our Trainers",
      "📍 Location & Contact",
    ],
    path: "handle_main_menu",
  },
  handle_main_menu: {
    message: (params) => {
      const userChoice = params.userInput;
      switch (userChoice) {
        case "💪 Gym Membership":
          return `Great choice! Our membership plans are designed to fit every budget and lifestyle:

🔥 Basic Plan - ₹999/month
• Access to gym equipment
• Locker facility

💎 Premium Plan - ₹1,499/month
• Everything in Basic
• Group classes included
• Steam room access

👑 VIP Plan - ₹2,499/month
• Everything in Premium
• Personal trainer sessions
• Nutrition consultation

Would you like more details about any specific plan?`;
        case "🏋️ Personal Training":
          return `Our certified personal trainers are here to help you achieve your fitness goals! 💪

What we offer:
• One-on-one training sessions
• Customized workout plans
• Progress tracking
• Injury prevention guidance

Availability: 6 AM - 10 PM daily
Pricing: ₹800 per session
Packages: 10 sessions for ₹7,000

Ready to start your transformation journey?`;
        case "👥 Group Classes":
          return `Join our energetic group classes and workout with like-minded fitness enthusiasts! 🎉

Weekly Schedule:
• Zumba - Mon, Wed, Fri (7 PM)
• CrossFit - Tue, Thu, Sat (6 PM)
• Yoga - Daily (8 AM & 6 PM)
• HIIT - Mon, Wed, Fri (6 AM)

Class Size: Max 15 people
Cost: Included in Premium & VIP plans

Which class interests you the most?`;
        case "🥗 Nutrition Plans":
          return `Fuel your fitness journey with our personalized nutrition plans! 🌟

Our Services:
• Detailed diet analysis
• Custom meal plans
• Weekly progress reviews
• Supplement guidance

Specialized Plans:
• Weight loss
• Muscle gain
• Athletic performance
• Medical conditions

Consultation: ₹1,500 (includes 1-month plan)

Ready to transform your eating habits?`;
        case "🏢 Gym Facilities":
          return `Experience world-class facilities at Aurafits! 🏆

Equipment Zones:
• Cardio section with latest machines
• Free weights & strength training
• Functional training area
• Stretching & mobility zone

Premium Amenities:
• Steam rooms & sauna
• Modern locker rooms
• Protein bar & juice counter
• Free WiFi throughout
• Air-conditioned environment

Come visit us for a free tour!`;
        case "⏰ Gym Timings":
          return `We're open when you need us most! ⏰

Operating Hours:
• Monday - Sunday: 5:00 AM - 11:00 PM
• No holidays! We're open 365 days

Peak Hours:
• Morning: 6 AM - 9 AM
• Evening: 6 PM - 9 PM

Pro Tip: Visit during off-peak hours (10 AM - 5 PM) for a less crowded experience!

When would you like to visit?`;
        case "👨‍💼 Our Trainers":
          return `Meet our amazing team of certified fitness professionals! 🌟

Our Team:
• 12 certified trainers
• Average 5+ years experience
• Specialized in various disciplines

Expertise Areas:
• Strength & conditioning
• Weight loss & fat burning
• Muscle building & bodybuilding
• Rehabilitation & injury recovery
• Sports-specific training

Certifications: ACSM, NASM, ACE certified

Would you like to meet one of our trainers?`;
        case "📍 Location & Contact":
          return `Find us easily in the heart of the city! 📍

Address:
Aurafits Fitness Center
MG Road, Near City Center Mall
Bangalore - 560001

Contact:
• Phone: +91 98765 43210
• Email: info@aurafits.com
• WhatsApp: +91 98765 43210

Parking: Free parking available
Metro: 2 mins walk from MG Road station

Need directions or want to schedule a visit?`;
        default:
          return "I didn't quite understand that. Please choose from the available options.";
      }
    },
    options: ["🏠 Back to Main Menu", "📞 Contact Us", "🎯 Book Free Trial", "💬 Chat with Human"],
    path: "handle_secondary_menu",
  },
  handle_secondary_menu: {
    message: (params) => {
      const userChoice = params.userInput;
      switch (userChoice) {
        case "🏠 Back to Main Menu":
          return "Perfect! What else would you like to know about Aurafits?";
        case "📞 Contact Us":
          return `Great! Here are the best ways to reach us:

Call: +91 98765 43210
Email: info@aurafits.com
WhatsApp: +91 98765 43210

Best time to call: 9 AM - 8 PM

Our team will be happy to assist you!`;
        case "🎯 Book Free Trial":
          return `Awesome! Ready to experience Aurafits? 🎉

Free Trial Includes:
• Full gym access for 1 day
• Complimentary fitness assessment
• Nutrition consultation
• Meet & greet with trainers

To book your trial:
1. Call us at +91 98765 43210
2. Visit our website
3. Walk-in anytime!

When would you like to visit?`;
        case "💬 Chat with Human":
          return `I'll connect you with our fitness consultant right away! 👨‍💼

Please hold on while I transfer your chat...

Response time: Usually within 2-3 minutes
Urgent queries: Call +91 98765 43210

Thank you for choosing Aurafits!`;
        default:
          return "I didn't understand that. Let me help you with the main menu.";
      }
    },
    options: ["🏠 Main Menu", "🔄 Start Over"],
    path: "final_options",
  },
  final_options: {
    message: (params) => {
      const userChoice = params.userInput;
      if (userChoice === "🏠 Main Menu") {
        return "Welcome back! How can I assist you further?";
      } else if (userChoice === "🔄 Start Over") {
        return "Starting fresh! 🌟 Welcome to Aurafits!";
      }
      return "Thank you for chatting with Aurafits! Have a great day! 💪";
    },
    options: [
      "💪 Gym Membership",
      "🏋️ Personal Training",
      "👥 Group Classes",
      "🥗 Nutrition Plans",
      "🏢 Gym Facilities",
      "⏰ Gym Timings",
      "👨‍💼 Our Trainers",
      "📍 Location & Contact",
    ],
    path: "handle_main_menu",
  },
};
