import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Wifi, Target, Box, Heart } from "lucide-react";

/* ─────────────────────────────────────────────
   Home Page – AgroScan (Professional & Animated)
   -------------------------------------------------------- */

export default function Home() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-lime-50/30 to-green-50/40 text-gray-800 font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative flex flex-col-reverse items-center justify-center gap-12 px-6 py-16 md:flex-row md:gap-16 lg:px-16 lg:py-24">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl -z-10"></div>

        {/* Text Content */}
        <motion.div 
          className="w-full max-w-3xl text-center md:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
              AI-Powered Agricultural Intelligence
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text text-transparent">
              Detect Cauliflower
            </span>
            <br />
            <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
              Diseases in Seconds
            </span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-700 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            AgroScan leverages cutting-edge deep learning and computer vision to diagnose
            cauliflower diseases with <strong className="text-green-700">98%+ accuracy</strong>. 
            Protect your crops with instant, AI-powered analysis—right from your browser.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/diagnose"
              className="group relative bg-gradient-to-r from-emerald-900 to-teal-800 px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={20} className="group-hover:rotate-12 transition-transform" />
                Diagnose Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/docs"
              className="group border-2 border-emerald-900 px-8 py-4 font-semibold text-emerald-900 rounded-lg hover:bg-emerald-900 hover:text-white transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              <Box size={20} className="group-hover:rotate-12 transition-transform" />
              Read the Docs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-12 flex flex-wrap gap-8 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-green-800">98.91%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-green-800">&lt;1s</div>
              <div className="text-sm text-gray-600">Detection Time</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-green-800">8</div>
              <div className="text-sm text-gray-600">Disease Classes</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 to-green-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <img
              src="https://images.squarespace-cdn.com/content/v1/6259bb43f3195c0bc9020dc3/66cfd6e2-54ee-4d17-bc95-01897db41a12/11.jpg"
              alt="Healthy cauliflower plant"
              className="relative shadow-2xl w-full rounded-2xl transition duration-500 ease-in-out hover:scale-105 hover:shadow-3xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg px-6 py-4 hidden sm:block">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={24} />
                <div>
                  <div className="text-sm font-semibold text-gray-800">AI Verified</div>
                  <div className="text-xs text-gray-600">Healthy Plant</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text sm:text-5xl">
            Why Choose AgroScan?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Advanced AI technology designed for farmers, researchers, and agronomists 
            to maximize yield and minimize crop loss.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Real-time Results",
              desc: "Get disease predictions in under a second on modern devices—no uploads required, all processing happens in your browser.",
              icon: Zap,
              color: "from-yellow-400 to-orange-500",
              delay: 0.1
            },
            {
              title: "Offline Support",
              desc: "Works even without internet after the first load—perfect for remote field diagnostics and rural areas.",
              icon: Wifi,
              color: "from-blue-400 to-cyan-500",
              delay: 0.2
            },
            {
              title: "High Accuracy",
              desc: "Trained on 1,600+ annotated images with 98.91% accuracy using EfficientNetV2B0 deep learning architecture.",
              icon: Target,
              color: "from-green-400 to-emerald-500",
              delay: 0.3
            },
            {
              title: "Easy Integration",
              desc: "REST API and on-device model downloads available for seamless integration into your custom applications.",
              icon: Box,
              color: "from-purple-400 to-pink-500",
              delay: 0.4
            },
            {
              title: "Open Dataset",
              desc: "Dataset and complete training code are publicly available for transparency, research, and model improvement.",
              icon: CheckCircle2,
              color: "from-teal-400 to-green-500",
              delay: 0.5
            },
            {
              title: "Free & Open Source",
              desc: "MIT-licensed project—contribute, customize, or deploy it in your own agricultural workflow at no cost.",
              icon: Heart,
              color: "from-red-400 to-pink-500",
              delay: 0.6
            },
          ].map((feat) => (
            <motion.div
              key={feat.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ delay: feat.delay, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-start border border-gray-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`relative mb-5 p-3 rounded-xl bg-gradient-to-br ${feat.color} shadow-lg`}>
                <feat.icon className="text-white" size={28} strokeWidth={2.5} />
              </div>
              
              {/* Content */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-3">
                {feat.title}
              </h3>
              <p className="relative text-gray-600 leading-relaxed">
                {feat.desc}
              </p>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feat.color} opacity-10 rounded-bl-full`}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 px-6 py-20 text-center lg:px-8 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to Protect Your Crop?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100 leading-relaxed">
            Join thousands of farmers and agronomists using AgroScan to detect diseases early,
            prevent crop loss, and maximize yield with AI-powered precision.
          </p>
          
          <motion.div 
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/diagnose"
              className="group relative bg-lime-500 px-10 py-5 text-lg font-bold text-emerald-900 rounded-xl shadow-2xl hover:bg-lime-400 transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={22} className="group-hover:rotate-12 transition-transform" />
                Diagnose a Plant Now
              </span>
              <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/about"
              className="group border-2 border-white px-10 py-5 text-lg font-bold text-white rounded-xl hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              <Heart size={22} className="group-hover:scale-110 transition-transform" />
              About the Project
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-green-200"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-lime-400" />
              <span className="text-sm font-medium">No Installation Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-lime-400" />
              <span className="text-sm font-medium">100% Free to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-lime-400" />
              <span className="text-sm font-medium">Privacy Protected</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
