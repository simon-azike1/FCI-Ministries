import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Ministries from './pages/Ministries';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Give from './pages/Give';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import ManageEvents from './pages/admin/ManageEvents';
import ManageSermons from './pages/admin/ManageSermons';
import ManageMinistries from './pages/admin/ManageMinistries';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <DarkModeProvider>
      <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="sermons" element={<ManageSermons />} />
          <Route path="ministries" element={<ManageMinistries />} />
        </Route>

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="app">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ministries" element={<Ministries />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/give" element={<Give />} />
                  <Route path="/get-involved" element={<GetInvolved />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/resources" element={<Resources />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          }
        />
      </Routes>
    </Router>
    </DarkModeProvider>
  );
}

export default App;
