import { useState } from "react";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateAccount from "./features/auth/CreateAccount";
import DashLayout from "./features/dash/DashLayout";
import DashHome from "./features/dash/DashHome";
import DashSettings from "./features/dash/DashSettings";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import NewJob from "./features/jobs/NewJob";
import JobsHome from "./features/jobs/JobsHome.jsx";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<CreateAccount />} />
      </Route>

      {/* private routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dash" element={<DashLayout />}>
            <Route index element={<DashHome />} />
            <Route path="settings" element={<DashSettings />} />
          </Route>
          <Route path="/jobs" element={<DashLayout />}>
            <Route index element={<JobsHome />} />
            <Route path="new-job" element={<NewJob />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
