import Header from "./Header";
import Sidebar from "./Sidebar";

import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="page-content">
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;