import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutSession from "./WorkoutSession";
import SupplementGuide from "./articles/SupplementGuide";
import DailyRoutines from "./articles/DailyRoutines";
import ProtectedRoute from "./ProtectedRoute";
import AboutPage from "./AboutPage"; 
import ContactUs from "./ContactUs"; 
import NutritionPage from "./NutritionPage"; 
import MuscleGainPlan from "./MuscleGainPlan"; 
import FatLossPlan from "./FatLossPlan"; 
import BalancedPlan from "./BalancedPlan"; 

// ✅ Admin imports
import AdminRoute from "./admin/AdminRoute";
import AdminUsers from "./admin/AdminUsers";
import AdminMessages from "./admin/AdminMessages";
import AdminReports from "./admin/AdminReports";
import AdminChatLogs from "./admin/AdminChatLogs";
import AdminChatLogDetail from "./admin/AdminChatLogDetail";
import AdminWorkouts from "./admin/AdminWorkouts";   // ➕ NEW

// ✅ Debug import
import DebugClaims from "./DebugClaims";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/nutrition/muscle-gain" element={<MuscleGainPlan />} />
        <Route path="/nutrition/fat-loss" element={<FatLossPlan />} />
        <Route path="/nutrition/balanced" element={<BalancedPlan />} />

        {/* Articles */}
        <Route path="/articles/supplements" element={<SupplementGuide />} />
        <Route path="/articles/daily-routines" element={<DailyRoutines />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout/:title"
          element={
            <ProtectedRoute>
              <WorkoutDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session"
          element={
            <ProtectedRoute>
              <WorkoutSession />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin routes */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <AdminReports />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/chatlogs"
          element={
            <AdminRoute>
              <AdminChatLogs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/chatlogs/:id"
          element={
            <AdminRoute>
              <AdminChatLogDetail />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/workouts"
          element={
            <AdminRoute>
              <AdminWorkouts />
            </AdminRoute>
          }
        />

        {/* ✅ Debug route */}
        <Route path="/debug" element={<DebugClaims />} />

        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;







