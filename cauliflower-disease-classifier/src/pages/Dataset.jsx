import { motion } from "framer-motion";
import { Database, Download, Eye, BarChart3, Users, Shield } from "lucide-react";

// Import images
import alt1 from "../images/aphid2.jpg";
import alt2 from "../images/aphid3.jpg";
import bact3 from "../images/bact3.jpg";
import bact4 from "../images/bact4.jpg";
import black1 from "../images/blackrot.jpg";
import black2 from "../images/blackrot2.jpg";
import aphid2 from "../images/aphid2.jpg";
import aphid3 from "../images/aphid3.jpg";
import downy1 from "../images/downy1.jpg";
import club1 from "../images/club1.jpg";
import club2 from "../images/club2.jpg";
import ring1 from "../images/ring5.jpg";
import ring2 from "../images/ring2.jpg";
import ring3 from "../images/ring3.jpg";
import ring4 from "../images/ring4.jpg";

// Gallery mapping
const GALLERY = {
  "Alternaria Leaf Spot": [alt1, alt2],
  "Bacterial Spot Rot": [bact3, bact4],
  "Black Rot": [black1, black2],
  "Cabbage Aphid Colony": [aphid2, aphid3],
  "Downy Mildew": [downy1],
  "Club Root": [club1, club2],
  "Ring Spot": [ring1, ring2, ring3, ring4],
};

// Dataset statistics
const DATASET_STATS = {
  totalImages: 1600,
  classes: 8,
  imagesPerClass: 200,
  accuracy: "98.91%",
  models: 5,
  splits: "50-50, 60-40, 70-30, 80-20"
};

const KAGGLE_DATASET_URL = "https://www.kaggle.com/datasets/anshulmehtakaggl/cauliflower-disease-rgb-images";

export default function Dataset() {
  // Animation variants
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
      <main className="min-h-screen text-gray-800 overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-12 lg:py-28">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block mb-6"
                >
                  <span className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2">
                    <Database size={18} />
                    Comprehensive Disease Dataset
                  </span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text text-transparent">
                    Cauliflower Disease
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                    Dataset Gallery
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Explore our comprehensive dataset of <strong className="text-green-700">1,600 high-quality images</strong> across 8 disease categories, 
                  meticulously curated for training state-of-the-art deep learning models with proven accuracy.
                </p>
              </motion.div>

              {/* Statistics Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
              >
                {[
                  { label: "Total Images", value: DATASET_STATS.totalImages.toLocaleString(), icon: Eye, color: "from-blue-400 to-cyan-500" },
                  { label: "Disease Classes", value: DATASET_STATS.classes, icon: BarChart3, color: "from-green-400 to-emerald-500" },
                  { label: "Per Class", value: DATASET_STATS.imagesPerClass, icon: Users, color: "from-purple-400 to-pink-500" },
                  { label: "Best Accuracy", value: DATASET_STATS.accuracy, icon: Shield, color: "from-yellow-400 to-orange-500" },
                  { label: "CNN Models", value: DATASET_STATS.models, icon: Database, color: "from-red-400 to-pink-500" },
                  { label: "Train/Test Splits", value: "4", icon: BarChart3, color: "from-teal-400 to-green-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <stat.icon className="text-white" size={24} strokeWidth={2.5} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Class sections */}
          {Object.entries(GALLERY).map(([cls, imgs], ci) => (
            <section key={cls} className="mb-24 px-6 lg:px-12" id={cls.toLowerCase().replace(/\s+/g, '-')}>
              {/* Class title */}
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mb-10 inline-block text-2xl font-semibold text-green-700 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-green-600 after:to-lime-500"
              >
                {ci + 1}. {cls}
              </motion.h2>

              {/* Image grid */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15 } },
                }}
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {imgs.map((src, i) => (
                  <motion.figure
                    key={src}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="group relative overflow-hidden bg-white/20 shadow-lg backdrop-blur"
                  >
                    {/* outline frame */}
                    <div className="absolute inset-0 p-px bg-gradient-to-br from-green-500/80 to-lime-400/80"></div>

                    {/* image */}
                    <img
                      src={src}
                      alt={`${cls} sample ${i + 1}`}
                      className="relative z-10 h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* hover label */}
                    <figcaption className="absolute inset-0 z-20 flex items-center justify-center bg-green-900/0 text-white opacity-0 group-hover:bg-green-900/40 group-hover:opacity-100 transition">
                      <span className="text-sm font-medium">{cls}</span>
                    </figcaption>
                  </motion.figure>
                ))}
              </motion.div>
            </section>
          ))}

          {/* Enhanced CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 mx-6 lg:mx-12 rounded-3xl overflow-hidden mb-12"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl font-extrabold text-white mb-6 lg:text-5xl">
                  Access the Complete Dataset
                </h2>
                <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                  Download our comprehensive cauliflower disease dataset from Kaggle. Perfect for research, 
                  education, and developing your own AI models with <strong className="text-lime-400">1,600 curated images</strong>.
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <a
                    href={KAGGLE_DATASET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-lime-500 hover:bg-lime-400 px-10 py-5 text-lg font-bold text-emerald-900 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <Download size={24} className="group-hover:animate-bounce" />
                    <span>Download on Kaggle</span>
                    <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </a>

                  <div className="flex items-center gap-4 text-green-200">
                    <div className="flex items-center gap-2">
                      <Database size={20} className="text-lime-400" />
                      <span className="text-sm font-medium">1,600 Images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={20} className="text-lime-400" />
                      <span className="text-sm font-medium">8 Categories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-lime-400" />
                      <span className="text-sm font-medium">98.91% Accuracy</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </main>
      </div>
  );
}