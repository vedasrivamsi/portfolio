# Sugunesh Veda Sri Vamsi — Portfolio + VamAI 🤖

> A modern, responsive personal portfolio website integrated with **VamAI** — an AI-powered chatbot that lets recruiters and visitors explore Vamsi's profile through natural conversation.

---

## 🔗 Live Demo

🌐 [vedasrivamsi.github.io/portfolio](https://vedasrivamsi.github.io/portfolio/)

---

## 📸 Preview

![Portfolio Interface](Portfolio%20Website/portfolio-interface.png)

---

## 📁 Project Structure

```
Portfolio With VamAI/
│
├── Portfolio Website/          ← Integrated portfolio (main deployment)
│   ├── index.html              ← Entry point — all sections + VamAI widget
│   ├── style.css               ← All styles (portfolio + VamAI widget)
│   ├── script.js               ← Portfolio logic (nav, animations, counters)
│   ├── knowledgeBase.js        ← VamAI knowledge engine + intent system
│   ├── vamai-widget.js         ← VamAI floating chat widget controller
│   ├── profile.jpg             ← Profile photo
│   ├── portfolio-interface.png ← Project card screenshot
│   ├── resume.pdf              ← Downloadable resume
│   ├── cert-aws.pdf            ← AWS Forage certificate
│   ├── cert-guvi.png           ← HCL GUVI certificate
│   ├── cert-nxtwave-*.pdf/png  ← NxtWave certificates
│   ├── cert-studenttribe.png   ← StudentTribe MERN certificate
│   ├── logo-guvi.png           ← GUVI logo
│   ├── logo-nxtwave.png        ← NxtWave logo
│   └── logo-studenttribe.png   ← StudentTribe logo
│
└── VamAi/                      ← Standalone VamAI chatbot app
    ├── index.html              ← Standalone chat interface
    ├── style.css               ← VamAI-specific dark/teal theme
    ├── script.js               ← Chat UI controller
    └── knowledgeBase.js        ← VamAI knowledge engine + intent system
```

---

## 🌐 Portfolio Website

### Features

| Section | Details |
|---|---|
| **Hero** | Typewriter animation, social links, availability badge |
| **About** | Bio, animated CGPA/Skills/Certs counters, resume download |
| **Skills** | Frontend, Backend, Database, Languages, Tools cards |
| **Certifications** | NxtWave, AWS Forage, HCL GUVI, StudentTribe — with certificate links |
| **Projects** | Portfolio project card with live demo + GitHub links |
| **Contact** | Email, LinkedIn, GitHub |
| **Footer** | Social links, copyright |

### Design

- 🎨 **Dark / Gold luxury theme** (`#0a0a0a` bg · `#d4af37` gold accent)
- 🌊 **Animated background blobs** with mouse parallax
- 🃏 **VanillaTilt 3D card hover effect**
- ✍️ **Typewriter animation** cycling through roles
- 🎭 **Scroll-triggered fade animations**
- 📱 **Fully responsive** — 320px to 1440px+

---

## 🤖 VamAI — Chatbot Assistant

VamAI is embedded in the portfolio as a floating chat widget. It uses a **custom rule-based intent engine** — no backend, no API, no cost.

### How It Works

```
User types a message
       ↓
Extended intents checked (Resume, Capabilities)
       ↓
Dynamic project keyword search (Java, Python, React...)
       ↓
Follow-up context check ("tell me more", "elaborate")
       ↓
Intent matched → formatted HTML response card returned
```

### Supported Intents

| Ask About | Example Questions |
|---|---|
| 👤 **Introduction** | "Who is Vamsi?", "Tell me about yourself" |
| 🎓 **Education** | "What did he study?", "Which college?" |
| 💻 **Skills** | "What are your skills?", "Tech stack?" |
| 📂 **Projects** | "What projects have you built?", "Show Java projects" |
| 🏢 **Internships** | "Tell me about your internship", "RINL experience?" |
| 🏆 **Certifications** | "What certifications do you have?" |
| 📧 **Contact** | "How can I contact you?", "LinkedIn?" |
| 📄 **Resume** | "Download resume", "CV", "Get resume" |
| 🤖 **Capabilities** | "What can you do?", "Help", "Commands" |

### Widget Features

- 🟡 **Gold pulsing bubble** — bottom-right corner
- ✨ **Welcome tooltip** — appears once per session (sessionStorage)
- 💬 **Suggested chips** — quick-tap questions
- ⌛ **Typing indicator** — 500–700ms animated dots
- 📱 **Full-screen on mobile**, panel on desktop
- ⌨️ **Keyboard accessible** — Enter to send, Escape to close
- ♿ **ARIA compliant** — screen-reader friendly

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | CSS3 (Vanilla — no frameworks) |
| Logic | JavaScript ES6+ (Vanilla — no libraries) |
| Fonts | Google Fonts — Poppins, Space Grotesk, JetBrains Mono |
| Icons | Font Awesome 6.5.1 (CDN) |
| 3D Cards | VanillaTilt.js (CDN) |
| AI Engine | Custom intent engine (knowledgeBase.js) |

> ⚡ Zero frameworks · Zero jQuery · Zero build tools · Zero backend

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/vedasrivamsi/portfolio-with-vamai.git

# Open the portfolio (no server needed)
cd "Portfolio Website"
# Double-click index.html  OR  open in browser directly
```

> ✅ Works in any modern browser — Chrome, Firefox, Edge, Safari

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|---|---|
| 1440px+ | Full two-column layout · 430px chat panel |
| 1024px | Standard layout |
| 768px | Tablet — single column · 360px chat panel |
| 480px | Mobile — full-screen chat panel |
| 375px | Small mobile — compact padding |
| 320px | Smallest — font adjustments |

---

## ♿ Accessibility

- `aria-label`, `aria-expanded`, `aria-haspopup`, `aria-live`, `role="dialog"` on all interactive elements
- Focus-visible rings on all buttons and chips
- Keyboard navigation for suggested question chips
- Escape key closes chat widget
- Screen reader-friendly message log (`role="log"` + `aria-live="polite"`)

---

## 👨‍💻 Author

**Sugunesh Veda Sri Vamsi**
B.Tech Computer Science Engineering
Andhra University College of Engineering, Visakhapatnam

| Platform | Link |
|---|---|
| 📧 Email | [vedasrivamsi127@gmail.com](mailto:vedasrivamsi127@gmail.com) |
| 💼 LinkedIn | [sugunesh-vedasrivamsi](https://www.linkedin.com/in/sugunesh-vedasrivamsi/) |
| 🐙 GitHub | [vedasrivamsi](https://github.com/vedasrivamsi) |

---

## 📄 License

© 2026 Sugunesh Veda Sri Vamsi. All rights reserved.
This project is open for viewing and reference. Please do not reproduce or redistribute without permission.
