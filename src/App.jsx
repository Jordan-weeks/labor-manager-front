import { useState } from "react";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateAccount from "./pages/CreateAccount";
import DashLayout from "./features/dash/DashLayout";
import DashHome from "./features/dash/DashHome";
import DashSettings from "./features/dash/DashSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<CreateAccount />} />
      </Route>
      <Route path="/dash" element={<DashLayout />}>
        <Route index element={<DashHome />} />
        <Route path="settings" element={<DashSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
