import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { RootLayout } from '@/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { Launchpad } from '@/pages/LaunchpadPage';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/launchpad" element={<Launchpad />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;