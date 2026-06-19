import { Project, ServiceItem } from './types';

export const PROFILE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCt1u5ckCUFAONJE_Yb4NXh33fTZzoSrPRRomNjR1o6_eQb2cN6_zaBIm3D2RchmT4u7PbyCnMIAA7DtXJCwvgCX0HmsebZ03H59eB3_KdrkEC4If1UjM99WSJXocKERbXNtGZ1ehqqH0wT6T9XqygVar3FcscZlD2771O8dFVGfyB1gGUDhP05nXm1Kz_rz1KqdmNAqJoIZkheacDB95zJScbfSWIJQ9Db05AB0-c1oqjbxa0Jo36lR0fBBd_CjY7aozVMjOji2k4";

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Platform Belanja Masa Depan",
    description: "Rebranding total untuk pasar digital global dengan pendekatan visual yang berani dan navigasi intuitif. Mengintegrasikan teknologi web termutakhir untuk performa luar biasa.",
    category: "UI/UX",
    tags: ["UI/UX", "E-Commerce"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgEAGIS13nXad6sOfqhmlYJ2u2TmQPb6SjpE3B6pQH5zHXZ8KG9puLT9LObusY6mw-WxgLC_nWTLmOCeQSDIiPS6grVsJc2j5itb10zH_9M1TjdxDFn2ZRbmD2abG-sOkCGop71LPTWus2j3LStt5T0cKOcNMVR4zEycBjPNHAsNzgXlIbDJF7OV1CrZKMuWqdNGLY0kQK6HOs75wnivhXaqAn88_U5dQPrSgq_nT3_a0uvVfc-nP-_ZOnfHhwZQnpXfAcpmzpRTQ",
    year: "2024",
    client: "EkoMart Global",
    duration: "3 Bulan",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "GraphQL"],
    features: [
      "Sistem desain neubrutalism kustom yang sangat responsif",
      "Performa loading di bawah 1.2 detik menggunakan optimasi gambar pintar",
      "Arsitektur checkout satu halaman dengan validasi formulir instan",
      "Mode gelap/terang adaptif dengan kontras tinggi yang ramah aksesibilitas"
    ],
    detailedContent: "Proyek Platform Belanja Masa Depan dirancang untuk menantang konvensi desain e-commerce arus utama. Melalui penerapan estetika neubrutalisme yang segar dan berani, kami meningkatkan tingkat konversi hingga 43% serta mempertahankan pengguna aktif harian dengan navigasi mikro-interaksi yang seru."
  },
  {
    id: "project-2",
    title: "Identitas Visual \"Kreativ\"",
    description: "Branding akademis dan minimalis untuk agensi kreatif yang menonjolkan kejujuran struktural dan penataan visual yang tegas.",
    category: "Branding",
    tags: ["Branding", "Agensi"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBawtAzx5Z0EqsS3gBUQDGtNzF5arqTRFP3ZDF9-DqoqK8XNlvs27JfoYQKHwy3-CVWJkooU-OBIowrfeRUemR2KhmLUDe69VVqOX6AFRIud-Oug58kOhs14b4l0LivL-PUUcvz_o5MyidhecsyAqvr69L5_fRWQcXVRhVgmIR2y58fmbA9D_fHPMJnzdJ9zWL5rU_LCWEKrHb4VIUNmfZIJDZgXZqFAC63WxE-S8KBeefwMIN5e8wS_UnS41h1BCAoJ1Z0_Xs5V5s",
    year: "2023",
    client: "Kreativ Agency",
    duration: "1.5 Bulan",
    techStack: ["Adobe Illustrator", "Figma", "Brand Guidelines", "Visual Assets"],
    features: [
      "Pembuatan logo utama, alternatif, dan monogram",
      "Panduan tipografi komparatif dengan keterbacaan ekstrem",
      "Palet warna kontras tinggi dengan panduan cetak & digital",
      "Aset media sosial template siap pakai untuk kampanye digital"
    ],
    detailedContent: "Identitas Visual 'Kreativ' lahir dari dedikasi terhadap visual asimetris dan 'honest UI'. Alih-alih menyembunyikan elemen fungsional, identitas ini dengan bangga menampilkannya sebagai bagian utama dari bahasa merek, menampilkan kesan modern dan berani."
  },
  {
    id: "project-3",
    title: "Dashboard Analytics 2.0",
    description: "Visualisasi data kompleks menjadi interface yang indah, interaktif, dan mudah dipahami, dioptimalkan untuk performa tinggi.",
    category: "Web Dev",
    tags: ["Web Dev", "FinTech"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpDBk7tL32tkF5YSunjWp4secnMn-WzofVn5tcvS9AwFtFCJ82IpMADu5GD3t4zuVAwoYRqlCkO9tRD-9cQojgZCrOypZ5rxhUmBkDCRqhwIg4Z2j-L1lSsm_Tt_FH4PAd4GBkQeDwCGYkbYoFQAfXuLNjx0EYf2vUH39l8PGXk1HIU9ZuEOBQqzwNbCg1ByDyNiXeH2nKaZlSbFY0l9heFRBMcJFq-E2vJyw0N1Vcx56S13ELcfG3T3bByc5GtfwPwmbAn-SiQw8",
    year: "2024",
    client: "Necton Ventures",
    duration: "2 Bulan",
    techStack: ["Next.js", "D3.js", "Recharts", "TailwindCSS"],
    features: [
      "Render grafik interaktif real-time dengan latency ultra rendah",
      "Eksport data cepat ke PDF, CSV, dan format Excel",
      "Kustomisasi widget bento-grid menggunakan drag & drop",
      "Audit kegunaan penuh (A11y WCAG 2.1 Compliant)"
    ],
    detailedContent: "Dashboard Analytics 2.0 memproses ribuan data server per detik dan mengubahnya menjadi visualisasi grafis D3 yang responsif. Dengan gaya retro brutalist modern, interface ini memberikan energi segar bagi para analis yang terbiasa dengan dasbor korporasi yang membosankan."
  },
  {
    id: "project-4",
    title: "Aplikasi Edukasi Pintar (Bonus Proyek)",
    description: "Platform belajar interaktif yang dirancang khusus untuk memotivasi anak muda belajar matematika dan logika menggunakan gamifikasi.",
    category: "UI/UX",
    tags: ["UI/UX", "Mobile"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    year: "2023",
    client: "EduKids Foundation",
    duration: "4 Bulan",
    techStack: ["React Native", "Expo", "Framer Motion", "Supabase"],
    features: [
      "Sistem lencana pencapaian dinamis",
      "Antarmuka ramah anak dengan kontras ramah disleksia",
      "Sinkronisasi data offline otomatis",
      "Kuis real-time multipemain"
    ],
    detailedContent: "Proyek inovatif ini menggabungkan gamifikasi yang adiktif dengan standar pedagogi modern. Dengan palet warna yang ceria namun tetap berkarakter neubrutalism, platform ini terbukti meningkatkan durasi sesi belajar mandiri hingga 65%."
  },
  {
    id: "project-5",
    title: "Situs Kampanye Musik Independen",
    description: "Landing page kustom untuk peluncuran album artis indie lokal dengan fitur audio player interaktif dan pembelian tiket konser virtual.",
    category: "Web Dev",
    tags: ["Web Dev", "Musik"],
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    year: "2024",
    client: "Distorsi Records",
    duration: "1 Bulan",
    techStack: ["React", "Web Audio API", "Vite", "TailwindCSS"],
    features: [
      "Equalizer visual interaktif terintegrasi",
      "Penjualan tiket aman berbasis token lokal",
      "Animasi lirik tersinkronisasi musik",
      "Galeri foto interaktif 3D"
    ],
    detailedContent: "Situs web kampanye yang dibuat eksklusif untuk mendobrak batasan standard presentasi musik digital. Kami menggunakan Web Audio API kustom untuk memastikan pemutaran lagu lancar, dibalut dengan estetika poster retro brutalist digital."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "uiux",
    title: "UI/UX DESIGN",
    description: "Menciptakan antarmuka yang memukau dan pengalaman pengguna yang mulus menggunakan tren desain terbaru.",
    iconName: "Palette",
    bgColor: "bg-white",
    borderColor: "border-secondary",
    accentColor: "text-secondary",
    bullets: ["Prototyping", "User Research", "Design Systems"]
  },
  {
    id: "webdev",
    title: "WEB DEV",
    description: "Pengembangan web responsif yang cepat, aman, dan dioptimalkan untuk performa maksimal di semua perangkat.",
    iconName: "Code2",
    bgColor: "bg-primary-container",
    borderColor: "border-on-surface",
    accentColor: "text-on-background",
    bullets: ["React / Next.js", "Tailwind CSS", "API Integration"]
  },
  {
    id: "branding",
    title: "BRANDING",
    description: "Membangun identitas brand yang kuat dan konsisten yang mencerminkan nilai-nilai unik bisnis Anda.",
    iconName: "Sparkles",
    bgColor: "bg-secondary-container",
    borderColor: "border-on-surface",
    accentColor: "text-secondary",
    bullets: ["Logo Design", "Brand Strategy", "Visual Guides"]
  }
];

export const TESTIMONIALS = [
  {
    name: "Rian Pratama",
    role: "CEO, EkoMart Global",
    quote: "Desain neubrutalisme dari Atmajaya memberikan nafas segar dan jiwa baru bagi platform e-commerce kami. Konversi penjualan kami meledak berkat navigasi yang sangat intuitif!",
    avatarBg: "bg-primary-container"
  },
  {
    name: "Siti Amelia",
    role: "Digital Specialist, Kreativ Agency",
    quote: "Sangat profesional dan memiliki pemahaman mendalam tentang identitas visual modern. Hasil kerjanya melampaui seluruh harapan tim kami.",
    avatarBg: "bg-secondary-container"
  }
];
