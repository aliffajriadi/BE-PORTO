const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || "super-secret-key-123";
const allowedOrigins = [
  "http://localhost:3000",        // Next.js dev
  "http://127.0.0.1:3000",
  "http://192.168.1.8:3000",
  "https://www.aliffajriadi.my.id",       // production
  "https://aliffajriadi.my.id",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true,
  })
);
app.use(express.json());

// Auth Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// --- Profile ---
app.get("/api/profile", async (req, res) => {
  let profile = await prisma.profile.findFirst();
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        id: "hero-profile",
        name: "Alif",
        role_en: "Senior Full-Stack Developer",
        role_id: "Pengembang Full-Stack Senior",
        bio_en:
          "I build products that are fast, accessible, and human-centric.",
        bio_id:
          "Saya membangun produk yang cepat, aksesibel, dan berpusat pada manusia.",
        tagline_en: "Building digital experiences that matter.",
        tagline_id: "Membangun pengalaman digital yang bermakna.",
        imageUrl: "/profile.png",
      },
    });
  }
  res.json(profile);
});

app.put("/api/profile", authenticate, async (req, res) => {
  const data = req.body;
  try {
    const profile = await prisma.profile.upsert({
      where: { id: "hero-profile" },
      update: data,
      create: { id: "hero-profile", ...data },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Projects ---
app.get("/api/projects", async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  res.json(projects);
});

app.post("/api/projects", authenticate, async (req, res) => {
  const data = req.body;
  if (data.order) data.order = parseInt(data.order);
  try {
    const project = await prisma.project.create({ data });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/projects/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (data.order) data.order = parseInt(data.order);
  try {
    const project = await prisma.project.update({ where: { id }, data });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/projects/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Blogs ---
app.get("/api/blogs", async (req, res) => {
  const { category, search } = req.query;
  const where = {};
  if (category && category !== "All") where.category = category;
  if (search) {
    where.OR = [
      { title_en: { contains: search } },
      { title_id: { contains: search } },
      { content_en: { contains: search } },
      { content_id: { contains: search } },
    ];
  }
  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { date: "desc" },
  });
  res.json(blogs);
});

app.get("/api/blogs/categories", async (req, res) => {
  const categories = await prisma.blog.groupBy({ by: ["category"] });
  res.json(["All", ...categories.map((c) => c.category)]);
});

app.get("/api/blogs/:slug", async (req, res) => {
  const { slug } = req.params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return res.status(404).json({ error: "Not found" });
  res.json(blog);
});

app.post("/api/blogs", authenticate, async (req, res) => {
  const data = req.body;
  try {
    const blog = await prisma.blog.create({
      data: { ...data, date: new Date() },
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/blogs/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const blog = await prisma.blog.update({ where: { id }, data });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/blogs/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Experiences ---
app.get("/api/experiences", async (req, res) => {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
  res.json(experiences);
});

app.post("/api/experiences", authenticate, async (req, res) => {
  const data = req.body;
  if (data.order) data.order = parseInt(data.order);
  try {
    const exp = await prisma.experience.create({ data });
    res.json(exp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/experiences/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (data.order) data.order = parseInt(data.order);
  try {
    const exp = await prisma.experience.update({ where: { id }, data });
    res.json(exp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/experiences/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.experience.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Gallery ---
app.get("/api/gallery", async (req, res) => {
  const gallery = await prisma.gallery.findMany({
    orderBy: { date: "desc" },
  });
  res.json(gallery);
});

app.post("/api/gallery", authenticate, async (req, res) => {
  const data = req.body;
  try {
    const item = await prisma.gallery.create({
      data: { ...data, date: data.date ? new Date(data.date) : new Date() },
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/gallery/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const item = await prisma.gallery.update({
      where: { id },
      data: { ...data, date: data.date ? new Date(data.date) : new Date() },
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/gallery/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.gallery.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Skills ---
app.get("/api/skills", async (req, res) => {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
  res.json(skills);
});

app.post("/api/skills", authenticate, async (req, res) => {
  const data = req.body;
  if (data.level) data.level = parseInt(data.level);
  if (data.order) data.order = parseInt(data.order);
  try {
    const skill = await prisma.skill.create({ data });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/skills/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (data.level) data.level = parseInt(data.level);
  if (data.order) data.order = parseInt(data.order);
  try {
    const skill = await prisma.skill.update({ where: { id }, data });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/skills/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.skill.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
