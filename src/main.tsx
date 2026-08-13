import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/auth";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Drivers from "./pages/admin/Drivers";
import DriverDetails from "./pages/admin/DriverDetails";
import Jobs from "./pages/admin/Jobs";
import Trucks from "./pages/admin/Trucks";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import DriverDashboard from "./pages/driver/DriverDashboard";
import MyJobs from "./pages/driver/MyJobs";
import Profile from "./pages/driver/Profile";
import AddJob from "./pages/driver/AddJob";
import Registration from "./pages/driver/Registration";
import JobDetails from "./pages/shared/JobDetails";

function App(){
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Registration/>}/>

    <Route path="/admin" element={<ProtectedRoute role="admin"><Layout/></ProtectedRoute>}>
      <Route index element={<Dashboard/>}/>
      <Route path="drivers" element={<Drivers/>}/>
      <Route path="drivers/:id" element={<DriverDetails/>}/>
      <Route path="jobs" element={<Jobs/>}/>
      <Route path="jobs/:id" element={<JobDetails/>}/>
      <Route path="trucks" element={<Trucks/>}/>
      <Route path="reports" element={<Reports/>}/>
      <Route path="settings" element={<Settings/>}/>
    </Route>

    <Route path="/driver" element={<ProtectedRoute role="driver"><Layout/></ProtectedRoute>}>
      <Route index element={<DriverDashboard/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="jobs" element={<MyJobs/>}/>
      <Route path="jobs/:id" element={<JobDetails/>}/>
      <Route path="add-job" element={<AddJob/>}/>
    </Route>

    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
