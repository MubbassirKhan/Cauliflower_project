import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FileText, Database, Brain, Settings, BarChart3, Eye, CheckCircle2, Zap, Target } from "lucide-react";

export default function Documentation() {
  const sections = [
    { id: "intro", label: "🌱 Introduction", icon: FileText },
    { id: "dataset", label: "📊 Dataset", icon: Database },
    { id: "models", label: "🧠 Models", icon: Brain },
    { id: "pipeline", label: "🛠️ Pipeline", icon: Settings },
    { id: "metrics", label: "📈 Metrics", icon: BarChart3 },
    { id: "confusion", label: "🔍 Confusion Matrices", icon: Eye },
    { id: "conclusion", label: "✅ Conclusion", icon: CheckCircle2 },
  ];

  const [activeSection, setActiveSection] = useState("");

  // Detect current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
      });
      const visible = offsets.filter((o) => o && o.top <= window.innerHeight / 2);
      if (visible.length > 0) setActiveSection(visible[visible.length - 1].id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-lime-50/30 to-green-50/40 text-gray-800 font-sans overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl"></div>
      
      {/* ==== MAIN WRAPPER ==== */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative z-10">
        
        {/* ==== MAIN CONTENT ==== */}
        <div className="flex-1 px-6">
          
          {/* HERO SECTION */}
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20 px-6 py-16 md:py-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2">
                <FileText size={18} />
                Research Documentation
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-emerald-900 to-teal-800 bg-clip-text text-transparent">
                Smart Farming with AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                Project Documentation
              </span>
            </h1>
            
            <motion.p 
              className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              A comprehensive deep learning-based system for automated cauliflower disease identification 
              using multiple state-of-the-art CNN architectures. Explore our complete research methodology, 
              experiments, and breakthrough results achieving <strong className="text-green-700">98.91% accuracy</strong>.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">98.91%</div>
                <div className="text-sm text-gray-600">Best Accuracy</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">5</div>
                <div className="text-sm text-gray-600">CNN Models</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">1,600</div>
                <div className="text-sm text-gray-600">Images</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">8</div>
                <div className="text-sm text-gray-600">Disease Classes</div>
              </div>
            </motion.div>
          </motion.section>

          {/* INTRODUCTION */}
          <motion.section
            id="intro"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-6xl px-8 py-16 md:py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mb-16 border border-green-100"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl">
                <FileText className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">Introduction</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-xl mb-6 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-900 mb-3">Cauliflower Disease Detection Using Deep Learning</h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Cauliflower (<em>Brassica oleracea</em> var. <em>botrytis</em>) is a vital crop worldwide, but its yield is threatened by various diseases such as bacterial soft rot, black rot, downy mildew, and black spot. Traditional visual diagnosis is often subjective, time-consuming, and prone to error.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                Leveraging advances in artificial intelligence, this project presents a robust, automated system for cauliflower disease identification using state-of-the-art Convolutional Neural Networks (CNNs). Our approach enables scalable, accurate, and rapid plant health monitoring, supporting farmers and agricultural experts in making informed decisions.
              </p>
            </motion.div>
          </motion.section>

          {/* DATASET */}
          <motion.section
            id="dataset"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-6xl px-8 py-16 md:py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mb-16 border border-green-100"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Database className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">Dataset Collection & Preparation</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="mb-8 text-gray-700 text-lg leading-relaxed">
                Two comprehensive Kaggle datasets (<strong className="text-blue-700">Cauliflower Dataset</strong> & <strong className="text-blue-700">Dataset of Disease Cauliflower</strong>)
                were meticulously combined to create a balanced dataset of <strong className="text-green-700">1,600 high-quality images</strong> across 8 distinct disease categories. Each class contains exactly 200 images.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Settings size={20} />
                    Data Preprocessing
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Image resizing & normalization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Brightness & contrast correction
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Data augmentation (flips & rotations)
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-lime-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={20} />
                    Dataset Composition
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Target size={16} className="text-green-600" />
                      8 disease categories
                    </li>
                    <li className="flex items-center gap-2">
                      <Target size={16} className="text-green-600" />
                      200 images per class (balanced)
                    </li>
                    <li className="flex items-center gap-2">
                      <Target size={16} className="text-green-600" />
                      Multiple train-test ratios tested
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* MODELS */}
          <motion.section
            id="models"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-6xl px-8 py-16 md:py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mb-16 border border-green-100"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Brain className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">Deep Learning Models</h2>
            </motion.div>
            
            <motion.p 
              className="mb-8 text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Five state-of-the-art pre-trained CNN architectures were evaluated and fine-tuned for optimal performance:
            </motion.p>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {[
                { name: "ResNet50", color: "from-red-400 to-orange-500", accuracy: "98.75%" },
                { name: "InceptionV3", color: "from-blue-400 to-cyan-500", accuracy: "95.62%" },
                { name: "DenseNet169", color: "from-green-400 to-emerald-500", accuracy: "98.44%" },
                { name: "DenseNet201", color: "from-purple-400 to-pink-500", accuracy: "98.12%" },
                { name: "EfficientNetV2B0", color: "from-yellow-400 to-amber-500", accuracy: "98.91%" }
              ].map((model, index) => (
                <motion.div
                  key={model.name}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${model.color} mb-4`}>
                    <Brain className="text-white" size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Accuracy: <span className="font-bold text-green-700">{model.accuracy}</span></p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Each model was fine-tuned using transfer learning techniques. Advanced features like skip connections (ResNet), 
              dense connectivity (DenseNet), inception modules (InceptionV3), and compound scaling (EfficientNet) 
              significantly improved feature extraction capabilities for accurate disease pattern recognition.
            </motion.p>
          </motion.section>

          {/* PIPELINE */}
          <motion.section
            id="pipeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl px-6 py-12 md:py-16 bg-white/70 backdrop-blur-md rounded-xl shadow-sm mb-12"
          >
            <h2 className="text-2xl font-bold text-green-900 mb-4">🛠️ Project Pipeline</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Data Acquisition & Cleaning</li>
              <li>Data Augmentation & Balancing</li>
              <li>Multiple Train-Test Split Configurations</li>
              <li>Training & Fine-tuning CNN Models</li>
              <li>Evaluation with Accuracy, Precision, Recall, F1-Score</li>
              <li>Confusion Matrix & Class-wise Analysis</li>
              <li>Deployment for Practical Agricultural Diagnostics</li>
            </ol>
          </motion.section>

          {/* METRICS (ENHANCED TABLE) */}
          <motion.section
            id="metrics"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-7xl px-8 py-16 md:py-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl mb-16 border border-green-100"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <BarChart3 className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">Evaluation Metrics</h2>
            </motion.div>
            
            <motion.p 
              className="text-gray-700 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              The following table summarizes the performance of each model on the 80-20 train-test split. 
              Metrics include Accuracy, Precision, Recall, and F1-Score, highlighting the effectiveness of 
              each deep learning architecture for cauliflower disease classification.
            </motion.p>
            
            <motion.div 
              className="overflow-x-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-xl">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white">
                    <th className="p-6 text-xl font-bold">Model</th>
                    <th className="p-6 text-xl font-bold">Accuracy</th>
                    <th className="p-6 text-xl font-bold">Precision</th>
                    <th className="p-6 text-xl font-bold">Recall</th>
                    <th className="p-6 text-xl font-bold">F1-Score</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {[
                    { model: "ResNet50", accuracy: "98.75%", precision: "0.99", recall: "0.99", f1: "0.99", highlight: true },
                    { model: "InceptionV3", accuracy: "95.62%", precision: "0.95", recall: "0.95", f1: "0.95", highlight: false },
                    { model: "DenseNet169", accuracy: "98.44%", precision: "0.98", recall: "0.98", f1: "0.98", highlight: true },
                    { model: "DenseNet201", accuracy: "98.12%", precision: "0.98", recall: "0.98", f1: "0.98", highlight: true },
                    { model: "EfficientNetV2B0", accuracy: "98.91%", precision: "0.99", recall: "0.99", f1: "0.99", highlight: true }
                  ].map((row, index) => (
                    <motion.tr 
                      key={row.model}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 transition-all duration-300 ${
                        row.highlight ? 'bg-green-50/50' : ''
                      }`}
                    >
                      <td className="p-6 font-bold text-lg">{row.model}</td>
                      <td className="p-6 text-lg">
                        <span className={`font-bold ${row.highlight ? 'text-green-700' : 'text-gray-700'}`}>
                          {row.accuracy}
                        </span>
                      </td>
                      <td className="p-6 text-lg font-semibold text-gray-700">{row.precision}</td>
                      <td className="p-6 text-lg font-semibold text-gray-700">{row.recall}</td>
                      <td className="p-6 text-lg font-semibold text-gray-700">{row.f1}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>

          {/* CONFUSION MATRIX */}
          <motion.section
            id="confusion"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl px-6 py-12 md:py-16 bg-white/70 backdrop-blur-md rounded-xl shadow-sm mb-12"
          >
            <h2 className="text-2xl font-bold text-green-900 mb-4">🔍 Confusion Matrices</h2>
            <p className="text-gray-700 mb-6">Below are confusion matrices for different train-test split ratios.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img src="image (1).png" alt="Confusion Matrix 50-50" className="rounded-lg shadow hover:scale-105 transition duration-300" />
              <img src="image (2).png" alt="Confusion Matrix 60-40" className="rounded-lg shadow hover:scale-105 transition duration-300" />
              <img src="image.png" alt="Confusion Matrix 70-30" className="rounded-lg shadow hover:scale-105 transition duration-300" />
              <img src="image (1).png" alt="Confusion Matrix 80-20" className="rounded-lg shadow hover:scale-105 transition duration-300" />
            </div>
          </motion.section>

          {/* CONCLUSION */}
          <motion.section
            id="conclusion"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl px-6 py-12 md:py-16 bg-white/70 backdrop-blur-md rounded-xl shadow-sm mb-12"
          >
            <h2 className="text-2xl font-bold text-green-900 mb-4">✅ Conclusion</h2>
            <p className="text-gray-700">
              All five CNN models demonstrated outstanding performance, achieving over 95% accuracy on the 80-20 split. EfficientNetV2B0 achieved the highest accuracy (98.91%) and ResNet50 also performed exceptionally well (98.75%). The results confirm that deep learning, especially with advanced CNN architectures, provides a reliable and scalable solution for automated cauliflower disease detection. Minor misclassifications were observed for diseases with overlapping symptoms, but overall, the models proved highly effective for practical agricultural diagnostics.
            </p>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 mx-8 rounded-3xl overflow-hidden mb-12"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 text-center px-8 py-16 lg:px-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl font-extrabold text-white mb-6 lg:text-5xl">
                  Ready to Protect Your Crop?
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-green-100 leading-relaxed mb-10">
                  Experience the power of AI-driven agricultural diagnostics. Try AgroScan now or explore 
                  our comprehensive research to understand the science behind the breakthrough results.
                </p>
                
                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link
                    to="/diagnose"
                    className="group relative bg-lime-500 px-10 py-5 text-lg font-bold text-emerald-900 rounded-xl shadow-2xl hover:bg-lime-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <Zap size={24} className="group-hover:rotate-12 transition-transform" />
                    <span>Diagnose a Plant</span>
                    <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </Link>
                  <Link
                    to="/about"
                    className="group border-2 border-white px-10 py-5 text-lg font-bold text-white rounded-xl hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                  >
                    <FileText size={24} className="group-hover:scale-110 transition-transform" />
                    About the Project
                  </Link>
                </div>

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
                    <span className="text-sm font-medium">98.91% Accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-lime-400" />
                    <span className="text-sm font-medium">Instant Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-lime-400" />
                    <span className="text-sm font-medium">Research Backed</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* ==== ENHANCED RIGHT-SIDE TOC ==== */}
        <aside className="hidden xl:block w-72 sticky top-24 self-start h-max p-6 ml-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-green-100"
          >
            <h3 className="font-bold text-green-900 mb-6 text-lg flex items-center gap-2">
              <FileText size={20} />
              Table of Contents
            </h3>
            <ul className="space-y-4">
              {sections.map((s, index) => (
                <motion.li 
                  key={s.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                      activeSection === s.id 
                        ? "bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold shadow-lg transform scale-105" 
                        : "hover:bg-green-50 hover:text-green-700 text-gray-600"
                    }`}
                  >
                    <s.icon size={18} className={`transition-transform duration-300 ${
                      activeSection === s.id ? "text-white" : "text-green-600 group-hover:scale-110"
                    }`} />
                    <span className="text-sm font-medium">{s.label.replace(/^[🌱📊🧠🛠️📈🔍✅]\s/, '')}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 p-4 bg-gradient-to-br from-green-50 to-lime-50 rounded-xl border border-green-200"
            >
              <h4 className="font-bold text-green-900 mb-3 text-sm">Research Highlights</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Best Model:</span>
                  <span className="font-bold text-green-700">EfficientNetV2B0</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-bold text-green-700">98.91%</span>
                </div>
                <div className="flex justify-between">
                  <span>Dataset Size:</span>
                  <span className="font-bold text-green-700">1,600 images</span>
                </div>
                <div className="flex justify-between">
                  <span>Disease Classes:</span>
                  <span className="font-bold text-green-700">8 categories</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </aside>

      </div>
    </main>
  );
}
