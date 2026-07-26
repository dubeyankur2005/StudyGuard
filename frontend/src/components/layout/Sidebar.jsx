import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  BsGrid,
  BsClockHistory,
  BsBarChart,
  BsBullseye,
  BsGear,
} from "react-icons/bs";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

  <h2>StudyGuard</h2>

  <p>Stay Focused. Study Smart.</p>

</div>
      <nav className="nav-links">

        <NavLink
        to ="/"
        >
          <BsGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
        to ="/history"
        >
          <BsClockHistory />
          <span>History</span>
        </NavLink>

        <NavLink 
        to ="/analytics"
        >
          <BsBarChart />
          <span>Analytics</span>
        </NavLink>

        <NavLink
        to ="/studyMode"
        >
          <BsBullseye />
          <span>Study Mode</span>
        </NavLink>

        <NavLink 
        to = "/setting"
        >
          <BsGear />
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;