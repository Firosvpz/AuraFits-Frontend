export const settings = {
  general: {
    primaryColor: "#000",
    secondaryColor: "#1f1f1f",
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
    mode: "NEVER", // or "NEVER" to hide tooltip completely
    text: "", // Tooltip text on hover
  },
  
  notification: {
    disabled: true,
    defaultToggledOn: false,
    alwaysOpen: false,
    showCount: false,
  },
  audio: {
    disabled: true,
    defaultToggledOn: false,
  },
  voice: {
    disabled: true,
  },
  footer: {
    text: "Powered by AuraFits",
  },
  chatInput: {
    placeholder: "Type your message here...", // Change input placeholder
    disabled: false,
    allowNewline: false,
  },
}