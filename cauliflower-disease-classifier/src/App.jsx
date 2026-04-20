import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import About from "./pages/AboutUs";
import Docs from "./pages/Doc";
import Dataset from "./pages/Dataset";
import MoreModels from "./pages/MoreModels"; // ✅ Import
import ModelPredictPage from "./pages/ModelPredictPage"; // ✅ Import for model prediction page

function App() {
  return (
    <>
      <NavBar />

      {/* Top padding keeps content below fixed navbar */}
      <main className="pt-16">
        {/* ✅ Scroll reset */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/more-models" element={<MoreModels />} /> {/* ✅ Moved inside */}
          <Route path="/predict" element={<ModelPredictPage />} /> {/* ✅ Model prediction page */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
