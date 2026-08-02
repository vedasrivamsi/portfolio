/**
 * VamAI — Floating Chat Widget Controller v1.1
 * UI/UX Polish Release
 * — Welcome tooltip with sessionStorage (shows once per session)
 * — 500–700ms randomised typing delay
 * — Resume download intent
 * — "What can you do?" capabilities intent
 * — Smooth auto-scroll (never jumps)
 * — Auto-resize textarea
 * — Escape key to close
 * — Full keyboard navigation for chips
 * — Zero changes to knowledgeBase.js
 */

(function () {
  'use strict';

  /* ── Element References ─────────────────────────────────── */
  const bubble      = document.getElementById('vamAiBubble');
  const widget      = document.getElementById('vamAiWidget');
  const closeBtn    = document.getElementById('vamAiClose');
  const chatArea    = document.getElementById('vamAiChatArea');
  const inputField  = document.getElementById('vamAiInput');
  const sendBtn     = document.getElementById('vamAiSendBtn');
  const inputForm   = document.getElementById('vamAiForm');
  const suggestions = document.getElementById('vamAiSuggestions');
  const tooltip     = document.getElementById('vamAiTooltip');

  /* ── State ──────────────────────────────────────────────── */
  let isOpen            = false;
  let isBotTyping       = false;
  let suggestionsShown  = true;

  /* ──────────────────────────────────────────────────────────
     1. WELCOME TOOLTIP  (shows once per browser session)
  ──────────────────────────────────────────────────────────── */
  if (tooltip && !sessionStorage.getItem('vamAiTooltipSeen')) {
    sessionStorage.setItem('vamAiTooltipSeen', '1');

    // Fade in after 1.8s, fade out after 5s visible
    setTimeout(() => {
      tooltip.classList.add('vamai-tooltip--visible');
      setTimeout(() => {
        tooltip.classList.remove('vamai-tooltip--visible');
      }, 5000);
    }, 1800);
  }

  /* ──────────────────────────────────────────────────────────
     2. OPEN / CLOSE WIDGET
  ──────────────────────────────────────────────────────────── */
  function openWidget() {
    isOpen = true;
    widget.classList.add('vamai-open');
    bubble.classList.add('vamai-bubble--active');
    bubble.setAttribute('aria-expanded', 'true');
    // Hide tooltip immediately on open
    if (tooltip) tooltip.classList.remove('vamai-tooltip--visible');
    // Focus input after transition ends
    setTimeout(() => inputField.focus(), 380);
  }

  function closeWidget() {
    isOpen = false;
    widget.classList.remove('vamai-open');
    bubble.classList.remove('vamai-bubble--active');
    bubble.setAttribute('aria-expanded', 'false');
    bubble.focus();
  }

  bubble.addEventListener('click', () => isOpen ? closeWidget() : openWidget());
  closeBtn.addEventListener('click', closeWidget);

  // Escape key closes the widget
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeWidget();
  });

  /* ──────────────────────────────────────────────────────────
     3. SMOOTH AUTO-SCROLL  (never jumps)
  ──────────────────────────────────────────────────────────── */
  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
    });
  }

  /* ──────────────────────────────────────────────────────────
     4. AUTO-RESIZE TEXTAREA
  ──────────────────────────────────────────────────────────── */
  function autoResize() {
    inputField.style.height = 'auto';
    inputField.style.height = Math.min(inputField.scrollHeight, 80) + 'px';
  }

  /* ──────────────────────────────────────────────────────────
     5. SESSION STORAGE PERSISTENCE ENGINE
  ──────────────────────────────────────────────────────────── */
  let chatHistory = [];

  function loadSavedHistory() {
    try {
      const saved = sessionStorage.getItem('vamAiChatHistory');
      if (saved) {
        chatHistory = JSON.parse(saved);
        if (Array.isArray(chatHistory) && chatHistory.length > 0) {
          // Hide suggestion chips if user already engaged in chat
          hideSuggestions();
          chatHistory.forEach(msg => {
            appendMessage(msg.html, msg.role, false);
          });
        }
      }
    } catch (e) {
      console.warn('VamAI: Error loading chat history from sessionStorage', e);
    }
  }

  function saveMessageToHistory(html, role) {
    chatHistory.push({ role, html });
    try {
      sessionStorage.setItem('vamAiChatHistory', JSON.stringify(chatHistory));
    } catch (e) {
      console.warn('VamAI: Error saving chat message to sessionStorage', e);
    }
  }

  /* ──────────────────────────────────────────────────────────
     6. MESSAGE RENDERING
  ──────────────────────────────────────────────────────────── */
  function appendMessage(html, role, save = true) {
    const wrapper = document.createElement('div');
    wrapper.className = `vamai-msg vamai-msg--${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'vamai-msg__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = role === 'bot' ? '🤖' : '👤';

    const bubble_el = document.createElement('div');
    bubble_el.className = 'vamai-msg__bubble';
    bubble_el.innerHTML = html;

    if (role === 'bot') {
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble_el);
    } else {
      wrapper.appendChild(bubble_el);
      wrapper.appendChild(avatar);
    }

    chatArea.appendChild(wrapper);
    scrollToBottom();

    if (save) {
      saveMessageToHistory(html, role);
    }

    return wrapper;
  }

  /* ──────────────────────────────────────────────────────────
     7. HIDE SUGGESTED CHIPS (after first interaction)
  ──────────────────────────────────────────────────────────── */
  function hideSuggestions() {
    if (suggestionsShown) {
      suggestionsShown = false;
      suggestions.classList.add('vamai-suggestions--hidden');
    }
  }

  /* ──────────────────────────────────────────────────────────
     7. EXTENDED INTENTS  (pre-processes before knowledgeBase)
        — Resume download
        — What can you do / Help / Capabilities
  ──────────────────────────────────────────────────────────── */
  function getExtendedResponse(text) {
    const input = text.toLowerCase().trim();

    /* Resume */
    const resumeKw = ['resume', 'cv', 'curriculum vitae', 'download resume',
                      'get your resume', 'can i get your resume', 'get resume'];
    if (resumeKw.some(k => input.includes(k))) {
      return `<div class="response-card">
  <h3>📄 Resume</h3>
  <p>Click the button below to download Vamsi's latest resume.</p>
  <a href="resume.pdf"
     download="Sugunesh_Veda_Sri_Vamsi_Resume.pdf"
     class="vamai-resume-btn"
     target="_blank"
     rel="noopener">
    ⬇ Download Resume
  </a>
</div>`;
    }

    /* Capabilities / Help */
    const helpKw = ['what can you do', 'help', 'capabilities', 'commands',
                    'how can you help', 'what do you know', 'what can i ask',
                    'what can you tell', 'guide me', 'options'];
    if (helpKw.some(k => input.includes(k))) {
      return `<div class="response-card">
  <h3>🤖 What I Can Help With</h3>
  <p>Here's what you can ask me about Vamsi:</p>
  <ul class="vamai-capabilities">
    <li>👤 <strong>About Me</strong> &nbsp;— <em>"Who is Vamsi?"</em></li>
    <li>💻 <strong>Skills</strong> &nbsp;— <em>"What are your skills?"</em></li>
    <li>📂 <strong>Projects</strong> &nbsp;— <em>"What projects have you built?"</em></li>
    <li>🏢 <strong>Internships</strong> &nbsp;— <em>"Tell me about your internship"</em></li>
    <li>🏆 <strong>Certifications</strong> &nbsp;— <em>"What certifications do you have?"</em></li>
    <li>📧 <strong>Contact</strong> &nbsp;— <em>"How can I contact you?"</em></li>
    <li>📄 <strong>Resume</strong> &nbsp;— <em>"Download resume"</em></li>
  </ul>
</div>`;
    }

    return null; // fall through to knowledgeBase getBotResponse
  }

  /* ──────────────────────────────────────────────────────────
     8b. GEMINI API HYBRID FALLBACK ENGINE
  ──────────────────────────────────────────────────────────── */
  const GEMINI_MODEL = 'gemini-1.5-flash';

  async function queryGeminiApi(userQuery) {
    const apiKey = window.VAMAI_GEMINI_KEY || localStorage.getItem('vamai_gemini_key');
    if (!apiKey) return null; // No API key configured, fallback to local KB

    const systemPrompt = `You are VamAI, the personal AI Assistant for Sugunesh Veda Sri Vamsi.
Profile Context:
- Full Name: Sugunesh Veda Sri Vamsi (Vamsi)
- Education: Final year B.Tech in Computer Science & Engineering at Andhra University College of Engineering (AUCE), Visakhapatnam (CGPA: 7.43, Graduating: 2027). Intermediate MPC at Sri Viswa Junior College (78.7%). Class 10 CBSE at Sri Krishhna Vidya Mandir (72.8%).
- Experience: 
  1. AI for Generation & Automation Intern at Brainovision Solutions (2 Months, Jun-Jul 2026, Hybrid Hyderabad): Developed AI Interview Simulator with local KB + Gemini API.
  2. Java Developer Intern at InternPe (1 Month, Jul 2025, Remote): Core Java, Tic Tac Toe, Rock Paper Scissors.
  3. Full Stack Web Development Intern at RINL Vizag Steel (1 Month, Jun 2025, Offline): Built Employee Shift & Attendance Manager (ESAM) with Spring Boot, Oracle DB, REST APIs.
- Certifications: CISCO Data Analytics Essentials, AWS Solutions Architecture (Forage), HCL GUVI HTML & CSS, NxtWave CCBP.
- Skills: C, Python, JavaScript, HTML5, CSS3, Bootstrap, MySQL, SQLite, Oracle DB, Git, GitHub, VS Code, Tableau, PowerBI, Excel.
- Languages: English (Full Professional), Telugu (Native), Hindi (Conversational), Tamil (Basic).
- Contact: Email vedasrivamsi127@gmail.com, LinkedIn: sugunesh-vedasrivamsi, GitHub: vedasrivamsi.

Instructions: Answer the user's question concisely, politely, and professionally as Vamsi's AI assistant. Use simple HTML tags (like <strong>, <p>, <ul>, <li>) for clean formatting. Keep answers under 120 words.`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${userQuery}` }]
            }
          ]
        })
      });

      if (!response.ok) return null;
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const formatted = rawText
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n\n/g, '<br><br>')
          .replace(/\n/g, '<br>');
        return `<div class="response-card">
  <h3>✨ VamAI (Gemini Powered)</h3>
  <p>${formatted}</p>
</div>`;
      }
    } catch (err) {
      console.warn('Gemini API query failed, falling back to local KB:', err);
    }
    return null;
  }

  /* ──────────────────────────────────────────────────────────
     8. SEND HANDLER (Hybrid Local KB + Gemini API)
  ──────────────────────────────────────────────────────────── */
  async function handleSend(message) {
    const text = message.trim();
    if (!text || isBotTyping) return;

    hideSuggestions();
    appendMessage(text, 'user');

    // Reset input
    inputField.value = '';
    inputField.style.height = 'auto';
    sendBtn.disabled = true;

    // Typing indicator
    isBotTyping = true;
    const typingEl = appendMessage(
      '<span class="vamai-typing-dot" aria-hidden="true"></span>' +
      '<span class="vamai-typing-dot" aria-hidden="true"></span>' +
      '<span class="vamai-typing-dot" aria-hidden="true"></span>',
      'bot',
      false
    );
    typingEl.classList.add('vamai-typing');
    typingEl.setAttribute('aria-label', 'VamAI is typing');

    // 1. Check extended intents (resume, help)
    let response = getExtendedResponse(text);

    // 2. Check local knowledge base intent match
    if (!response) {
      const localResp = getBotResponse(text);
      const isGenericFallback = localResp.includes("I'm VamAI, Sugunesh Veda Sri Vamsi's personal portfolio assistant") ||
                                localResp.includes("Try asking about");

      if (!isGenericFallback) {
        response = localResp;
      } else {
        // 3. Try Gemini API query for fallback questions
        const geminiResp = await queryGeminiApi(text);
        response = geminiResp || localResp; // Gemini or local fallback
      }
    }

    // Natural typing delay
    await new Promise((resolve) => setTimeout(resolve, 450));

    typingEl.remove();
    appendMessage(response, 'bot');

    isBotTyping = false;
    sendBtn.disabled = inputField.value.trim().length === 0;
  }

  function sendMessage() {
    const msg = inputField.value;
    if (!msg.trim() || isBotTyping) return;
    handleSend(msg);
  }

  /* ──────────────────────────────────────────────────────────
     9. INPUT EVENTS
  ──────────────────────────────────────────────────────────── */
  inputField.addEventListener('input', () => {
    sendBtn.disabled = inputField.value.trim().length === 0 || isBotTyping;
    autoResize();
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  /* ──────────────────────────────────────────────────────────
     10. SUGGESTED CHIPS — click & keyboard
  ──────────────────────────────────────────────────────────── */
  suggestions.addEventListener('click', (e) => {
    const chip = e.target.closest('.vamai-chip');
    if (!chip) return;
    handleSend(chip.dataset.q);
  });

  suggestions.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const chip = e.target.closest('.vamai-chip');
      if (chip) {
        e.preventDefault();
        handleSend(chip.dataset.q);
      }
    }
  });

  // Init button state & load session chat history
  sendBtn.disabled = true;
  loadSavedHistory();

})();
