"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  quickReplies?: { label: string; icon: string; action?: string }[];
}

interface ConversationState {
  topic: string | null;
  mentionedPhone: boolean;
  askedForContact: boolean;
  serviceInterest: string[];
}

const businessInfo = {
  name: "On The Land Lawn Service",
  phone: "(941) 218-3924",
  telLink: "tel:+19412183924",
  smsLink: "sms:+19412183924",
  owner: "TJ",
  tagline: "Your Local Lawn Care Experts",
  established: "2021",
  services: [
    { name: "Lawn Mowing", icon: "🌿", desc: "Regular cutting to keep your lawn pristine" },
    { name: "Weed Eating", icon: "✂️", desc: "Edge trimming around obstacles" },
    { name: "Hedge Trimming", icon: "🌳", desc: "Shape and maintain hedges" },
    { name: "Blowing", icon: "🍃", desc: "Clean patios and walkways" },
    { name: "Weed Control", icon: "🌱", desc: "Prevention and treatment" },
    { name: "Brush Removal", icon: "🌾", desc: "Clear unwanted vegetation" },
    { name: "Land Clearing", icon: "🚜", desc: "Skid steer work for larger properties" },
    { name: "Landscape Design", icon: "🎨", desc: "Custom landscape plans" },
  ],
  areas: ["Lehigh Acres", "Fort Myers", "Cape Coral", "North Fort Myers", "Estero", "Bonita Springs"],
  hours: "Mon-Sat: 7am - 6pm",
  credentials: "Licensed & Insured",
};

const responses = {
  greeting: {
    text: `Hey there! 👋 Welcome to ${businessInfo.name}!

I'm your virtual assistant, here to help you learn about our services and connect you with ${businessInfo.owner}.

What would you like to know about today?`,
    options: [
      { label: "Services", icon: "🌿" },
      { label: "Pricing", icon: "💰" },
      { label: "Service Areas", icon: "📍" },
      { label: "Talk to TJ", icon: "📞", action: "call" },
    ],
  },
  
  services: {
    text: `Great choice! Here's what we offer:

${businessInfo.services.slice(0, 5).map(s => `${s.icon} ${s.name}`).join("\n")}

And for bigger projects:
${businessInfo.services.slice(5).map(s => `${s.icon} ${s.name}`).join("\n")}

Is there a specific service you're interested in?`,
    options: [
      { label: "Lawn Mowing", icon: "🌿" },
      { label: "Land Clearing", icon: "🚜" },
      { label: "Get Quote", icon: "💰" },
      { label: "Talk to TJ", icon: "📞", action: "call" },
    ],
  },

  lawnMowing: {
    text: `Lawn mowing is our specialty! 🌿

Here's what you get with every visit:
• Professional grass cutting
• Edge trimming along walkways
• Blow off all surfaces

Most customers opt for weekly or bi-weekly service. Ready to get started?`,
    options: [
      { label: "Get Quote", icon: "💰" },
      { label: "Call TJ", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
      { label: "Other Questions", icon: "❓" },
    ],
  },

  landClearing: {
    text: `Now we're talking! 🚜

Land clearing is where we really shine. We've got the equipment and experience to handle:

• Overgrown lots of any size
• Brush and vegetation removal
• Stump grinding
• Lot grading and preparation

Whether it's a quarter acre or several acres, we can get it done efficiently. Most residential lots clear in just 1-2 days.

Ready to discuss your project with TJ?`,
    options: [
      { label: "Call TJ", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
      { label: "Get Quote", icon: "💰" },
      { label: "Other Questions", icon: "❓" },
    ],
  },

  landscaping: {
    text: `Landscape design is one of our favorite services! 🎨

We can help you transform your yard:
• Custom design plans
• Florida-friendly plant selection
• Hardscape ideas
• Complete installation

TJ will work with you one-on-one to create a plan that matches your vision and budget.

Ready to start planning your dream yard?`,
    options: [
      { label: "Call TJ", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
      { label: "Get Quote", icon: "💰" },
      { label: "Other Questions", icon: "❓" },
    ],
  },

  pricing: {
    text: `Smart question! Here's the deal:

💰 Lawn Mowing: Starts at competitive weekly rates
💰 Land Clearing: Varies by size and scope
💰 Landscape Design: Custom quotes available

The best way to get an accurate price? Give TJ a quick call at ${businessInfo.phone}. He knows the area and can usually give you a ballpark over the phone, then a firm quote after seeing the property.

Want to call now, or have more questions first?`,
    options: [
      { label: "Call Now", icon: "📞", action: "call" },
      { label: "Text Instead", icon: "💬", action: "text" },
      { label: "More Questions", icon: "❓" },
    ],
  },

  areas: {
    text: `We're proud to serve the greater Fort Myers area! 📍

Our main service zones:
${businessInfo.areas.map(a => `• ${a}`).join("\n")}

If you're in or near one of these areas, we're ready to help! Slightly outside? Give us a call anyway - we might be able to work something out.

Which area are you located in?`,
    options: [
      { label: "I'm in Lehigh", icon: "📍" },
      { label: "I'm in Fort Myers", icon: "📍" },
      { label: "I'm in Cape Coral", icon: "📍" },
      { label: "Call TJ", icon: "📞", action: "call" },
    ],
  },

  hours: {
    text: `We're here for you! 🕐

${businessInfo.hours}

Closed Sundays so the team can rest up for the week.

Same-day requests when available - just give us a call and we'll let you know our schedule.

Ready to get started?`,
    options: [
      { label: "Schedule Service", icon: "📅" },
      { label: "Call Now", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
    ],
  },

  about: {
    text: `Here's the scoop on us! 💪

${businessInfo.name} is owned and operated by ${businessInfo.owner}.

Established in ${businessInfo.established}, we've been in the lawn care business for over 12 years combined experience.

What sets us apart:
✓ Show up when we say we will
✓ Do the job right, every time
✓ Fair, honest pricing
✓ ${businessInfo.credentials}

TJ personally answers calls and texts. You'll always talk to a real person who cares about your lawn!

Questions?`,
    options: [
      { label: "Our Services", icon: "🌿" },
      { label: "Get a Quote", icon: "💰" },
      { label: "Call TJ", icon: "📞", action: "call" },
    ],
  },

  schedule: {
    text: `Love that you're ready to get started! 🎉

Here's how it works:

1️⃣ Give us a call or text at ${businessInfo.phone}
2️⃣ Tell us about your property and needs
3️⃣ Get your free estimate
4️⃣ Schedule your first service

It's that simple - no pressure, no obligation. Just honest service at a fair price.

Would you like to call now, or text us first?`,
    options: [
      { label: "Call Now", icon: "📞", action: "call" },
      { label: "Text Instead", icon: "💬", action: "text" },
      { label: "More Questions", icon: "❓" },
    ],
  },

  contact: {
    text: `Here's how to reach us! 📞

Call or Text: ${businessInfo.phone}

TJ personally answers calls and texts - no bots, no automated systems. Just a real person ready to help you.

${businessInfo.hours}

What would you prefer?`,
    options: [
      { label: "Call Now", icon: "📞", action: "call" },
      { label: "Text Now", icon: "💬", action: "text" },
      { label: "Ask More", icon: "❓" },
    ],
  },

  interested: {
    text: (service: string) => `Awesome! ${service} is a great choice! 👍

To get you the best quote, TJ usually likes to:
• Understand the size of your project
• See any photos if available
• Answer any questions you have

Give him a quick call at ${businessInfo.phone} and he'll get you sorted out!

Anything else you'd like to know first?`,
    options: [
      { label: "Call Now", icon: "📞", action: "call" },
      { label: "Text Instead", icon: "💬", action: "text" },
      { label: "Other Questions", icon: "❓" },
    ],
  },

  thanks: {
    text: `You're welcome! 😊

That's what we're here for. TJ and the team really appreciate you reaching out.

If you think of any other questions, don't hesitate to ask. Otherwise, give us a call when you're ready to get started!

📞 ${businessInfo.phone}`,
    options: [
      { label: "Get Started", icon: "🚀" },
      { label: "Call TJ", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
    ],
  },

  goodbye: {
    text: `Thanks for chatting today! Have a great one! 👋

Remember, when you need lawn care, we're just a call or text away:

📞 ${businessInfo.phone}

TJ and the team look forward to hearing from you!`,
    options: [],
  },

  unsure: {
    text: `I want to make sure I help you correctly! 🤔

Here are some things I can help with:
• Our services and what we offer
• Pricing and free estimates
• Service areas
• Scheduling
• Questions about the company

Or if you'd rather talk to a real person right now, TJ is available!`,
    options: [
      { label: "Services", icon: "🌿" },
      { label: "Pricing", icon: "💰" },
      { label: "Call TJ", icon: "📞", action: "call" },
    ],
  },

  leadCapture: {
    text: `Before you go! 💡

Since you're interested in lawn care, here's a quick recap of how to reach us:

📞 ${businessInfo.phone}
💬 Text us anytime

TJ will get back to you quickly with answers or to schedule your service.

Anything else I can help with today?`,
    options: [
      { label: "Talk to TJ", icon: "📞", action: "call" },
      { label: "Text Us", icon: "💬", action: "text" },
      { label: "That's All", icon: "👋" },
    ],
  },
};

const topicResponses: Record<string, RegExp[]> = {
  lawnMowing: [/mow(ing)?/, /grass/, /cut/, /lawn care/, /yard/],
  landClearing: [/land/, /clearing/, /clear/, /skid/, /steer/, /lot/, /overgrown/, /brush/],
  landscaping: [/landscape/, /design/, /flowers/, /plants/, /shrub/],
  weedControl: [/weed/, /control/, /prevention/],
  hedgeTrimming: [/hedge/, /shrub/, /trim/],
};

const topicKeywords: Record<string, string[]> = {
  services: ["service", "services", "offer", "what do you", "provide", "offer"],
  pricing: ["price", "prices", "cost", "pricing", "charge", "how much", "afford", "expensive", "cheap"],
  areas: ["area", "areas", "location", "where", "serve", "near", "service area"],
  hours: ["hour", "hours", "open", "close", "available", "time", "when"],
  about: ["about", "who", "company", "experience", "years", "background", "tj", "owner"],
  schedule: ["schedule", "book", "appointment", "start", "begin", "get started", "sign up", "new customer"],
  contact: ["contact", "call", "phone", "text", "reach", "talk", "speak", "number"],
  thanks: ["thanks", "thank", "appreciate", "great", "awesome", "perfect", "cool", "nice"],
  goodbye: ["bye", "goodbye", "later", "gotta go", "talk later", "cya"],
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    topic: null,
    mentionedPhone: false,
    askedForContact: false,
    serviceInterest: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(responses.greeting.text, responses.greeting.options);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: { label: string; icon: string; action?: string }[]) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot: true,
      quickReplies: options,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userInput: string): { text: string; options: { label: string; icon: string; action?: string }[] } => {
    const lowerInput = userInput.toLowerCase().trim();
    
    // Handle quick reply options directly (don't re-trigger service topics)
    const quickReplies: Record<string, typeof responses.greeting> = {
      "services": responses.services,
      "pricing": responses.pricing,
      "service areas": responses.areas,
      "areas": responses.areas,
      "schedule service": responses.schedule,
      "get started": responses.schedule,
      "about": responses.about,
      "hours": responses.hours,
      "contact": responses.contact,
      "talk to tj": responses.contact,
      "call tj": responses.contact,
      "get quote": responses.pricing,
      "call for quote": responses.contact,
      "i'm in lehigh": responses.leadCapture,
      "i'm in fort myers": responses.leadCapture,
      "i'm in cape coral": responses.leadCapture,
      "get a quote": responses.pricing,
      "more questions": responses.unsure,
      "other questions": responses.unsure,
      "that's all": responses.goodbye,
      "lawn mowing": responses.lawnMowing,
      "land clearing": responses.landClearing,
      "landscape design": responses.landscaping,
    };
    
    if (quickReplies[lowerInput]) {
      return { text: quickReplies[lowerInput].text, options: quickReplies[lowerInput].options };
    }
    
    // Check for goodbye first
    if (topicKeywords.goodbye.some(k => lowerInput.includes(k))) {
      return { text: responses.goodbye.text, options: responses.goodbye.options };
    }
    
    // Check for thanks
    if (topicKeywords.thanks.some(k => lowerInput.includes(k))) {
      return { text: responses.thanks.text, options: responses.thanks.options };
    }
    
    // Check for specific topics (in priority order)
    
    // Areas - check before services since "service areas" could match both
    if (topicKeywords.areas.some(k => lowerInput.includes(k))) {
      setConversationState(prev => ({ ...prev, topic: "areas" }));
      return { text: responses.areas.text, options: responses.areas.options };
    }
    
    // Contact
    if (topicKeywords.contact.some(k => lowerInput.includes(k)) && lowerInput.length < 30) {
      return { text: responses.contact.text, options: responses.contact.options };
    }
    
    // Schedule
    if (topicKeywords.schedule.some(k => lowerInput.includes(k))) {
      return { text: responses.schedule.text, options: responses.schedule.options };
    }
    
    // Pricing
    if (topicKeywords.pricing.some(k => lowerInput.includes(k))) {
      return { text: responses.pricing.text, options: responses.pricing.options };
    }
    
    // Hours
    if (topicKeywords.hours.some(k => lowerInput.includes(k))) {
      return { text: responses.hours.text, options: responses.hours.options };
    }
    
    // About
    if (topicKeywords.about.some(k => lowerInput.includes(k))) {
      return { text: responses.about.text, options: responses.about.options };
    }
    
    // Services
    if (topicKeywords.services.some(k => lowerInput.includes(k))) {
      return { text: responses.services.text, options: responses.services.options };
    }
    
    // Specific topics
    for (const [topic, patterns] of Object.entries(topicResponses)) {
      if (patterns.some(p => p.test(lowerInput))) {
        setConversationState(prev => ({
          ...prev,
          topic,
          serviceInterest: [...prev.serviceInterest, topic],
        }));
        
        if (topic === "lawnMowing") return { text: responses.lawnMowing.text, options: responses.lawnMowing.options };
        if (topic === "landClearing") return { text: responses.landClearing.text, options: responses.landClearing.options };
        if (topic === "landscaping") return { text: responses.landscaping.text, options: responses.landscaping.options };
      }
    }
    
    // Greeting
    if (["hello", "hi", "hey", "help"].some(g => lowerInput === g || lowerInput.startsWith(g + " ") || lowerInput.includes(" " + g + " "))) {
      return { text: responses.greeting.text, options: responses.greeting.options };
    }
    
    // Check if user seems ready to contact (captured leads)
    if (conversationState.topic && !conversationState.mentionedPhone) {
      setConversationState(prev => ({ ...prev, mentionedPhone: true }));
      return { text: responses.leadCapture.text, options: responses.leadCapture.options };
    }
    
    // Default
    return { text: responses.unsure.text, options: responses.unsure.options };
  };

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const { text: botText, options } = getBotResponse(text);
      addBotMessage(botText, options);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  const handleQuickReply = (label: string, action?: string) => {
    if (action === "call") {
      window.location.href = businessInfo.telLink;
      return;
    }
    if (action === "text") {
      window.location.href = businessInfo.smsLink;
      return;
    }
    handleUserMessage(label);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-4 md:right-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-[340px] sm:w-[380px] max-w-[calc(100vw-32px)] max-h-[65vh] md:max-h-[70vh] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {isOpen && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">🌿</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-green-600 animate-pulse"></span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{businessInfo.name}</h3>
                  <p className="text-white/80 text-xs">Chat with {businessInfo.owner}'s team</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50 dark:bg-stone-950">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] ${msg.isBot ? 'pr-4' : 'pl-4'}`}>
                      <div className={`rounded-xl px-3 py-2 ${
                        msg.isBot 
                          ? 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-sm shadow-sm' 
                          : 'bg-green-600 text-white rounded-tr-sm shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                      </div>
                      
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.quickReplies.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(option.label, option.action)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-stone-800 hover:bg-green-100 dark:hover:bg-green-900/50 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-lg transition-colors border border-stone-200 dark:border-stone-700"
                            >
                              <span>{option.icon}</span>
                              <span>{option.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="pr-4">
                      <div className="bg-white dark:bg-stone-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></span>
                          <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></span>
                          <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* CTA */}
              <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800/50 flex-shrink-0">
                <div className="flex gap-2">
                  <a href={businessInfo.telLink} className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5">
                    <span>📞</span>
                    <span>Call</span>
                  </a>
                  <a href={businessInfo.smsLink} className="flex-1 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5">
                    <span>💬</span>
                    <span>Text</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
