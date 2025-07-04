export const flow = {
  start: {
    message: "👋 Hello! Welcome to **Aurafits**! I'm your fitness assistant. How can I help you today?",
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
      const userChoice = params.userInput
      switch (userChoice) {
        case "💪 Gym Membership":
          return "Great choice! Our membership plans are designed to fit every budget and lifestyle:\n\n🔥 **Basic Plan** - ₹999/month\n• Access to gym equipment\n• Locker facility\n\n💎 **Premium Plan** - ₹1,499/month\n• Everything in Basic\n• Group classes included\n• Steam room access\n\n👑 **VIP Plan** - ₹2,499/month\n• Everything in Premium\n• Personal trainer sessions\n• Nutrition consultation\n\nWould you like more details about any specific plan?"
        case "🏋️ Personal Training":
          return "Our certified personal trainers are here to help you achieve your fitness goals! 💪\n\n✨ **What we offer:**\n• One-on-one training sessions\n• Customized workout plans\n• Progress tracking\n• Injury prevention guidance\n\n⏰ **Availability:** 6 AM - 10 PM daily\n💰 **Pricing:** ₹800 per session\n📦 **Packages:** 10 sessions for ₹7,000\n\nReady to start your transformation journey?"
        case "👥 Group Classes":
          return "Join our energetic group classes and workout with like-minded fitness enthusiasts! 🎉\n\n🗓️ **Weekly Schedule:**\n• **Zumba** - Mon, Wed, Fri (7 PM)\n• **CrossFit** - Tue, Thu, Sat (6 PM)\n• **Yoga** - Daily (8 AM & 6 PM)\n• **HIIT** - Mon, Wed, Fri (6 AM)\n\n👥 **Class Size:** Max 15 people\n💰 **Cost:** Included in Premium & VIP plans\n\nWhich class interests you the most?"
        case "🥗 Nutrition Plans":
          return "Fuel your fitness journey with our personalized nutrition plans! 🌟\n\n👨‍⚕️ **Our Services:**\n• Detailed diet analysis\n• Custom meal plans\n• Weekly progress reviews\n• Supplement guidance\n\n🎯 **Specialized Plans:**\n• Weight loss\n• Muscle gain\n• Athletic performance\n• Medical conditions\n\n💰 **Consultation:** ₹1,500 (includes 1-month plan)\n\nReady to transform your eating habits?"
        case "🏢 Gym Facilities":
          return "Experience world-class facilities at Aurafits! 🏆\n\n🏋️ **Equipment Zones:**\n• Cardio section with latest machines\n• Free weights & strength training\n• Functional training area\n• Stretching & mobility zone\n\n🌟 **Premium Amenities:**\n• Steam rooms & sauna\n• Modern locker rooms\n• Protein bar & juice counter\n• Free WiFi throughout\n• Air-conditioned environment\n\nCome visit us for a free tour!"
        case "⏰ Gym Timings":
          return "We're open when you need us most! ⏰\n\n📅 **Operating Hours:**\n• **Monday - Sunday:** 5:00 AM - 11:00 PM\n• **No holidays!** We're open 365 days\n\n🌅 **Peak Hours:**\n• Morning: 6 AM - 9 AM\n• Evening: 6 PM - 9 PM\n\n💡 **Pro Tip:** Visit during off-peak hours (10 AM - 5 PM) for a less crowded experience!\n\nWhen would you like to visit?"
        case "👨‍💼 Our Trainers":
          return "Meet our amazing team of certified fitness professionals! 🌟\n\n👥 **Our Team:**\n• 12 certified trainers\n• Average 5+ years experience\n• Specialized in various disciplines\n\n🏆 **Expertise Areas:**\n• Strength & conditioning\n• Weight loss & fat burning\n• Muscle building & bodybuilding\n• Rehabilitation & injury recovery\n• Sports-specific training\n\n📚 **Certifications:** ACSM, NASM, ACE certified\n\nWould you like to meet one of our trainers?"
        case "📍 Location & Contact":
          return "Find us easily in the heart of the city! 📍\n\n🏢 **Address:**\nAurafits Fitness Center\nMG Road, Near City Center Mall\nBangalore - 560001\n\n📞 **Contact:**\n• Phone: +91 98765 43210\n• Email: info@aurafits.com\n• WhatsApp: +91 98765 43210\n\n🚗 **Parking:** Free parking available\n🚇 **Metro:** 2 mins walk from MG Road station\n\nNeed directions or want to schedule a visit?"
        default:
          return "I didn't quite understand that. Please choose from the available options."
      }
    },
    options: ["🏠 Back to Main Menu", "📞 Contact Us", "🎯 Book Free Trial", "💬 Chat with Human"],
    path: "handle_secondary_menu",
  },
  handle_secondary_menu: {
    message: (params) => {
      const userChoice = params.userInput
      switch (userChoice) {
        case "🏠 Back to Main Menu":
          return "Perfect! What else would you like to know about Aurafits?"
        case "📞 Contact Us":
          return "Great! Here are the best ways to reach us:\n\n📞 **Call:** +91 98765 43210\n📧 **Email:** info@aurafits.com\n💬 **WhatsApp:** +91 98765 43210\n\n⏰ **Best time to call:** 9 AM - 8 PM\n\nOur team will be happy to assist you!"
        case "🎯 Book Free Trial":
          return "Awesome! Ready to experience Aurafits? 🎉\n\n✨ **Free Trial Includes:**\n• Full gym access for 1 day\n• Complimentary fitness assessment\n• Nutrition consultation\n• Meet & greet with trainers\n\n📅 **To book your trial:**\n1. Call us at +91 98765 43210\n2. Visit our website\n3. Walk-in anytime!\n\nWhen would you like to visit?"
        case "💬 Chat with Human":
          return "I'll connect you with our fitness consultant right away! 👨‍💼\n\nPlease hold on while I transfer your chat...\n\n⏰ **Response time:** Usually within 2-3 minutes\n📞 **Urgent queries:** Call +91 98765 43210\n\nThank you for choosing Aurafits!"
        default:
          return "I didn't understand that. Let me help you with the main menu."
      }
    },
    options: ["🏠 Main Menu", "🔄 Start Over"],
    path: "final_options",
  },
  final_options: {
    message: (params) => {
      const userChoice = params.userInput
      if (userChoice === "🏠 Main Menu") {
        return "Welcome back! How can I assist you further?"
      } else if (userChoice === "🔄 Start Over") {
        return "Starting fresh! 🌟 Welcome to Aurafits!"
      }
      return "Thank you for chatting with Aurafits! Have a great day! 💪"
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
}