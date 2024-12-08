import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { Footer } from "./components/footer";
import { Launchpad } from "./components/launchpad";
import { Navbar } from "./layout/navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Toaster position="top-center" richColors />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <Footer />
              </>
            }
          />
          <Route path="/launchpad" element={<Launchpad />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
