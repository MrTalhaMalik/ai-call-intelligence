# VoxIntel AI — Business Plan
### *Honest Edition. Solo Founder. One Goal: First Customer.*
**Applicant: Talha Malik | For: QSTP Incubation Program | June 2026**

---

## Who I Am and Where I Stand

I am a solo founder. I built everything in this plan by myself. I have no co-founder, no team, and no funding. What I do have is a working prototype that solves a real problem for telecom companies in Qatar.

I am applying to QSTP because I need three things I cannot get alone:
1. **Credibility** — to get in front of Ooredoo or Vodafone decision-makers
2. **Mentorship** — to avoid mistakes I don't know I'm about to make
3. **Support** — interns, workspace, and a network to help me cross the gap from prototype to first customer

This document is honest about where I am, what I can realistically do alone, and what I need QSTP's help to achieve.

---

## The Problem (Simple Version)

Telecom call centers in Qatar handle hundreds of thousands of customer calls every month. Their QA teams can only listen to and review about 2–3% of those calls. The other 97% disappear — no record of whether the customer was angry, about to cancel, or ready to buy a better plan.

This means:
- Retention teams only find out a customer is leaving *after* they call to cancel
- Agent coaching is based on the tiny sample a QA manager happened to review
- Upsell opportunities go unnoticed because nobody heard the call

**The result:** Operators lose customers they could have kept, miss revenue they could have earned, and spend money on QA teams that cover almost nothing.

---

## What I Built

I built an AI system that takes a recorded customer service call, transcribes it, and within seconds tells you:

- Is this customer about to churn? (Low / Medium / High risk + confidence score)
- Why are they at risk? (Price, network, competitor, billing, etc.)
- How did the customer feel? (Positive / Neutral / Frustrated / Angry)
- How did the agent perform? (Empathy, Clarity, Professionalism — scored 1–10)
- Was the issue actually resolved?
- Was there an opportunity to upsell something?
- What happened in this call? (3-sentence plain-English summary)

**It works. And I can show it to anyone, right now, in a browser.**

### The Full Inventory (All Built Solo)

**1. The AI Backend Pipeline**
- Faster-Whisper transcription engine (converts audio to text, runs locally)
- GPT-4o-mini LLM analysis (extracts 14 structured intelligence fields per call)
- Microsoft Presidio PII redaction (strips names and phone numbers locally before any API call — PDPL compliant)
- PostgreSQL batch pipeline (stores every result in a structured database)
- Power BI dashboard (visualizes churn risk, sentiment trends, agent scores)
- Cost: approximately QAR 0.05 per call in API fees

**2. The Live Demo Website**
A professional, fully designed marketing and demo site built from scratch:
- Hero section with a live animated dashboard mockup showing churn alerts and sentiment scores
- Interactive call simulator: select from 3 real telecom transcripts (billing dispute, cancellation request, routine inquiry), click "Run Analysis," watch the AI process the call and populate a real results dashboard
- Results include: churn risk level + confidence, sentiment score, executive call summary, objection category, resolution status, churn trigger tags, and animated agent scorecard bars
- Lead capture form with success state for inbound demo requests

**3. The Voice-to-Ticket System (Phase 2 — Already Built and Demoed)**
This is live and working as an interactive demo on the website:
- A visitor selects a voice command: *"Problem with Hala65"* or *"Cancel my contract"*
- The system classifies it and auto-generates a CRM support ticket in real time
- The ticket includes: ticket ID, issue classification, priority level (High / Critical), transcript snippet, and a recommended action summary
- This demonstrates the next phase of the product: real-time voice → CRM automation

This is not a concept or a wireframe. It is a live, interactive demonstration that any decision-maker can experience in 60 seconds without installing anything.

Everything above was built by me, alone.

---

## The Technology (What's Under the Hood)

| What it does | How |
|---|---|
| Converts audio to text | Faster-Whisper AI (runs locally, no data sent externally) |
| Analyzes the transcript | OpenAI GPT-4o-mini |
| Strips personal data before analysis | Microsoft Presidio (runs locally — names, phone numbers removed before any API call) |
| Stores results | PostgreSQL database |
| Visualizes results | Power BI / Web dashboard |

The PII redaction is already built. Customer names and phone numbers are stripped locally before anything is sent to OpenAI. This matters for Qatar's data privacy law (PDPL).

---

## The Market (Qatar First, Nothing Else Right Now)

Qatar has two telecom operators: Ooredoo and Vodafone Qatar. That is my entire target market for the next 12 months.

| Fact | Number |
|---|---|
| Qatar telecom market size | ~USD $4.3B |
| Mobile subscribers | ~2.8 million |
| Estimated calls per operator per month | 500,000–1,000,000 |
| My API cost per call | ~QAR 0.05 |
| What I would charge per call | ~QAR 0.60–0.80 |

I am not thinking about Saudi Arabia, UAE, or banking clients right now. One customer in Qatar is the only goal. Everything else is noise until that happens.

---

## What I Am Asking For (The One Goal)

> **Get one telecom operator in Qatar to pay for a pilot.**

That is the entire objective of Year 1. Not two clients. Not GCC expansion. Not a Series A. One paying pilot with Ooredoo or Vodafone Qatar.

If I achieve that, this is a real business. If I cannot achieve that, nothing else in this document matters.

---

## Why I Cannot Do This Alone (Why QSTP)

I can build the product. I proved that already.

What I cannot do alone:

**1. Get a meeting with the right person at Ooredoo or Vodafone.**
Enterprise sales in Qatar run on relationships. Cold emails to a telecom operator from an unknown individual do not work. A QSTP-backed founder with a warm introduction does. This is the single most important thing QSTP can give me.

**2. Know what legal and compliance steps I'm missing.**
Qatar's PDPL applies to voice data. I've done my research, but I need a mentor or legal advisor to tell me what I haven't thought of before I'm in front of a client.

**3. Move fast enough while working alone.**
Once a pilot is agreed, I need to set up proper infrastructure, handle the client relationship, and keep building. With QSTP interns, I can split the load. Without them, some things will be slow or missed.

---

## What I Will Do With QSTP Support

### Before QSTP (Already Done)
- ✅ Transcription pipeline (Faster-Whisper)
- ✅ LLM call analysis (GPT-4o-mini, 14 structured outputs)
- ✅ PII redaction (Microsoft Presidio — local)
- ✅ PostgreSQL batch pipeline
- ✅ Power BI dashboard
- ✅ Web demo with live simulation
- ✅ Tested on real telecom-style call data

### Phase 1 — Getting to a Pilot (Months 1–4, me + QSTP mentorship)
These are things I can realistically do alone or with minimal help:

- Add Arabic language support to the transcription pipeline (Whisper large-v3)
- Move from Power BI to a simple web dashboard I control
- Set up proper Qatar-hosted cloud storage (for PDPL compliance)
- Build a clean API endpoint so a client can plug in their existing call system
- Prepare a 30-minute demo and a one-page ROI brief for operator meetings
- **With QSTP's help:** Get introduced to a QA or CX director at Ooredoo or Vodafone

### Phase 2 — Running the Pilot (Months 4–8, me + QSTP interns if accepted)
If I get interns through QSTP:
- Intern 1: helps with data cleaning, testing, and dashboard improvements
- Intern 2: helps with Arabic transcript quality checks and documentation

What I do during the pilot:
- Process the client's real calls and deliver weekly intelligence reports
- Identify 5 genuine high-churn cases and flag them to the retention team
- Track whether the operator's retention team can act on those flags
- Collect feedback and improve the model

### Phase 3 — Convert Pilot to Contract (Months 8–12)
- Present the pilot results: how many churn cases were flagged, how many were retained, estimated revenue saved
- Negotiate a monthly contract
- If it works, go back to QSTP for the next step (fundraising, second client)

---

## Honest Financial Picture

I am not going to pretend I know exactly when money will come in. Here is what I actually know:

**My costs right now:** QAR 0 (I own a laptop. The only cost is OpenAI API credits, which are cheap at my current scale.)

**My costs during a pilot:**
| Item | Monthly Cost |
|---|---|
| OpenAI API (10,000 calls) | ~QAR 500 |
| Qatar-hosted server (basic) | ~QAR 300 |
| My time | Free (I am doing this anyway) |
| **Total** | **~QAR 800/month** |

**If a pilot is free (which it likely needs to be to get the first meeting):**
I am running at QAR 800/month in costs with QAR 0 revenue. That is survivable for a few months.

**If the pilot converts to a paid contract:**

| Scenario | Monthly Revenue |
|---|---|
| Conservative (5,000 calls/mo at QAR 0.60) | QAR 3,000 |
| Realistic (20,000 calls/mo platform fee) | QAR 15,000–25,000 |
| Optimistic (full deployment) | QAR 35,000+ |

I will not tell you I am going to hit QAR 420,000 ARR in Year 1. I don't know that. What I know is: if I get one paying customer at QAR 15,000/month, I have a business worth continuing to build.

**Break-even for me personally:** A contract worth QAR 15,000/month covers basic operational costs and lets me pay myself enough to keep going full-time.

---

## Risks — Honest Version

| Risk | How Real It Is | What I'll Do |
|---|---|---|
| I can't get a meeting with Ooredoo/Vodafone | **Very real** | This is exactly what I need QSTP for |
| The pilot is free and lasts 6 months with no conversion | **Real** | I keep my personal expenses low; I set a 3-month pilot limit in the contract |
| Arabic transcript quality is poor | **Real** | I flag low-confidence calls manually; I improve the model during the pilot |
| A client's IT security team blocks the integration | **Real** | I offer on-premise deployment; all PII is stripped locally already |
| I burn out working alone | **Real** | QSTP mentorship and interns help; I set realistic weekly goals |
| Ooredoo builds this in-house | **Less real in Year 1** | Their internal AI team has 100 other priorities; a vendor is faster for them |

---

## What I Am NOT Claiming

- I am not claiming I will expand to GCC in Year 2. Maybe. Not now.
- I am not claiming I will hire a team. QSTP interns + me is the team.
- I am not claiming QAR 1M ARR in 18 months. I am claiming one customer.
- I am not claiming I have figured out everything. I haven't.

---

## What I Am Claiming

- I built a working AI product that solves a real, expensive problem for Qatar telecom operators.
- I built it alone, which means I understand every line of it.
- The product is technically ready for a pilot today.
- The only thing between me and a first customer is a warm introduction and a working demo — both of which QSTP can help with.
- If I get one pilot, I will deliver results. The technology works.

---

## The Ask

**From QSTP I am asking for four things:**

**1. Incubation Acceptance + Workspace**
Access to QSTP facilities, co-working space, and the credibility that comes with being a QSTP-backed company. That logo on my pitch deck changes every conversation I have with an operator.

**2. Mentorship + Introduction**
One mentor with telecom or enterprise sales experience in Qatar. One warm introduction to a QA or CX decision-maker at Ooredoo or Vodafone. These two things are worth more than any amount of money at this stage.

**3. Product Development Fund (PDF) — Grant Ask: QAR 150,000**
QSTP's PDF co-funds up to 50% of product development costs. Here is exactly what I need it for:

| Development Item | Cost (QAR) | What It Unlocks |
|---|---|---|
| Arabic multilingual Whisper integration + fine-tuning | 40,000 | Arabic call support — essential for Qatar market |
| Qatar-hosted cloud infrastructure (PDPL compliance) | 35,000 | Data residency — required by enterprise clients |
| Real-time API endpoint + client dashboard | 45,000 | Makes integration easy for operator IT teams |
| Legal + PDPL compliance review | 30,000 | Removes the compliance blocker in enterprise deals |
| **Total** | **150,000** | — |

This is a co-funding ask — I contribute the product that is already built (estimated QAR 150,000+ in equivalent development value at market rates), QSTP contributes the grant.

**4. Intern Support**
Once a pilot is running, 1–2 QSTP interns to assist with data quality, testing, and client reporting. I can direct their work clearly because I built the entire system and know exactly what needs doing.

**On Equity Investment (TVF):**
After a pilot demonstrates real results, I would welcome a conversation with the Tech Venture Fund about seed investment to accelerate hiring and a second client. That conversation should happen *after* proof — not before.

---

## One-Line Summary

> *I built an AI system that reads telecom calls and tells operators which customers are about to leave. It works. I need one introduction to prove it commercially. That is all.*

---

*Talha Malik | malik.7.talha@gmail.com | github.com/MrTalhaMalik*
*June 2026 — This is the real plan.*
