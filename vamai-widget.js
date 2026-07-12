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
     5. MESSAGE RENDERING
  ──────────────────────────────────────────────────────────── */
  function appendMessage(html, role) {
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
    return wrapper;
  }

  /* ──────────────────────────────────────────────────────────
     6. HIDE SUGGESTED CHIPS (after first interaction)
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
     8. SEND HANDLER
        — Typing indicator 500–700ms
        — Extended intents first, then getBotResponse()
  ──────────────────────────────────────────────────────────── */
  function handleSend(message) {
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
      'bot'
    );
    typingEl.classList.add('vamai-typing');
    typingEl.setAttribute('aria-label', 'VamAI is typing');

    // 500–700ms randomised delay (feels natural)
    const delay = 500 + Math.floor(Math.random() * 201);

    setTimeout(() => {
      typingEl.remove();

      const response = getExtendedResponse(text) || getBotResponse(text);
      appendMessage(response, 'bot');

      isBotTyping = false;
      sendBtn.disabled = inputField.value.trim().length === 0;
    }, delay);
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

  // Init button state
  sendBtn.disabled = true;

})();
