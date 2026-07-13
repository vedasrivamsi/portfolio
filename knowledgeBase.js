const knowledgeBase = {
    personal: {
      fullName: "Sugunesh Veda Sri Vamsi",
      nickname: "Vamsi",
      education: "Bachelor of Technology (B.Tech)",
      college: "Andhra University College of Engineering (AUCE), Visakhapatnam",
      degree: "Computer Science and Engineering",
      year: "4th Year"
    },
  
    internships: [
      {
        company: "Brainovision Solutions India Pvt. Ltd.",
        role: "Artificial Intelligence for Generation and Automation Intern",
        duration: "2 months from June 2026 to July 2026",
        description:
          "Completed an internship focused on Generative Artificial Intelligence and Automation. Gained practical experience with Large Language Models (LLMs), Small Language Models (SLMs), Prompt Engineering, AI Chatbots, Retrieval-Augmented Generation (RAG), AI Agents, and workflow automation. Built AI-powered applications while learning how modern AI systems are designed, developed, and deployed."
      },
  
      {
        company: "Rashtriya Ispat Nigam Limited (RINL)",
        role: "Full Stack Web Development Intern",
        duration: "1 Month in June 2025",
        description:
          "Developed an Employee Shift & Attendance Manager using Spring Boot, Oracle Database, HTML5, CSS3, JavaScript, and REST APIs. Implemented employee authentication, attendance tracking, leave management, shift scheduling, and responsive dashboards following a three-tier architecture."
      },
  
      {
        company: "InternPe",
        role: "Java Programmer Intern",
        duration: "1 Month in July 2025",
        description:
          "Completed a Java Programming internship focused on Core Java, Object-Oriented Programming, Collections Framework, Exception Handling, File Handling, and problem-solving. Developed multiple Java-based applications while following software engineering best practices."
      }
    ],
  
    skills: [
      "Java",
      "Python",
      "C",
      "C++",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "SQL",
      "Oracle Database",
      "MySQL",
      "Git",
      "GitHub",
      "Machine Learning",
      "Artificial Intelligence",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Responsive Web Design"
    ],
  
    projects: [
      {
        title: "AI Portfolio Assistant",
        company: "Personal Project",
        tech: [
          "React",
          "JavaScript",
          "Tailwind CSS",
          "AI Chatbot",
          "LLMs",
          "Prompt Engineering"
        ],
        description:
          "Developing an intelligent AI-powered portfolio assistant capable of answering questions about my education, skills, internships, certifications, and projects. The chatbot provides recruiters and visitors with an interactive conversational experience to explore my professional profile."
      },
  
      {
        title: "Restaurant Management System",
        company: "Personal Project",
        tech: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Node.js",
          "MySQL",
          "Razorpay"
        ],
        description:
          "Designed and developed a web-based Restaurant Management System that simplifies restaurant operations including digital menu management, online food ordering, billing, payment integration using Razorpay, customer order tracking, and delivery management. The system improves operational efficiency while providing a seamless customer experience."
      },
  
      {
        title: "Employee Shift & Attendance Manager",
        company: "RINL",
        tech: [
          "Spring Boot",
          "Oracle Database",
          "HTML5",
          "CSS3",
          "JavaScript",
          "REST APIs"
        ],
        description:
          "Designed and developed a full-stack employee management system for attendance tracking, leave management, shift scheduling, authentication, and administrative operations using Spring Boot and Oracle Database with a three-tier architecture."
      },
  
      {
        title: "Connect 4",
        company: "InternPe",
        tech: [
          "Java"
        ],
        description:
          "Developed a console-based Connect 4 game implementing game logic, turn-based gameplay, and win-condition validation using Java."
      },
  
      {
        title: "Tic Tac Toe",
        company: "InternPe",
        tech: [
          "Java"
        ],
        description:
          "Built a Java-based Tic Tac Toe game featuring two-player gameplay, board management, and object-oriented programming concepts."
      },
  
      {
        title: "Rock Paper Scissors",
        company: "InternPe",
        tech: [
          "Java"
        ],
        description:
          "Created a Java-based Rock Paper Scissors game featuring interactive gameplay, random computer moves, score tracking, and efficient game logic."
      }
    ],
  
    certifications: [
      {
        name: "Artificial Intelligence for Generation and Automation Internship",
        issuer: "Brainovision Solutions India Pvt. Ltd."
      },
      {
        name: "Full Stack Web Development Internship",
        issuer: "Rashtriya Ispat Nigam Limited (RINL)"
      },
      {
        name: "Java Programmer Internship",
        issuer: "InternPe"
      },
      {
        name: "Introduction to Databases",
        issuer: "NxtWave"
      },
      {
        name: "AWS Solutions Architecture Job Simulation",
        issuer: "Forage"
      },
      {
        name: "MERN Bootcamp",
        issuer: "Student Tribe"
      },
      {
        name: "Build Your Own Static Website",
        issuer: "NxtWave"
      },
      {
        name: "Build Your Own Responsive Website",
        issuer: "NxtWave"
      },
      {
        name: "HTML and CSS Certification",
        issuer: "GUVI - HCL"
      }
    ],
  
    goals: {
      shortTerm:
        "To secure a Software Engineer or AI Engineer role where I can leverage my expertise in software development, artificial intelligence, and full-stack technologies while continuously learning and contributing to innovative products.",
      longTerm:
        "To become a highly skilled AI and Full Stack Software Engineer, develop intelligent and scalable software solutions, contribute to cutting-edge technologies, and build impactful products that solve real-world problems."
    },
  
    contact: {
      email: "vedasrivamsi127@gmail.com",
      github: "https://github.com/vedasrivamsi",
      linkedin: "https://www.linkedin.com/in/sugunesh-vedasrivamsi/"
    },
  
    strengths: [
      "Quick Learner",
      "Problem Solver",
      "Analytical Thinking",
      "Team Player",
      "Adaptability",
      "Self-Motivated",
      "Continuous Learner"
    ],
  
    interests: [
      "Artificial Intelligence",
      "Generative AI",
      "Machine Learning",
      "Full Stack Development",
      "Software Engineering",
      "AI Chatbot Development",
      "Open Source",
      "Cloud Computing",
      "Problem Solving"
    ],
  
    languages: [
      "English",
      "Telugu",
      "Hindi",
      "Tamil"
    ],
  
    hobbies: [
      "Building Software Projects",
      "Learning Emerging Technologies",
      "Competitive Programming",
      "Exploring AI Tools",
      "Reading Technical Blogs"
    ]
  };
  function formatProject(project) {
    return `
<div class="response-card">
    <h3>📂 ${project.title}</h3>

    <p><strong>🏢 Organization:</strong> ${project.company}</p>

    <p><strong>🛠 Tech Stack:</strong> ${project.tech.join(" • ")}</p>

    <p><strong>📝 Description:</strong><br>
    ${project.description}</p>
</div>`;
}

function formatContact() {
  return `
<div class="response-card">

<h3>📬 Contact Vamsi</h3>

<div class="contact-item">
  <strong>📧 Email</strong><br>
  <a href="mailto:${knowledgeBase.contact.email}">
      ${knowledgeBase.contact.email}
  </a>
</div>

<div class="contact-item">
  <strong>💻 GitHub</strong><br>
  <a href="${knowledgeBase.contact.github}" target="_blank">
      Visit GitHub Profile
  </a>
</div>

<div class="contact-item">
  <strong>💼 LinkedIn</strong><br>
  <a href="${knowledgeBase.contact.linkedin}" target="_blank">
      Visit LinkedIn Profile
  </a>
</div>

</div>
`;
}

function formatInternship(internship) {
  return `
<div class="response-card">

<h3>🏢 ${internship.company}</h3>

<p><strong>💼 Role:</strong> ${internship.role}</p>

<p><strong>📅 Duration:</strong> ${internship.duration}</p>

<p><strong>📝 Description:</strong><br>
${internship.description}
</p>

</div>
`;
}

function formatCertification(certification) {
  return `
<div class="response-card">

<h3>🏆 ${certification.name}</h3>

<p>
<strong>🏢 Issued By:</strong>
${certification.issuer}
</p>

</div>
`;
}

function formatSkills() {
  return `
<div class="response-card">

<h3>💻 Technical Skills</h3>

<p><strong>Programming Languages</strong></p>
<p>Java • Python • C • C++</p>

<p><strong>Web Development</strong></p>
<p>HTML5 • CSS3 • JavaScript • Bootstrap</p>

<p><strong>Databases</strong></p>
<p>MySQL • Oracle Database</p>

<p><strong>Tools</strong></p>
<p>Git • GitHub</p>

<p><strong>Core Concepts</strong></p>
<p>DBMS • Operating Systems • Computer Networks • OOP</p>

<p><strong>AI & ML</strong></p>
<p>Artificial Intelligence • Machine Learning</p>

</div>
`;
}

function formatHelp() {
  return `
<div class="response-card">

<h3>🤔 I couldn't understand that question.</h3>

<p>You can ask me about:</p>

<ul>
  <li>👨‍🎓 Education</li>
  <li>💻 Skills</li>
  <li>📂 Projects</li>
  <li>🏢 Internships</li>
  <li>🏆 Certifications</li>
  <li>📧 Contact</li>
</ul>

<p>💡 Example: <em>"Tell me about your projects"</em></p>

</div>
`;
}

const intents = {

  introduction: [
      "who is vamsi",
      "about vamsi",
      "introduce yourself",
      "tell me about yourself",
      "who are you",
      "where is he from",
      "where are you from",
      "hometown",
      "location",
      "city",
      "visakhapatnam",
      "vizag"
  ],

  education: [
      "education",
      "study",
      "college",
      "degree",
      "university",
      "btech",
      "cgpa",
      "gpa",
      "grade",
      "score",
      "marks",
      "graduate",
      "graduation",
      "passout",
      "qualified",
      "academic"
  ],

  skills: [
      "skills",
      "skill",
      "technology",
      "technologies",
      "tech stack",
      "programming",
      "languages",
      "expertise",
      "frameworks",
      "tools",
      "programming languages"
  ],

  projects: [
      "project",
      "projects",
      "portfolio",
      "developed",
      "built",
      "applications",
      "software"
  ],

  internship: [
      "internship",
      "internships",
      "experience",
      "brainovision",
      "internpe",
      "rinl"
  ],

  certification: [
      "certification",
      "certifications",
      "certificate",
      "certified"
  ],

  contact: [
      "contact",
      "email",
      "github",
      "linkedin",
      "reach"
  ],

  achievements: [
      "achievement",
      "achievements",
      "award",
      "awards",
      "honor",
      "honours",
      "accomplishment",
      "accomplishments",
      "recognition",
      "won",
      "winning",
      "ranking",
      "proud of",
      "highlight"
  ]

};

function hasIntent(input, intentName) {

  return intents[intentName].some(keyword =>
      input.includes(keyword)
  );

}

let conversationContext = {
  lastIntent: null
};

function searchProjects(keyword) {

  keyword = keyword.toLowerCase();

  return knowledgeBase.projects.filter(project =>

      project.title.toLowerCase().includes(keyword) ||

      project.description.toLowerCase().includes(keyword) ||

      project.tech.some(tech =>
          tech.toLowerCase().includes(keyword)
      )

  );

}

function searchInternships(keyword) {

  keyword = keyword.toLowerCase();

  return knowledgeBase.internships.filter(internship =>

      internship.company.toLowerCase().includes(keyword) ||

      internship.role.toLowerCase().includes(keyword) ||

      internship.description.toLowerCase().includes(keyword)

  );

}

function searchSkills(keyword){

  keyword = keyword.toLowerCase();

  return knowledgeBase.skills.filter(skill=>

      skill.toLowerCase().includes(keyword)

  );

}



  function getBotResponse(message) {

    const input = message.toLowerCase();
    // ===== Dynamic Project Search =====

const projectKeywords = [
  "java",
  "javascript",
  "python",
  "react",
  "spring",
  "spring boot",
  "html",
  "css",
  "node",
  "mysql",
  "oracle",
  "ai",
  "machine learning",
  "llm"
];

for (const keyword of projectKeywords) {

  if (
      input.includes(keyword) &&
      hasIntent(input, "projects")
  ) {

      const results = searchProjects(keyword);

      if (results.length > 0) {

          return `
<h2>🔍 Projects using "${keyword}"</h2>

${results.map(formatProject).join("<br>")}
`;

      }

  }

}
    const followUps = [
      "tell me more",
      "more",
      "explain more",
      "details",
      "can you explain",
      "elaborate"
  ];
  
  if (followUps.some(word => input.includes(word))) {
  
      switch (conversationContext.lastIntent) {
  
          case "projects":
              return "I have developed multiple projects including an AI Portfolio Assistant, Restaurant Management System, Employee Shift & Attendance Manager, Connect 4, Tic Tac Toe, and Rock Paper Scissors. Ask me about any specific project to know more.";
  
          case "skills":
              return "My strongest skills include Java, Python, JavaScript, Full Stack Development, Artificial Intelligence, Machine Learning, SQL, Git, and Software Engineering.";
  
          case "internship":
              return "I have completed internships at Brainovision Solutions, Rashtriya Ispat Nigam Limited (RINL), and InternPe, gaining experience in AI, Full Stack Development, and Java Programming.";
  
          default:
              return "Could you tell me what you'd like to know more about?";
      }
  
  }

    if (hasIntent(input, "introduction")) {

      conversationContext.lastIntent = "introduction";
        return `
<strong>${knowledgeBase.personal.fullName}</strong>, also known as <strong>${knowledgeBase.personal.nickname}</strong>, is a <strong>${knowledgeBase.personal.year}</strong> <strong>${knowledgeBase.personal.degree}</strong> student at <strong>${knowledgeBase.personal.college}</strong>.
`;
    }

    if (hasIntent(input, "education")) {

      conversationContext.lastIntent = "education";
        return `
I am pursuing <strong>${knowledgeBase.personal.education}</strong> in <strong>${knowledgeBase.personal.degree}</strong> at <strong>${knowledgeBase.personal.college}</strong>.<br><br>
<strong>📊 CGPA:</strong> 7.36 (ongoing)<br>
<strong>🎓 Status:</strong> Currently in my final year, expected to graduate in 2027.
`;
    }

    if (hasIntent(input, "skills")) {

      conversationContext.lastIntent = "skills";

      return formatSkills();
    }

    if (hasIntent(input, "projects")) {

      conversationContext.lastIntent = "projects";

      return `
  <h2>📂 My Projects</h2>
  
  ${knowledgeBase.projects
      .map(formatProject)
      .join("<br><br>")}
  `;
  
  }

  if (hasIntent(input, "internship")) {

    conversationContext.lastIntent = "internship";

    return `
<h2>🏢 My Internship Experience</h2>

${knowledgeBase.internships
    .map(formatInternship)
    .join("<br>")}
`;

}

if (hasIntent(input, "certification")) {

  conversationContext.lastIntent = "certification";

  return `
<h2>🏆 Certifications</h2>

${knowledgeBase.certifications
  .map(formatCertification)
  .join("<br>")}
`;

}

    if (hasIntent(input, "contact")) {

      conversationContext.lastIntent = "contact";
  
      return formatContact();
  
  }

  if (hasIntent(input, "achievements")) {

    conversationContext.lastIntent = "achievements";

    return `
<div class="response-card">

<h3>🏆 Key Achievements & Highlights</h3>

<p><strong>🎓 Academic:</strong><br>
Maintaining a CGPA of <strong>7.36</strong> in B.Tech Computer Science Engineering at Andhra University College of Engineering, Visakhapatnam.</p>

<p><strong>💼 Internships:</strong><br>
Completed <strong>3 internships</strong> — at Brainovision Solutions (AI & Automation), RINL (Full Stack Development), and InternPe (Java Programming).</p>

<p><strong>📜 Certifications:</strong><br>
Earned <strong>9 certifications</strong> from recognized organizations including NxtWave, AWS Forage, GUVI-HCL, Student Tribe, and internship completion certificates.</p>

<p><strong>🤖 Projects:</strong><br>
Built a fully functional <strong>AI chatbot (VamAI)</strong> integrated into a portfolio website using pure HTML, CSS, and JavaScript — no backend, no APIs.</p>

<p><strong>🌐 Live Portfolio:</strong><br>
Deployed a professional portfolio on <a href="https://vedasrivamsi.github.io/portfolio/" target="_blank">GitHub Pages</a> with a custom AI assistant.</p>

</div>
`;

}

  return formatHelp();
}
