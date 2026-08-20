import { portfolioData } from './portfolioData';

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text, keywords) {
  return keywords.some((keyword) => {
    const kw = keyword.toLowerCase();
    if (kw.includes(' ')) return text.includes(kw);
    if (kw.length <= 4) {
      return new RegExp(`(^|[^a-z0-9])${kw}([^a-z0-9]|$)`).test(text);
    }
    return text.includes(kw);
  });
}

function formatList(items) {
  return items.map((item) => `• ${item}`).join('\n');
}

function getProjectsReply() {
  const projects = portfolioData.projects || [];
  const list = projects
    .map((project) => `• ${project.title} — ${project.categoryName} (${project.year})`)
    .join('\n');
  return {
    text:
      `Azmi has ${projects.length} featured projects in his portfolio:\n${list}\n\n` +
      `All of them are built with technologies like Laravel, React.js, and Next.js. Click the button below to see the full projects page!`,
    action: 'projects',
  };
}

function getSkillsReply() {
  const skills = portfolioData.skills || [];
  const list = skills
    .map((skill) => `• ${skill.title}: ${skill.techStack.join(', ')}`)
    .join('\n');
  return {
    text:
      `Here are the key skills of ${portfolioData.profile.name}:\n${list}\n\n` +
      `His main focus is building web apps that are fast, scalable, and easy to use. Want to know more details?`,
    action: 'about',
  };
}

function getExperienceReply() {
  const work = portfolioData.workHistory || [];
  const list = work
    .map(
      (entry) =>
        `• ${entry.role} di ${entry.company} (${entry.period})\n  ${entry.description}`
    )
    .join('\n\n');
  return {
    text: `Work experience history:\n\n${list}`,
    action: 'about',
  };
}

function getEducationReply() {
  const education = portfolioData.educationAndAwards || [];
  const list = education
    .map((entry) => `• ${entry.category}: ${entry.title} — ${entry.subtitle}`)
    .join('\n');
  return {
    text: `Education & awards background:\n\n${list}`,
    action: 'about',
  };
}

function getSocialsReply() {
  const socials = portfolioData.profile.socials || {};
  const links = [
    ['GitHub', socials.github],
    ['LinkedIn', socials.linkedin],
    ['Instagram', socials.instagram],
    ['Discord', socials.discord],
  ]
    .filter(([, url]) => url)
    .map(([name, url]) => `• ${name}: ${url}`)
    .join('\n');
  return {
    text: `Meet Azmi on social platforms:\n\n${links}\n\nYou can also check the SOCIAL CHANNELS button in the footer!`,
    action: 'socials',
  };
}

export function getBotReply(input) {
  const text = normalize(input);
  const profile = portfolioData.profile;

  if (!text) {
    return {
      text: `Hello! I'm the virtual assistant of ${profile.name}. How can I help you? You can ask about skills, projects, experience, or how to contact him.`,
    };
  }

  if (hasAny(text, ['halo', 'hai', 'hi', 'hello', 'assalamu', 'pagi', 'siang', 'sore', 'malam', 'hey', 'selamat datang', 'hy'])) {
    return {
      text: `Hello! 👋 I'm the virtual assistant of ${profile.name} — Software Engineer & Full Stack Developer. I can give you info about skills, projects, experience, or how to contact Azmi. What topic do you want to know about?`,
    };
  }

  if (hasAny(text, ['siapa', 'who are you', 'about', 'tentang', 'perkenal', 'kenalin', 'introduce', 'profile', 'profil', 'deskripsi'])) {
    return {
      text:
        `${profile.name} is a ${profile.title}.\n\n${profile.shortBio}\n\n` +
        `He is currently working as a freelance Frontend Developer at Solveit Indonesia and is open to new collaboration opportunities.`,
      action: 'about',
    };
  }

  if (hasAny(text, ['skill', 'kemampuan', 'keahlian', 'tech stack', 'teknologi', 'bisa apa', 'kuasai', 'mahir', 'technology', 'stack', 'tool'])) {
    return getSkillsReply();
  }

  if (hasAny(text, ['project', 'proyek', 'portfolio', 'karya', 'showcase', 'hasil', 'kerjaan', 'website yang', 'buat apa'])) {
    return getProjectsReply();
  }

  if (hasAny(text, ['pengalaman', 'experience', 'kerja', 'karir', 'career', 'riwayat', 'pekerjaan', 'bekerja', 'bekerja di', 'work', 'job'])) {
    return getExperienceReply();
  }

  if (hasAny(text, ['pendidikan', 'education', 'kuliah', 'universitas', 'sekolah', 'belajar', 'degree', 'sarjana', 'sertifikat', 'kampus', 'award', 'penghargaan'])) {
    return getEducationReply();
  }

  if (hasAny(text, ['hubungi', 'contact', 'kontak', 'email', 'pesan', 'message', 'telepon', 'telp', 'wa', 'whatsapp', 'form', 'hub'])) {
    return {
      text:
        `You can contact Azmi directly through the contact form on this website or send an email to muhammad.azmi.iman@gmail.com.\n\n` +
        `Click the button below to open the message form! 👇`,
      action: 'contact',
    };
  }

  if (hasAny(text, ['sosmed', 'social', 'instagram', 'github', 'linkedin', 'discord', 'ig', 'medsos', 'follow'])) {
    return getSocialsReply();
  }

  if (hasAny(text, ['hire', 'hiring', 'kerja sama', 'kolaborasi', 'collab', 'rekrut', 'open', 'available', 'tersedia', 'freelance', 'proyek baru', 'recruit', 'lowongan', 'jasa'])) {
    return {
      text:
        `Good news! ${profile.name} is currently: "${profile.status}" and is open for freelance, full-time, or project collaborations.\n\n` +
        `Let's discuss your needs through the contact form!`,
      action: 'contact',
    };
  }

  if (hasAny(text, ['lokasi', 'location', 'indonesia', 'malang', 'domisili', 'tinggal', 'alamat', 'negara', 'where', 'diman', 'mana'])) {
    return {
      text: `Azmi is based in Malang, Indonesia 🇮🇩 and is available for remote work (worldwide) as well as on-site / hybrid.`,
    };
  }

  if (hasAny(text, ['biaya', 'harga', 'tarif', 'bayar', 'cost', 'price', 'budget', 'rate', 'honor'])) {
    return {
      text:
        `For a cost or project rate estimate, it's flexible and adjusted based on scope, timeline, and feature specifications.\n\n` +
        `Please contact Azmi directly through the contact form to discuss your project budget!`,
      action: 'contact',
    };
  }

  if (hasAny(text, ['terima kasih', 'makasih', 'thanks', 'thank', 'thx', 'maksih', 'maturnuwun'])) {
    return {
      text: `You're welcome! 😊 Happy to help. If you have any other questions, feel free to ask again.`,
    };
  }

  if (hasAny(text, ['bye', 'dadah', 'sampai jumpa', 'see you', 'selamat tinggal', 'salam', 'dah', 'goodbye', 'goobye'])) {
    return {
      text: `See you! 👋 Have a great day. Don't forget to explore Azmi's portfolio!`,
    };
  }

  return {
    text:
      `Sorry, I didn't recognize that question. 😅\n\n` +
      `Try asking about:\n` +
      `• Skills & Tech Stack\n` +
      `• Featured Projects\n` +
      `• Work Experience & Education\n` +
      `• Contact & Collaboration Opportunities\n` +
      `• Azmi's Social Media\n\nOr pick a quick option below!`,
  };
}

export const chatbotQuickReplies = [
  '⚡ Skills & Tech Stack',
  '🚀 View Projects',
  '💼 Work Experience',
  '✉️ Contact Azmi',
  '🎓 Education',
];

export const chatbotGreeting = {
  text: `Hello! 👋 I'm the virtual assistant of ${portfolioData.profile.name}. I'm ready to help you get to know him better — ask about skills, projects, experience, or how to contact him. Pick one of the questions below or type directly!`,
};