import { ChatQuickReply } from "@/data/chatTypes";

interface AiResponseResult {
  text: string;
  quickReplies?: ChatQuickReply[];
}

/**
 * The contact details the assistant quotes.
 *
 * Passed in rather than written into the replies, which is what they used to
 * be: the bot handed visitors an address and a phone number that appeared
 * nowhere else on the site and matched nothing in the admin console.
 */
export interface AiContactDetails {
  contactEmail: string;
  supportEmail: string;
  contactPhone: string;
}

const FALLBACK_CONTACTS: AiContactDetails = {
  contactEmail: "contact@divanextechnologies.com",
  supportEmail: "support@divanextechnologies.com",
  contactPhone: "+91 98765 43210",
};

export function generateAiBotResponse(
  userMessage: string,
  userName: string = "there",
  contacts: AiContactDetails = FALLBACK_CONTACTS
): AiResponseResult {
  const emails = [contacts.contactEmail, contacts.supportEmail]
    .map((value) => (value || "").trim())
    .filter(Boolean);
  // One mailbox configured for both roles should read as one address, not the
  // same address written twice with a slash between it.
  const contactLine = [...new Set(emails)].join(" / ") || FALLBACK_CONTACTS.contactEmail;
  const phoneLine = (contacts.contactPhone || "").trim() || FALLBACK_CONTACTS.contactPhone;

  const cleanMsg = userMessage.toLowerCase().trim();

  // Helper to format user's first name
  const firstName = userName && userName.trim() ? userName.trim().split(" ")[0] : "ji";

  // Accurate Hindi / Hinglish Language Detection
  // Only match Devanagari or distinctive Hindi keywords that never collide with common English words
  const isDevanagari = /[\u0900-\u097F]/.test(userMessage);
  const hindiKeywordsRegex =
    /\b(kya|mujhe|chahiye|chahie|banwana|banwani|banwao|batao|bataye|batana|karna|karni|krna|krdo|krwana|karwana|kitna|kitne|paisa|paise|kharcha|rupaye|kaise|kese|haan|nahi|nahin|karo|mera|meri|mere|hamara|hamari|dijiye|dhanyawad|namaste|pranam|lagbhag|accha|theek|bhejo|dekho|baat|suniye|karein|kijiye|hoga|hogi|honge|bhai|yaar|aapko|aapke|kripya|humko|kaunsa|kitni)\b/i;

  const isHinglishOrHindi = isDevanagari || hindiKeywordsRegex.test(cleanMsg);

  // =========================================================================
  // 1. STATIC WEBSITE / LANDING PAGE / BUSINESS WEBSITE
  // =========================================================================
  if (
    cleanMsg.includes("static website") ||
    cleanMsg.includes("static site") ||
    cleanMsg.includes("landing page") ||
    cleanMsg.includes("portfolio") ||
    cleanMsg.includes("company website") ||
    cleanMsg.includes("business website") ||
    (cleanMsg.includes("website") &&
      (cleanMsg.includes("static") ||
        cleanMsg.includes("simple") ||
        cleanMsg.includes("basic") ||
        cleanMsg.includes("landing") ||
        cleanMsg.includes("chahiye") ||
        cleanMsg.includes("banwani") ||
        cleanMsg.includes("banwana")))
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `Haan bilkul ${firstName}! Hum aapke liye ekdum premium, high-speed aur responsive static website bana sakte hain. 🚀\n\nHum ise latest **Next.js & Tailwind CSS** par build karte hain jo 1 second se bhi kam (<50ms) me load hoti hai, mobile aur laptop dono par perfect dikhti hai, aur Google SEO me top rank karti hai.\n\nAapko exact budget aur timeline batane ke liye, kya aap mujhe thoda guide kar sakte hain:\n1. Website me lagbhag kitne pages honge (e.g. single 1-page landing page ya 5 se 10 pages)?\n2. Kya aapke paas content aur design ready hai, ya hamari UI/UX team pura design scratch se taiyar kare?`,
        quickReplies: [
          { id: "qr_landing", label: "📄 Single 1-Page Landing Page", payload: "Mujhe single-page landing page chahiye." },
          { id: "qr_multi", label: "🌐 5 se 10 Pages Business Website", payload: "Mujhe 5 to 10 pages ki company website chahiye." },
          { id: "qr_cost_hi", label: "💰 Kitna kharcha aur time lagega?", payload: "Static website ka kitna kharcha aur time lagega?" },
          { id: "qr_human_hi", label: "👨‍💻 Senior Engineer se baat karni hai", payload: "Mujhe senior engineer se baat karni hai." }
        ]
      };
    }

    return {
      text: `Hi ${firstName}! Yes, absolutely. We can build a lightning-fast, visually stunning static website for you. 🚀\n\nWe engineer these using **Next.js with Static Site Generation (SSG)** and Tailwind CSS. This guarantees sub-50ms global load speeds, a 95+ Google Lighthouse score, and full mobile responsiveness.\n\nTo give you an accurate timeline and estimate:\n1. Roughly how many pages do you have in mind (e.g., a single-page landing page vs a 5–10 page corporate website)?\n2. Do you have a design ready (Figma/wireframe), or would you like our design team to create the UI/UX from scratch?\n\nFeel free to share any reference links or ideas!`,
      quickReplies: [
        { id: "qr_landing", label: "📄 1-Page Landing Page", payload: "I need a 1-page high-converting landing page." },
        { id: "qr_multi", label: "🌐 5-10 Page Business Website", payload: "I need a 5 to 10 page corporate static website." },
        { id: "qr_cost_en", label: "💰 Estimated Cost & Timeline", payload: "What is the typical cost and timeline for a static website?" },
        { id: "qr_human_en", label: "👨‍💻 Connect with Solution Architect", payload: "Can I speak with a technical lead about this?" }
      ]
    };
  }

  // =========================================================================
  // 2. GREETINGS & CASUAL HELLOS
  // =========================================================================
  if (/^(hi|hello|hey|namaste|hlo|ola|good morning|good evening|good afternoon|kaise ho|kya hal)/.test(cleanMsg)) {
    if (isHinglishOrHindi) {
      return {
        text: `Namaste ${firstName}! 👋 Divanex me aapka swagat hai.\n\nMain **Vani AI** hoon, aapki technical solution consultant. Hum websites, mobile apps, healthcare HMIS, custom ERP aur AI automation software develop karte hain. Aapko kis tarah ke project ke baare me janna hai?`,
        quickReplies: [
          { id: "qr_web_hi", label: "🌐 Website / Web App", payload: "Mujhe website ya web app banwani hai." },
          { id: "qr_app_hi", label: "📱 Mobile App (Android/iOS)", payload: "Mujhe mobile app banwani hai." },
          { id: "qr_price_hi", label: "💰 Pricing & Kharcha", payload: "Aapka pricing model kya hai?" },
          { id: "qr_human_hi", label: "👨‍💻 Admin se connect karo", payload: "Mujhe admin se direct baat karni hai." }
        ]
      };
    }

    return {
      text: `Hello ${firstName}! 👋 Welcome to **Divanex Technologies**.\n\nI am **Vani AI**, your personal AI solution consultant. Whether you need a high-performance web platform, cross-platform mobile app, autonomous AI agent, or custom enterprise software, I'm here to help walk you through our approach, architecture, and pricing.\n\nWhat project are you looking to build today?`,
      quickReplies: [
        { id: "qr_web_en", label: "🌐 Website & Web Apps", payload: "I need a website or web application developed." },
        { id: "qr_mobile_en", label: "📱 Mobile App Development", payload: "I want to build a mobile application." },
        { id: "qr_ai_en", label: "🤖 AI Agents & Automation", payload: "I am interested in custom AI agents." },
        { id: "qr_human_en", label: "👨‍💻 Talk to Technical Lead", payload: "I'd like to speak with a human engineer." }
      ]
    };
  }

  // =========================================================================
  // 3. PRICING / COST / "KITNA KHARCHA"
  // =========================================================================
  if (
    cleanMsg.includes("price") ||
    cleanMsg.includes("pricing") ||
    cleanMsg.includes("cost") ||
    cleanMsg.includes("budget") ||
    cleanMsg.includes("rate") ||
    cleanMsg.includes("charges") ||
    cleanMsg.includes("kitna") ||
    cleanMsg.includes("paisa") ||
    cleanMsg.includes("paise") ||
    cleanMsg.includes("kharcha") ||
    cleanMsg.includes("fees") ||
    cleanMsg.includes("rupaye")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `Hamara pricing model transparent aur milestone-based hota hai, ${firstName}:\n\n• **MVP / Fast-Track Projects**: Starting from $3,500 (~₹2.8 Lakhs) – Jisme 3-4 hafte me complete working product ready ho jata hai.\n• **Custom Enterprise Systems**: ERP, Hospital HMIS, FinTech ya AI platform project ke scope aur modules ke hisab se customize hota hai (zero recurring per-seat fees).\n• **Dedicated Team**: Monthly basis par Senior Developers aur UI/UX designers ki team.\n\nKya aapko apne project ke liye tailored proposal aur exact quote chahiye?`,
        quickReplies: [
          { id: "qr_prop_hi", label: "📝 Custom Proposal Mangwayein", payload: "Mujhe mere project ka exact proposal chahiye." },
          { id: "qr_human_hi", label: "👨‍💻 Budget Admin se discuss karein", payload: "Mujhe budget direct admin se discuss karna hai." }
        ]
      };
    }

    return {
      text: `Here is a clear breakdown of our pricing and engagement models, ${firstName}:\n\n• **MVP Sprints**: Starting from $3,500 (~₹2.8L) – Fast-track 3-4 week functional release for startups & modern businesses.\n• **Enterprise Custom Builds**: Scoped on milestones (ERPs, HMIS, Fintech, Custom AI) with zero per-seat software lock-in.\n• **Dedicated Engineering Pods**: Monthly dedicated pods (Tech Lead, Senior Engineers, UI/UX, QA).\n\nWould you like a custom proposal tailored to your exact requirements?`,
      quickReplies: [
        { id: "qr_prop_en", label: "📝 Request Custom Proposal", payload: "I want to request a customized project proposal." },
        { id: "qr_human_en", label: "👨‍💻 Discuss Budget with Admin", payload: "I would like to discuss budget directly with admin." }
      ]
    };
  }

  // =========================================================================
  // 4. MOBILE APPS (ANDROID / IOS / FLUTTER / REACT NATIVE)
  // =========================================================================
  if (
    cleanMsg.includes("app") ||
    cleanMsg.includes("mobile") ||
    cleanMsg.includes("ios") ||
    cleanMsg.includes("android") ||
    cleanMsg.includes("flutter") ||
    cleanMsg.includes("react native")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `Zaroor ${firstName}! Hum **React Native aur Flutter** par high-performance mobile apps build karte hain jo ek hi clean code se Android aur iOS (Apple) dono par smooth 60fps chalti hain.\n\nAapko kis type ka mobile app banana hai (jaise e-commerce, delivery, booking, fintech, ya custom business app)?\n\nAapke paas koi reference app ya feature list hai to yahan share kar sakte hain!`,
        quickReplies: [
          { id: "qr_app_cost_hi", label: "💰 Mobile App ka Kharcha", payload: "Mobile app banane me kitna kharcha aayega?" },
          { id: "qr_app_time_hi", label: "⏱️ Kitne time me ready hoga?", payload: "App banne me kitna time lagta hai?" },
          { id: "qr_human_hi", label: "👨‍💻 Mobile Tech Lead se connect karein", payload: "Mujhe mobile developer se baat karni hai." }
        ]
      };
    }

    return {
      text: `We'd love to help you build your mobile app, ${firstName}! 📱\n\nWe develop cross-platform mobile apps using **React Native and Flutter**, allowing you to launch on both the iOS App Store and Android Google Play with 60fps native performance from a single codebase.\n\nWhat core functionality will the app have (e.g., booking, social, delivery, e-commerce, or fintech)? If you have a brief or reference app, feel free to drop it here!`,
      quickReplies: [
        { id: "qr_app_quote_en", label: "💡 Mobile App Cost Estimate", payload: "What is the typical cost for an iOS and Android mobile app?" },
        { id: "qr_app_time_en", label: "⏱️ App Development Timeline", payload: "How long does it take to develop and launch a mobile app?" },
        { id: "qr_human_en", label: "👨‍💻 Talk to Mobile Tech Lead", payload: "Connect me with your mobile lead engineer." }
      ]
    };
  }

  // =========================================================================
  // 5. E-COMMERCE / ONLINE STORE / SHOPPING
  // =========================================================================
  if (
    cleanMsg.includes("ecommerce") ||
    cleanMsg.includes("e-commerce") ||
    cleanMsg.includes("online store") ||
    cleanMsg.includes("shopping") ||
    cleanMsg.includes("marketplace") ||
    cleanMsg.includes("shop") ||
    cleanMsg.includes("dukan") ||
    cleanMsg.includes("store")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `E-commerce me hamari bohot strong expertise hai, ${firstName}! 🛍️\n\nHum custom online stores develop karte hain jisme fast checkout, instant UPI / Card / NetBanking payments (Razorpay/Stripe), automated inventory sync, aur powerful Admin Panel hota hai.\n\nAapko kis tarah ka store chahiye:\n1. Ek single brand ka D2C online store?\n2. Ya multi-vendor marketplace jisme multiple sellers apne products bech sakein?`,
        quickReplies: [
          { id: "qr_d2c_hi", label: "🛒 Single Brand D2C Store", payload: "Mujhe single brand online store chahiye." },
          { id: "qr_multi_hi", label: "🏬 Multi-Vendor Marketplace", payload: "Mujhe multi-vendor marketplace platform banana hai." },
          { id: "qr_cost_hi", label: "💰 E-Commerce ka Cost", payload: "E-commerce website ka kitna cost hoga?" }
        ]
      };
    }

    return {
      text: `E-commerce is one of our flagship capabilities, ${firstName}! 🛍️\n\nWe build custom, high-converting e-commerce platforms with sub-50ms product searches, seamless checkout flows, automated inventory syncing, and multi-rail payment gateways (Stripe, Razorpay, UPI, PayPal).\n\nCould you share a bit more:\n• How many products/SKUs are you planning to launch with?\n• Do you need a single-brand D2C store or a multi-vendor marketplace with vendor commissions?`,
      quickReplies: [
        { id: "qr_d2c_en", label: "🛒 Single Brand D2C Store", payload: "I need a single-brand D2C e-commerce store." },
        { id: "qr_multi_en", label: "🏬 Multi-Vendor Marketplace", payload: "I want to build a multi-vendor marketplace platform." },
        { id: "qr_ecom_quote_en", label: "💰 Get E-Commerce Estimate", payload: "What is the cost to build a custom e-commerce platform?" }
      ]
    };
  }

  // =========================================================================
  // 6. HEALTHCARE HMIS / HOSPITAL / CLINIC
  // =========================================================================
  if (
    cleanMsg.includes("hospital") ||
    cleanMsg.includes("healthcare") ||
    cleanMsg.includes("hmis") ||
    cleanMsg.includes("ehr") ||
    cleanMsg.includes("doctor") ||
    cleanMsg.includes("clinic") ||
    cleanMsg.includes("medical")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `🏥 Healthcare aur Hospital Management Systems me hum 100% HIPAA aur ABDM compliant software provide karte hain, ${firstName}.\n\nIsme OPD/IPD management, Doctor appointment scheduling, Lab diagnostics PACS/DICOM integration, Pharmacy billing aur Patient mobile apps shamil hain.\n\nAapko clinic ke liye chahiye ya multi-specialty hospital ke liye?`,
        quickReplies: [
          { id: "qr_hmis_demo_hi", label: "🖥️ Live HMIS Demo Dekhein", payload: "Mujhe hospital management system ka live demo dekhna hai." },
          { id: "qr_hmis_cost_hi", label: "📊 Healthcare Project Estimate", payload: "Hospital HMIS software ka kitna kharcha aayega?" },
          { id: "qr_human_hi", label: "👨‍💻 HealthTech Lead se connect karein", payload: "Mujhe healthcare software lead se baat karni hai." }
        ]
      };
    }

    return {
      text: `🏥 We engineer enterprise-grade healthcare ecosystems, ${firstName}!\n\nOur Hospital & Healthcare Management suite is custom-tailored for clinics and hospital networks with OPD/IPD flows, OT/ICU bed occupancy HUD, Doctor appointments, DICOM/PACS lab diagnostics, and 100% HIPAA & ABDM compliance.\n\nAre you looking to build software for a multi-specialty hospital, diagnostic chain, or a telehealth startup?`,
      quickReplies: [
        { id: "qr_hmis_demo_en", label: "🖥️ Request Live HMIS Demo", payload: "I would like to see a live HMIS demo." },
        { id: "qr_hmis_cost_en", label: "📊 Healthcare Project Estimate", payload: "What is the estimated budget for a hospital management system?" },
        { id: "qr_human_en", label: "👨‍💻 Connect with HealthTech Architect", payload: "Connect me with a senior HealthTech engineer." }
      ]
    };
  }

  // =========================================================================
  // 7. ERP & CUSTOM BUSINESS SOFTWARE / INVENTORY
  // =========================================================================
  if (
    cleanMsg.includes("erp") ||
    cleanMsg.includes("supply chain") ||
    cleanMsg.includes("inventory") ||
    cleanMsg.includes("warehouse") ||
    cleanMsg.includes("manufacturing") ||
    cleanMsg.includes("hrms") ||
    cleanMsg.includes("billing software")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `🏭 Hum custom ERP software build karte hain jisme koi per-user monthly license fee nahi hoti, ${firstName}.\n\nIsme Multi-warehouse stock tracking, GST/VAT billing, Manufacturing MRP-II, aur Biometric attendance HRMS modules milte hain.\n\nAapka business kis industry ka hai (Manufacturing, Retail, ya Distribution)?`,
        quickReplies: [
          { id: "qr_erp_cost_hi", label: "📊 Custom ERP ka Cost", payload: "Custom ERP software banane ka kitna kharcha aayega?" },
          { id: "qr_erp_call_hi", label: "📅 Discovery Call Schedule Karein", payload: "Mujhe ERP discovery call schedule karni hai." }
        ]
      };
    }

    return {
      text: `🏭 We build bespoke modular ERP systems designed to eliminate recurring per-seat SaaS license fees, ${firstName}.\n\nOur architectures handle multi-warehouse barcode/RFID tracking, automated double-entry accounting (GST/VAT), MRP-II manufacturing workflows, and biometric HRMS payroll with sub-second speeds.\n\nWhat industry is your ERP project for (e.g. Manufacturing, Retail Distribution, or Logistics)?`,
      quickReplies: [
        { id: "qr_erp_cost_en", label: "📊 Custom ERP Cost & Scope", payload: "What is the pricing structure for a custom ERP?" },
        { id: "qr_book_call_en", label: "📅 Book Architecture Discovery", payload: "I want to schedule an ERP discovery call." }
      ]
    };
  }

  // =========================================================================
  // 8. AI AGENTS & AUTOMATION / CHATBOTS
  // =========================================================================
  if (
    cleanMsg.includes("ai") ||
    cleanMsg.includes("agent") ||
    cleanMsg.includes("rag") ||
    cleanMsg.includes("langgraph") ||
    cleanMsg.includes("llm") ||
    cleanMsg.includes("machine learning") ||
    cleanMsg.includes("gpt") ||
    cleanMsg.includes("bot")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `🤖 AI Agents aur Automation me hum autonomous multi-actor workflows aur private enterprise RAG systems build karte hain, ${firstName}!\n\nYe AI agents aapke private databases aur APIs se connect ho kar customer support, sales leads qualification, document analysis, aur automated reporting jaise kaam bina galti ke execute karte hain.\n\nAap apni company me kaunsa workflow AI se automate karna chahte hain?`,
        quickReplies: [
          { id: "qr_ai_agent_hi", label: "🚀 Custom Autonomous AI Agent", payload: "Mujhe internal company operations ke liye AI agent banana hai." },
          { id: "qr_ai_rag_hi", label: "📚 Private Company Data RAG", payload: "Private company documents par AI kaise train hota hai?" },
          { id: "qr_call_hi", label: "📅 AI Workshop Schedule Karein", payload: "Mujhe AI consultation call book karni hai." }
        ]
      };
    }

    return {
      text: `🤖 We engineer autonomous AI agents and private enterprise RAG systems, ${firstName}!\n\nInstead of simple wrappers, we build multi-actor agent workflows (using LangGraph, CrewAI, and vLLM) that can reason, query private databases, execute API tools, and automate real operational tasks with strict anti-hallucination guardrails.\n\nWhat specific business process or workflow are you aiming to automate with AI?`,
      quickReplies: [
        { id: "qr_ai_agent_en", label: "🚀 Custom Autonomous AI Agent", payload: "I want to build an autonomous agent for internal operations." },
        { id: "qr_ai_rag_en", label: "📚 Private Enterprise RAG", payload: "How does private company document RAG work?" },
        { id: "qr_call_en", label: "📅 Schedule AI Workshop", payload: "I want to schedule an AI technical consultation." }
      ]
    };
  }

  // =========================================================================
  // 9. HUMAN ADMIN / CALL WITH TEAM
  // =========================================================================
  if (
    cleanMsg.includes("human") ||
    cleanMsg.includes("admin") ||
    cleanMsg.includes("person") ||
    cleanMsg.includes("call") ||
    cleanMsg.includes("talk") ||
    cleanMsg.includes("founder") ||
    cleanMsg.includes("contact") ||
    cleanMsg.includes("phone") ||
    cleanMsg.includes("baat") ||
    cleanMsg.includes("connect")
  ) {
    if (isHinglishOrHindi) {
      return {
        text: `Maine abhi hamare **Senior Engineering Leads & Admin Dashboard** ko notify kar diya hai, ${firstName}! 👨‍💻\n\nAdmin kisi bhi samay is live chat ko join kar sakte hain. Iske alawa aap direct humse yahan bhi contact kar sakte hain:\n• 📧 **Email**: ${contactLine}\n• 📞 **Direct Phone**: ${phoneLine}\n• 📅 **Direct Meeting**: [Google Meet / Zoom Call Schedule Karein](/contact)\n\nAap apne project ke baare me thoda detail niche likh dijiye taaki jab engineer join karein to unko pura idea ho!`,
        quickReplies: [
          { id: "qr_brief_hi", label: "📝 Project Scope Share Karein", payload: "Mera project requirements ye hai..." },
          { id: "qr_meet_hi", label: "📅 Google Meet Call Book Karein", payload: "Mujhe Google Meet discovery call book karni hai." }
        ]
      };
    }

    return {
      text: `Understood, ${firstName}! I have notified our **Senior Engineering Leads & Admin Dashboard** right now. 👨‍💻\n\nAn admin or lead engineer can join this conversation live at any moment! In the meantime, you can also reach us via:\n• 📧 **Email**: ${contactLine}\n• 📞 **Hotline**: ${phoneLine}\n• 📅 **Direct Schedule**: [Book a 30-min Technical Discovery Call](/contact)\n\nPlease feel free to write down any specific technical questions or project brief below so our lead has full context when jumping in!`,
      quickReplies: [
        { id: "qr_brief_en", label: "📝 Share My Project Scope", payload: "Here are my project requirements..." },
        { id: "qr_meeting_en", label: "📅 Book Google Meet / Zoom", payload: "I want to schedule a Google Meet consultation call." }
      ]
    };
  }

  // =========================================================================
  // 10. GENERAL / FALLBACK CONSULTATIVE REPLY
  // =========================================================================
  if (isHinglishOrHindi) {
    return {
      text: `Bilkul ${firstName}! 👍\n\nHum Divanex me **Full-Cycle Custom Software Development** karte hain—chahe fast static website ho, mobile app, multi-tenant SaaS platform ho, ya custom AI automation.\n\nAap apne project ke baare me thoda aur bata sakte hain (jaise kitne pages/features chahiye, timeline kya hai, ya koi reference link)? Main turant aapko roadmap aur estimate guide kar doonga!`,
      quickReplies: [
        { id: "qr_quote_hi", label: "📋 Estimated Roadmap & Quote", payload: "Mujhe estimated roadmap aur quote chahiye." },
        { id: "qr_call_hi", label: "📅 Discovery Call Schedule Karein", payload: "Mujhe discovery call schedule karni hai." },
        { id: "qr_admin_hi", label: "👨‍💻 Senior Engineer se baat karein", payload: "Mujhe senior engineer se connect karo." }
      ]
    };
  }

  return {
    text: `Got it, ${firstName}! 👍\n\nAt Divanex, we specialize in **full-cycle product engineering**—building everything from blazing fast static web apps to complex SaaS platforms, mobile apps, and custom AI systems.\n\nCould you tell me a little more about what you have in mind (e.g. target timeline, key features, or any reference websites)? I can walk you through the exact technical roadmap and ballpark budget!`,
    quickReplies: [
      { id: "qr_quote_en", label: "📋 Get Estimated Roadmap & Cost", payload: "I want an estimated roadmap and quote for my project." },
      { id: "qr_call_en", label: "📅 Schedule Discovery Call", payload: "I want to schedule a quick 20-minute discovery call." },
      { id: "qr_admin_en", label: "👨‍💻 Connect with Lead Engineer", payload: "Please connect me to an active technical lead." }
    ]
  };
}
