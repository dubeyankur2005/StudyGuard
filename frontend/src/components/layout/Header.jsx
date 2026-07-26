import "./Header.css";
import {
  BsList,
  BsSearch,
  BsBell,
  BsSun,
  BsCalendar3,
} from "react-icons/bs";

function Header() {
  return (
    <header className="header">

      <div className="header-left">

        <button className="menu-btn">
          <BsList />
        </button>

        <div className="search-box">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search videos, topics, channels..."
          />
        </div>

      </div>

      <div className="header-right">

        <button className="date-btn">
          <BsCalendar3 />
          <span>Today</span>
        </button>

        <button className="icon-btn">
          <BsBell />
        </button>

        <button className="icon-btn">
          <BsSun />
        </button>

        <div className="profile">

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />

          <div className="profile-info">
            <h5>Ankur Dubey</h5>
            <p>Student</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;