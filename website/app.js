// VoxIntel AI Landing Page JavaScript Controller

// 1. DATA STORES: Call transcripts and matching LLM analysis results
const CALL_DATA = {
  "btn-transcript-1": {
    name: "Mark Johnson",
    meta: "Data Package Issue",
    transcript: [
      { speaker: "agent", text: "Good afternoon, thank you for calling BrightConnect Support. My name is Alex. How can I assist you today?" },
      { speaker: "customer", text: "Hi, I’ve been having issues with my mobile package. It’s not giving me the data I was promised." },
      { speaker: "agent", text: "I’m really sorry to hear that. Let me take a look into your account and see what’s going on. May I have your full name and the number linked to your account, please?" },
      { speaker: "customer", text: "Sure, it’s Mark Johnson, and the number is 555-432-8790." },
      { speaker: "agent", text: "Thank you, Mr. Johnson... Alright, I see you’re on our Premium Plus plan. Can you tell me what issue you’re experiencing specifically?" },
      { speaker: "customer", text: "Yeah, even though my billing cycle just restarted, I got a message saying I’ve already used up 20GB. There’s no way that’s right." },
      { speaker: "agent", text: "I completely understand your frustration. It looks like a data add-on from last month carried over and caused a tracking mismatch. I can reset that for you immediately, and apply a $10 account credit for the inconvenience." },
      { speaker: "customer", text: "That would be great, thank you!" },
      { speaker: "agent", text: "You’re very welcome. You’ll get a confirmation message in a few minutes. Is there anything else?" },
      { speaker: "customer", text: "No, that’s all. Thanks again!" }
    ],
    analysis: {
      riskLevel: "LOW",
      riskConfidence: "94%",
      riskColor: "var(--emerald)",
      riskEmoji: "🛡️",
      sentiment: "Positive",
      sentimentScore: "0.85",
      sentimentEmoji: "😊",
      summary: "Customer reported a mobile data tracking mismatch. The agent quickly diagnosed the issue, reset the data balance, and applied a $10 courtesy credit. The issue was resolved to the customer's satisfaction.",
      objection: "Billing Issue",
      resolution: "Resolved",
      triggers: ["Data mismatch tracking"],
      agentProf: 10,
      agentEmp: 9,
      agentClar: 9
    }
  },
  "btn-transcript-2": {
    name: "John Moore",
    meta: "Cancellation Request",
    transcript: [
      { speaker: "agent", text: "Thank you for calling Horizon Telecom, this is Alex speaking. How can I help you today?" },
      { speaker: "customer", text: "Hi, I’m calling to cancel my service. I’ve already decided to move to another provider." },
      { speaker: "agent", text: "I’m sorry to hear that you’ve decided to leave us. I’ll help you with the cancellation, but first I’d like to understand what led to this decision. What’s the main reason you’re switching?" },
      { speaker: "customer", text: "Honestly, the price keeps going up and the service isn’t as good as what I’m being offered elsewhere." },
      { speaker: "agent", text: "Thank you for being straightforward. Is it more about the higher price, the service quality, or both equally?" },
      { speaker: "customer", text: "Both, but price is the main thing." },
      { speaker: "agent", text: "I respect that. Have you already set up service with the new provider?" },
      { speaker: "customer", text: "Yes, my new service is already scheduled for installation." },
      { speaker: "agent", text: "Understood. In that case, I won’t try to change your mind, but I’d appreciate 30 seconds of honest feedback. On a scale from 1 to 5, how likely would you recommend Horizon?" },
      { speaker: "customer", text: "Probably a 1 or 2." }
    ],
    analysis: {
      riskLevel: "HIGH",
      riskConfidence: "98%",
      riskColor: "var(--rose)",
      riskEmoji: "🔥",
      sentiment: "Frustrated",
      sentimentScore: "0.20",
      sentimentEmoji: "😠",
      summary: "Customer called to schedule service cancellation. He cited recurring price increases, perceived drop in service quality, and has already set up installation with a competitor. Cancellation is scheduled.",
      objection: "Competitor Mention",
      resolution: "Not Resolved",
      triggers: ["Price Increase", "Competitor Offer", "Quality Drop"],
      agentProf: 9,
      agentEmp: 8,
      agentClar: 9
    }
  },
  "btn-transcript-3": {
    name: "John Moore (Inquiry)",
    meta: "Billing Check-in",
    transcript: [
      { speaker: "agent", text: "Thank you for calling Horizon Telecom, this is Alex speaking. How can I help you today?" },
      { speaker: "customer", text: "Hi Alex, I just have a question about my current package and my next bill." },
      { speaker: "agent", text: "Of course. May I have your name and account number, please?" },
      { speaker: "customer", text: "It’s John Moore, and my account number is 547812." },
      { speaker: "agent", text: "Thank you, Mr. Moore. I’ve pulled up your account. What would you like to know about your bill?" },
      { speaker: "customer", text: "I just want to confirm what I’m being charged for this month and make sure my discounts are still active." },
      { speaker: "agent", text: "Absolutely. I see you’re on our Standard Bundle. Your next bill is estimated at $79, which includes your package and your ongoing discount. No extra fees or changes are scheduled." },
      { speaker: "customer", text: "Okay, great, that’s what I wanted to check." },
      { speaker: "agent", text: "Is everything working well with your internet and mobile service at the moment?" },
      { speaker: "customer", text: "Yes, everything’s working fine, no issues." }
    ],
    analysis: {
      riskLevel: "LOW",
      riskConfidence: "95%",
      riskColor: "var(--emerald)",
      riskEmoji: "🛡️",
      sentiment: "Positive",
      sentimentScore: "0.90",
      sentimentEmoji: "😊",
      summary: "Customer called to verify monthly recurring charges and discount status. Agent confirmed active loyalty discounts, verified no upcoming price adjustments, and verified service quality is operating fine.",
      objection: "None",
      resolution: "Resolved",
      triggers: [],
      agentProf: 10,
      agentEmp: 10,
      agentClar: 10
    }
  }
};

let currentSelectedKey = "btn-transcript-1";

// 2. INITIALIZATION & SCROLL HANDLERS
document.addEventListener("DOMContentLoaded", () => {
  renderTranscript(currentSelectedKey);
  setupTranscriptButtons();
  setupSimulationTrigger();
  setupVoiceSimulator();
  setupContactForm();
  setupScrollHighlight();
});

// 3. TRANSCRIPT VIEWER RENDERING
function renderTranscript(key) {
  const container = document.getElementById("transcription-feed");
  if (!container) return;

  container.innerHTML = "";
  const conversation = CALL_DATA[key].transcript;

  conversation.forEach((bubble) => {
    const bubbleEl = document.createElement("div");
    bubbleEl.className = `bubble ${bubble.speaker}`;
    
    const speakerEl = document.createElement("div");
    speakerEl.className = "bubble-speaker";
    speakerEl.innerText = bubble.speaker === "agent" ? "Agent (Alex)" : `Customer (${CALL_DATA[key].name})`;
    
    const textEl = document.createElement("span");
    textEl.innerText = bubble.text;

    bubbleEl.appendChild(speakerEl);
    bubbleEl.appendChild(textEl);
    container.appendChild(bubbleEl);
  });

  // Scroll to bottom of conversation feed
  container.scrollTop = container.scrollHeight;
}

function setupTranscriptButtons() {
  const buttons = document.querySelectorAll(".transcript-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Clear active style on all buttons
      buttons.forEach(b => b.classList.remove("active"));
      
      // Set active style on current
      btn.classList.add("active");
      currentSelectedKey = btn.id;

      // Render updated bubbles
      renderTranscript(currentSelectedKey);

      // Reset dashboard to placeholder state when transcript changes
      document.getElementById("simulator-placeholder-state").style.display = "flex";
      document.getElementById("simulator-result-state").style.display = "none";
    });
  });
}

// 4. LLM ANALYSIS SIMULATION
function setupSimulationTrigger() {
  const runBtn = document.getElementById("btn-run-analysis");
  const loader = document.getElementById("simulator-loader");
  const placeholder = document.getElementById("simulator-placeholder-state");
  const results = document.getElementById("simulator-result-state");

  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    // Show spinner loader overlay
    loader.classList.add("active");

    setTimeout(() => {
      // Hide loader and placeholder
      loader.classList.remove("active");
      placeholder.style.display = "none";
      results.style.display = "flex";

      // Load correct values into result DOM
      const data = CALL_DATA[currentSelectedKey].analysis;

      // Churn risk level
      const valRiskLevel = document.getElementById("val-risk-level");
      const valRiskConf = document.getElementById("val-risk-confidence");
      const circleIndicator = document.getElementById("risk-circle-indicator");
      
      valRiskLevel.innerText = data.riskLevel;
      valRiskLevel.style.color = data.riskColor;
      valRiskConf.innerText = data.riskConfidence;
      circleIndicator.innerText = data.riskEmoji;
      circleIndicator.style.background = data.riskColor + "1a"; // 10% opacity glow
      circleIndicator.style.border = `1.5px solid ${data.riskColor}4d`; // 30% opacity border

      // Sentiment
      document.getElementById("val-sentiment-emoji").innerText = data.sentimentEmoji;
      document.getElementById("val-sentiment").innerText = data.sentiment;
      document.getElementById("val-sentiment-score").innerText = data.sentimentScore;

      // Summary
      document.getElementById("val-summary").innerText = data.summary;

      // Classifications
      document.getElementById("val-objection").innerText = data.objection;
      document.getElementById("val-resolution").innerText = data.resolution;

      // Triggers tags
      const triggersContainer = document.getElementById("val-triggers-tags");
      triggersContainer.innerHTML = "";
      if (data.triggers.length === 0) {
        triggersContainer.innerHTML = `<span class="tag">No triggers flagged</span>`;
      } else {
        data.triggers.forEach((trig) => {
          const tag = document.createElement("span");
          tag.className = "tag trigger-tag";
          tag.innerText = trig;
          triggersContainer.appendChild(tag);
        });
      }

      // Agent scorecard bars (trigger animations with custom duration/delays)
      animateBar("fill-agent-prof", "val-agent-prof", data.agentProf);
      animateBar("fill-agent-emp", "val-agent-emp", data.agentEmp);
      animateBar("fill-agent-clar", "val-agent-clar", data.agentClar);

    }, 1500); // 1.5 second simulated extraction delay
  });
}

function animateBar(barId, labelId, score) {
  const bar = document.getElementById(barId);
  const label = document.getElementById(labelId);
  if (!bar) return;

  bar.style.width = "0%";
  label.innerText = "0";

  setTimeout(() => {
    bar.style.width = `${score * 10}%`;
    
    // count up text label
    let currentVal = 0;
    const interval = setInterval(() => {
      if (currentVal >= score) {
        clearInterval(interval);
      } else {
        currentVal++;
        label.innerText = currentVal;
      }
    }, 80);
  }, 100);
}

// 5. VOICE TO TICKET ROADMAP SIMULATOR (Phase 2)
function setupVoiceSimulator() {
  const micBtn = document.getElementById("btn-voice-mic");
  const voiceStatus = document.getElementById("lbl-voice-status");
  const waveAnim = document.getElementById("voice-wave-anim");
  const ticketCard = document.getElementById("sim-ticket-card");

  const preset1 = document.getElementById("btn-preset-1");
  const preset2 = document.getElementById("btn-preset-2");

  const ticketData = {
    preset1: {
      id: "TICKET #VOX-9214",
      class: "Mobile Package Discrepancy",
      priority: "High",
      priorityClass: "priority-high",
      voiceSnippet: '"Problem with Hala 65, my billing and data are inconsistent"',
      action: "System generated billing dispute. Route to Tier-2 Billing Desk. Auto-appended summary."
    },
    preset2: {
      id: "TICKET #VOX-9215",
      class: "Retention Request / Cancellation",
      priority: "Critical",
      priorityClass: "priority-high",
      voiceSnippet: '"Cancel my contract immediately"',
      action: "Flagged account for high-priority retention pipeline. Route to Retention Specialists. Auto-appended customer cancellation risk flags."
    }
  };

  const triggerVoiceCommand = (presetKey) => {
    // Reset ticket card visibility
    ticketCard.classList.remove("visible");

    // Start wave and microphone animations
    micBtn.classList.add("listening");
    waveAnim.classList.add("active");
    voiceStatus.innerText = "Voice command captured: Transcribing...";

    // Highlight roadmap Phase 2 card on simulation
    document.getElementById("phase-2-card").classList.add("active");
    document.getElementById("phase-3-card").classList.remove("active");

    setTimeout(() => {
      voiceStatus.innerText = "AI classifying & drafting ticket in CRM...";
    }, 1200);

    setTimeout(() => {
      // Stop wave animation
      micBtn.classList.remove("listening");
      waveAnim.classList.remove("active");
      voiceStatus.innerText = "Ticket created successfully!";

      // Populate CRM ticket fields
      const data = ticketData[presetKey];
      document.getElementById("val-ticket-id").innerText = data.id;
      document.getElementById("val-ticket-class").innerText = data.class;
      document.getElementById("val-ticket-voice").innerText = data.voiceSnippet;
      document.getElementById("val-ticket-action").innerText = data.action;

      // Handle priority UI
      const prioEl = document.getElementById("val-ticket-priority");
      prioEl.className = `ticket-priority ${data.priorityClass}`;
      prioEl.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${data.priority === 'High' || data.priority === 'Critical' ? 'var(--rose)' : 'var(--amber)'};"></span> ${data.priority}`;

      // Show CRM Ticket Card
      ticketCard.classList.add("visible");
    }, 2500);
  };

  if (preset1 && preset2) {
    preset1.addEventListener("click", () => triggerVoiceCommand("preset1"));
    preset2.addEventListener("click", () => triggerVoiceCommand("preset2"));
  }

  if (micBtn) {
    micBtn.addEventListener("click", () => {
      // If mic clicked directly, run preset1 by default
      triggerVoiceCommand("preset1");
    });
  }
}

// 6. CONTACT FORM DEMO SUBMISSION
function setupContactForm() {
  const form = document.getElementById("contact-demo-form");
  const formContainer = document.getElementById("form-container");
  const successContainer = document.getElementById("success-container");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simulate contact submission
    formContainer.style.display = "none";
    successContainer.style.display = "flex";
  });
}

// 7. ACTIVE NAVIGATION SCROLL EFFECTS
function setupScrollHighlight() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}
