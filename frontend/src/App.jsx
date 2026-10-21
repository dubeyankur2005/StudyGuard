import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Analytics from "./pages/Analytic";
import History from "./pages/History";
import Setting from "./pages/Setting";
import Dashboard from "./pages/Dashboard";
import StudyMode from "./pages/StudyMode";
import { AuthPage, ProtectedRoute } from "./auth/AuthPages";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage register />} />
        <Route path="*" element={<ProtectedRoute><MainLayout><Routes>
          
          <Route path ="/" element={<Dashboard />} />
          <Route path="/analytics" element ={<Analytics />} />
          <Route path="/history" element ={<History/>} />
          <Route path="/setting" element={<Setting />}/>

          <Route path ="/StudyMode"
          element ={<StudyMode />} />

        </Routes></MainLayout></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
