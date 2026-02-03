const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.gallery.deleteMany({});
  await prisma.skill.deleteMany({});

  // Profile
  await prisma.profile.create({
    data: {
      id: "hero-profile",
      name: "Alif",
      role_en: "Senior Full-Stack Developer",
      role_id: "Pengembang Full-Stack Senior",
      bio_en:
        "I build products that are fast, accessible, and human-centric. Obsessed with high-performance architecture and elegant interfaces.",
      bio_id:
        "Saya membangun produk yang cepat, aksesibel, dan berpusat pada manusia. Terobsesi dengan arsitektur berperforma tinggi dan antarmuka yang elegan.",
      tagline_en: "Building digital experiences that matter.",
      tagline_id: "Membangun pengalaman digital yang bermakna.",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    },
  });

  // Projects
  await prisma.project.createMany({
    data: [
      {
        title_en: "Smart Home IoT Hub",
        title_id: "Hub IoT Rumah Pintar",
        description_en:
          "Centralized dashboard for monitoring and controlling home appliances using MQTT protocol and React.",
        description_id:
          "Dasbor terpusat untuk memantau dan mengontrol peralatan rumah tangga menggunakan protokol MQTT dan React.",
        type: "IoT",
        techStack: "Node.js, MQTT, React, Chart.js",
        image:
          "https://images.unsplash.com/photo-1558002038-103792e07a70?q=80&w=1000",
        isFeatured: true,
        order: 1,
      },
      {
        title_en: "Medical Diagnosis AI",
        title_id: "AI Diagnosa Medis",
        description_en:
          "Computer vision application for detecting anomalies in X-ray images with 95% accuracy.",
        description_id:
          "Aplikasi computer vision untuk mendeteksi anomali pada gambar rontgen dengan akurasi 95%.",
        type: "AI",
        techStack: "Python, TensorFlow, OpenCV, FastAPI",
        image:
          "https://images.unsplash.com/photo-1576086213369-97a306dca665?q=80&w=1000",
        isFeatured: true,
        order: 2,
      },
      {
        title_en: "Fraud Detection Engine",
        title_id: "Mesin Deteksi Penipuan",
        description_en:
          "Machine learning model to predict fraudulent bank transactions in real-time.",
        description_id:
          "Model pembelajaran mesin untuk memprediksi transaksi bank yang mencurigakan secara real-time.",
        type: "Machine Learning",
        techStack: "Scikit-learn, Pandas, PostgreSQL, Docker",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
        isFeatured: true,
        order: 3,
      },
    ],
  });

  // Blogs
  await prisma.blog.createMany({
    data: [
      {
        title_en: "Introduction to IoT with Next.js",
        title_id: "Pengenalan IoT dengan Next.js",
        slug: "intro-iot-nextjs",
        excerpt_en:
          "How to build real-time dashboards for your hardware projects.",
        excerpt_id:
          "Cara membangun dasbor real-time untuk proyek hardware Anda.",
        content_en:
          "<h2>The Convergence of Hardware and Software</h2><p>Building real-time dashboards is no longer just about the front-end. It is about the <strong>seamless integration</strong> of sensors and cloud services.</p><blockquote>The most powerful tools are those that bridge the gap between the physical and digital worlds.</blockquote><p>In this guide, we explore how Next.js can be used to visualize real-time IoT data with minimal latency and maximum scalability.</p><h3>Key Architectural Patterns</h3><ul><li>Edge Computing for local processing</li><li>WebSockets for real-time telemetry</li><li>Global state management for sensor synchronization</li></ul>",
        content_id:
          "<h2>Konvergensi Perangkat Keras dan Lunak</h2><p>Membangun dasbor real-time bukan lagi hanya soal front-end. Ini tentang <strong>integrasi mulus</strong> antara sensor dan layanan cloud.</p><blockquote>Alat yang paling kuat adalah yang menjembatani kesenjangan antara dunia fisik dan digital.</blockquote><p>Dalam panduan ini, kami mengeksplorasi bagaimana Next.js dapat digunakan untuk memvisualisasikan data IoT secara real-time dengan latensi minimal.</p><h3>Pola Arsitektur Utama</h3><ul><li>Edge Computing untuk pemrosesan lokal</li><li>WebSockets untuk telemetri real-time</li><li>Manajemen state global untuk sinkronisasi sensor</li></ul>",

        category: "Tech",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
        date: new Date(),
      },
    ],
  });

  // --- Skills ---
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills = [
      { name: "React", category: "Frontend", level: 95, order: 1 },
      { name: "Next.js", category: "Frontend", level: 90, order: 2 },
      { name: "Typescript", category: "Frontend", level: 85, order: 3 },
      { name: "Node.js", category: "Backend", level: 88, order: 1 },
      { name: "Prisma", category: "Backend", level: 80, order: 2 },
      { name: "PostgreSQL", category: "Backend", level: 75, order: 3 },
      { name: "Docker", category: "Tools", level: 70, order: 1 },
      { name: "AWS", category: "Tools", level: 65, order: 2 },
    ];
    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }
  }

  // Experiences
  await prisma.experience.createMany({
    data: [
      {
        year: "2023 - Present",
        role_en: "Lead AI Engineer",
        role_id: "Ketua Insinyur AI",
        company: "FutureLabs",
        description_en:
          "Directing the integration of LLMs into enterprise workflows.",
        description_id:
          "Mengarahkan integrasi LLM ke dalam alur kerja perusahaan.",
        order: 1,
      },
    ],
  });

  // Gallery
  await prisma.gallery.createMany({
    data: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=1000",
        caption_en: "Hiking in the Japanese Alps during autumn.",
        caption_id: "Mendaki di Pegunungan Alpen Jepang saat musim gugur.",
        location: "Nagano, Japan",
        date: new Date("2024-10-15"),
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1516483642777-28f8f997f3ad?q=80&w=1000",
        caption_en: "Exploring the coastal towns of Italy.",
        caption_id: "Menjelajahi kota-kota pesisir di Italia.",
        location: "Cinque Terre, Italy",
        date: new Date("2024-06-20"),
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000",
        caption_en: "Quiet mornings in the Scandinavian wilderness.",
        caption_id: "Pagi yang tenang di alam liar Skandinavia.",
        location: "Norway",
        date: new Date("2024-08-05"),
      },
    ],
  });

  console.log("Bilingual seed data with Gallery created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
