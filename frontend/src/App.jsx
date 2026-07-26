import {  Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Analytics from "./pages/Analytic";
import History from "./pages/History";
import Setting from "./pages/Setting";
import Dashboard from "./pages/Dashboard";
import StudyMode from "./pages/StudyMode";


const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          
          <Route path ="/" element={<Dashboard />} />
          <Route path="/analytics" element ={<Analytics />} />
          <Route path="/history" element ={<History/>} />
          <Route path="/setting" element={<Setting />}/>

          <Route path ="/StudyMode"
          element ={<StudyMode />} />

        </Routes >

      </MainLayout>
    </>
  );
};

export default App;