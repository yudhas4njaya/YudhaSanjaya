// ============================================
// DATABASE: Data Perjalanan (Pendidikan, Organisasi, Proyek)
// ============================================
const journeyData = {
  academic:{
    title:'Universitas Muhammadiyah Surakarta',
    year:'2022–Sekarang',
    yearEn:'2022–Present',
    description:'Sebagai mahasiswa Teknik Informatika yang membangun kemampuan di bidang teknologi, desain, dan pemecahan masalah digital.',
    descriptionEn:'As an Informatics Engineering student, developing skills in technology, design, and digital problem-solving.',
    images:['ums1.jpg.jpeg','ums2.jpg.jpeg','ums3.jpg.jpeg']
  },
  imm:{
    title:'IMM FKI UMS',
    year:'2022–2024',
    description:'Pengalaman di divisi organisasi yang melatih kerja sama tim, komunikasi, perencanaan, dan pelaksanaan program kerja.',
    descriptionEn:'An organizational experience that helped me grow my teamwork, communication, planning, and event skills.',
    images:['imm1.jpg.png','imm2.jpg.jpeg','imm3.jpg.jpeg']
  },
  mentor:{
    title:'Mentor AIK UMS',
    year:'2022–2024',
    yearEn:'2022–2024',
    description:'Pengalaman mentoring yang memperkuat kemampuan komunikasi, presentasi, pendampingan, dan interaksi dengan mahasiswa lain.',
    descriptionEn:'A mentoring experience that helped me grow my communication, presentation, guidance, and interaction skills with other students.',
    images:['mentor1.jpg.jpeg','mentor2.jpg.jpeg','mentor3.jpg.jpeg']
  },
  roblox:{
    title:'Wirausaha Mandri',
    titleEn:'Self Employed',
    year:'Jul 2025–Des 2025',
    description:'Pengalaman sebagai Admin Marketplace yang berfokus pada komunikasi pelanggan, negosiasi, transaksi, dan pengelolaan pesanan.',
    descriptionEn:'A Marketplace Admin experience where I handled customer communication, negotiation, transactions, and order management.',
    images:['roblox1.jpg.jpg','roblox2.jpg.png','roblox3.jpg.png']
  },
  udang:{
    title:'Udang Kedjuu Indonesia',
    year:'Mar 2026–Agu 2026',
    description:'Pengalaman sebagai Konten Kreator Digital dan Manajemen Sosial Media yang mencakup ideasi, produksi konten, editing, perencanaan, dan pengembangan audiens.',
    descriptionEn:'Experience in Digital Content Creator and Social Media Management, from coming up with ideas and creating content to editing, planning, and growing the audience.',
    images:['udang1.jpg.jpg','udang2.jpg.jpg','udang3.jpg.png']
  },
  proja:{
    title:'Profil Perusahaan & Katalog Produk — PT Setiawan Jaya Usaha',
    titleEn:'Company Profile & Product Catalog — PT Setiawan Jaya Usaha',
    year:'2025',
    yearEn:'2025',
    problem:'Desain sebelumnya sudah ketinggalan zaman dan kurang menarik secara visual.',
    problemEn:'The previous design was outdated and lacked visual appeal.',
    description:'Merancang profil perusahaan dan katalog produk dari nol menggunakan Canva tanpa template, dengan layout custom yang menampilkan visualisasi modern dan menarik untuk PT Setiawan Jaya Usaha.',
    descriptionEn:'Designed a company profile and product catalog from scratch using Canva without templates, creating a custom layout with a modern and engaging visual presentation for PT Setiawan Jaya Usaha.',
    images:['sju1.jpg.png','sju2.jpg.jpg','sju3.jpg.png'],
    skills:['Graphic Design','Visual Branding','Layout & Composition','Canva Proficiency','Client Needs Analysis'],
    confidential:true
  },
  projb:{
    title:'Konten Kreator Digital & Manajemen Sosial Media — Udang Kedjuu Indonesia',
    titleEn:'Digital Content Creator & Social Media Management — Udang Kedjuu Indonesia',
    year:'Mar 2026–Agu 2026',
    yearEn:'Mar 2026–Aug 2026',
    problem:'Melanjutkan fondasi media sosial yang ada dan menaikkan level interaksi konten.',
    problemEn:'Building on the existing social media foundation and increasing content engagement.',
    description:'Mendukung pertumbuhan digital Udang Kedjuu, brand F&B yang berkembang pesat dengan lebih dari 20 cabang di seluruh Pulau Jawa. Mengelola produksi media sosial secara menyeluruh untuk Udang Kedjuu Indonesia, mulai dari pengerjaan ide, proses syuting, editing, hingga penjadwalan konten. Selama periode 6 bulan, berhasil meningkatkan visibilitas brand dan interaksi lokal di area Surakarta melalui pembuatan konten yang fresh dan strategis.',
    descriptionEn:'Supported the digital growth of Udang Kedjuu, a rapidly growing F&B brand with more than 20 branches across Java. Managed the complete social media production process, from content ideation and shooting to editing and scheduling. During the 6-month period, successfully increased brand visibility and local engagement in the Surakarta area through fresh and strategic content.',
    images:['udang1.jpg.jpg','udang2.jpg.jpg','udang3.jpg.png'],
    skills:['Content Ideation','Video Editing','Social Media Management','Copywriting','KOL Collaboration'],
    reviewLink:'https://www.tiktok.com/@udangkedjuu_official'
  },
  projc:{
    title:'Wirausaha Mandri — Pasar Roblox (Growtopia, Fish It & Grow A Garden)',
    titleEn:'Self Employed — Roblox Marketplace (Growtopia, Fish It & Grow A Garden)',
    year:'Jul 2025–Des 2025',
    yearEn:'Jul 2025–Dec 2025',
    problem:'Mengatasi risiko tinggi penipuan item digital dengan membangun lingkungan transaksi yang aman dan transparan bagi para gamer.',
    problemEn:'Reducing the risk of digital item scams by creating a safe and transparent transaction environment for gamers.',
    description:'Mengelola layanan perantara (escrow service) untuk transaksi item virtual Roblox selama periode 6 bulan. Memanfaatkan platform SociaBuzz dan live stream interaktif untuk meningkatkan transparansi, membangun kepercayaan pembeli, serta memfasilitasi transaksi digital yang lancar.',
    descriptionEn:'Managed an escrow service for virtual item transactions on Roblox for 6 months. Utilized SociaBuzz and interactive live streams to improve transaction transparency, build buyer trust, and facilitate smooth digital transactions.',
    images:['roblox1.jpg.jpg','roblox2.jpg.png','roblox3.jpg.png'],
    skills:['Live Streaming','Trust Building','Negotiation','Customer Service','Transaction Management'],
    confidential:true
  }
};

// ============================================
// DATABASE: Data Keahlian (Skill Cards)
// ============================================
const skillData = {
  uiux:{
    titleId:'Desainer UI/UX', titleEn:'UI/UX Designer',
    skills:[
      ['Figma','figma',90],['Wireframing','layout-template',92],['Prototyping','mouse-pointer-click',88],['User Flow','route',85]
    ]
  },
  content:{
    titleId:'Konten Kreator Digital', titleEn:'Digital Content Creator',
    skills:[
      ['Content Planning','calendar-days',90],['Graphic Design','pen-tool',88],['Video Editing','video',86],['Copywriting','pen-line',82]
    ]
  },
  social:{
    titleId:'Manajemen Sosial Media', titleEn:'Social Media Management',
    skills:[
      ['Content Strategy','route',88],['Scheduling','calendar-check',90],['Engagement','message-circle',86],['Analytics','chart-no-axes-combined',82]
    ]
  },
  self:{
    titleId:'Wirausaha Mandiri', titleEn:'Self Employed',
    skills:[
      ['Online Sales','shopping-bag',84],['Negotiation','handshake',80],['Customer Service','headphones',88],['Business Management','briefcase-business',78]
    ]
  }
};
