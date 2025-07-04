export const settings = {
   general: {
   primaryColor: "#000000",
    secondaryColor: "#facc15",
    fontFamily: "Poppins, sans-serif",
    showFooter: true,
    embedded: false,
  },
  chatHistory: {
    storageKey: "aurafits_chat_history",
  },
  header: {
    title: "AuraFits",
    showAvatar: true,
    avatar: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
  },
  tooltip: {
    mode: "NEVER",
    // mode: "CLOSE", 
    text: "💬 chat",
  },
  chatButton: {
    icon: "/public/assets/whatsapp.png", // WhatsApp icon
  },
  notification: {
    disabled: true,
  },
  audio: {
    disabled: true,
  },
  voice: {
    disabled: true,
  },
  footer: {
    text: "Powered by AuraFits",
  },
  chatInput: {
    placeholder: "Type your message here...",
    disabled: false,
    allowNewline: false,
  },
}