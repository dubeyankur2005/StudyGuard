import "./HistorySkeleton.css";

const HistorySkeleton = () => {

  return (

    <section className="history-skeleton">

      {

        Array.from({ length: 6 }).map((_, index) => (

          <div
            className="skeleton-row"
            key={index}
          >

            <div className="skeleton-thumbnail"></div>

            <div className="skeleton-content">

              <div className="skeleton-title"></div>

              <div className="skeleton-subtitle"></div>

            </div>

          </div>

        ))

      }

    </section>

  );

};

export default HistorySkeleton;