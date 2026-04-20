import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { 
  Award, Code, Mail, MapPin, GraduationCap, Briefcase, Clock, Target, Brain 
} from "lucide-react";

// Text cycling for titles
const TITLES = [
  "Full‑Stack Developer",
  "Machine‑Learning Enthusiast", 
  "Open‑Source Contributor",
  "AgriTech Innovator",
];

export default function About() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTitleIdx((i) => (i + 1) % TITLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Personal stats
  const personalStats = [
    { label: "Experience", value: "3+ Years", icon: Briefcase },
    { label: "Projects", value: "15+", icon: Code },
    { label: "Education", value: "MCA", icon: GraduationCap },
    { label: "Location", value: "Karnataka", icon: MapPin },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.7, ease: "easeOut" },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-lime-50/30 to-green-50/40">
      <main className="min-h-screen overflow-x-hidden text-gray-800 font-[Inter]">
        {/* HERO */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center lg:px-12">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2">
                <Award size={18} />
                MCA Final Year Student
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-6xl font-extrabold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text text-transparent">
                Madhu Kalakeri
              </span>
              </motion.h1>

              <motion.p
                key={titleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-xl lg:text-2xl font-semibold mb-6"
              >
                <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                  {TITLES[titleIdx]}
                </span>
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                MCA Final‑Year student from <strong className="text-green-700">KLE Institute of Technology (Hubballi)</strong> & native of Savadatti, Belagavi — crafting CauliCare to help farmers diagnose cauliflower diseases instantly.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  to="/diagnose"
                  className="group relative bg-green-700 hover:bg-green-800 px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <Brain size={20} className="group-hover:animate-pulse" />
                  <span>Try the Classifier</span>
                </Link>
                <a
                  href="https://www.linkedin.com/in/madhu-kalakeri" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-green-700 px-8 py-4 text-lg font-semibold text-green-700 rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                >
                  <FaLinkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/your-github" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-green-700 px-8 py-4 text-lg font-semibold text-green-700 rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                >
                  <FaGithub size={20} />
                  GitHub
                </a>
              </motion.div>
            </div>
          </section>

          {/* TIMELINE & SKILLS grid */}
          <section className="mx-auto mt-20 max-w-6xl px-6 lg:grid lg:grid-cols-7 lg:gap-14 lg:px-12">
            {/* Timeline */}
            <div className="relative col-span-3 mb-16 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent">
                    Journey Snapshot
                  </span>
                </h2>
                <p className="text-gray-600 mb-8">Key milestones in my tech journey</p>
              </motion.div>

              <div className="relative mt-8 space-y-10 border-l-2 border-green-400 pl-6">
                {[
                  { y: "2021‑23", t: "MCA @ KLEIT", d: "Advanced CS, AI & web tech.", icon: GraduationCap },
                  { y: "2022", t: "Full‑Stack Intern", d: "MERN apps, REST APIs.", icon: Code },
                  { y: "2023", t: "ML Projects", d: "Image classification, NLP bots.", icon: Brain },
                  { y: "2024‑25", t: "CauliCare", d: "CV for disease detection.", icon: Target },
                ].map((item, i) => (
                  <motion.div
                    key={item.t}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i + 1}
                    className="group relative"
                  >
                    <div className="absolute -left-8 top-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                      <item.icon size={12} className="text-white" />
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-green-800">{item.t}</h3>
                        <span className="text-sm text-gray-500 font-medium bg-green-50 px-3 py-1 rounded-full">{item.y}</span>
                      </div>
                      <p className="text-gray-700">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills grid */}
            <div className="col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent">
                    Tech Stack
                  </span>
                </h2>
                <p className="text-gray-600 mb-8">Technologies I work with</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3"
              >
                {[
                  "React", "Vite", "Node.js", "Tailwind CSS", "FastAPI", 
                  "TensorFlow", "PyTorch", "Docker", "PostgreSQL"
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-6 transition-transform">
                      <Code className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{skill}</h3>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Enhanced CTA */}
          <section className="relative z-10 mt-24 px-6 py-20 lg:px-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 p-12 text-center text-white shadow-2xl overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
                  Let's grow something amazing together!
                </h2>
                <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Open to collaborations, internships & fresh ideas merging <strong className="text-lime-400">software and sustainability</strong>. 
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:madhu@example.com"
                    className="group relative bg-lime-500 hover:bg-lime-400 px-10 py-4 text-lg font-bold text-emerald-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <Mail size={20} className="group-hover:animate-bounce" />
                    <span>Reach Out</span>
                  </a>
                  <div className="flex items-center gap-4 text-green-200">
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-lime-400" />
                      <span className="text-sm font-medium">Quick Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
  );
}