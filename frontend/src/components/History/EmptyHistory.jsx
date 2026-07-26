import "./EmptyHistory.css";

import { BsCollectionPlay } from "react-icons/bs";

const EmptyHistory = () => {

  return (

    <section className="empty-history">

      <div className="empty-icon">

        <BsCollectionPlay />

      </div>

      <h2>

        No Videos Found

      </h2>

      <p>

        Your watched YouTube videos will appear here.

      </p>

    </section>

  );

};

export default EmptyHistory;