import "./HistoryTable.css";

import HistoryRow from "./HistoryRow";

const HistoryTable = ({ videos, onDelete }) => {

    return (

        <section className="history-table">

            <div className="table-header">

                <div>Video</div>

                <div>Category</div>

                <div>Watch Time</div>

                <div>Watched At</div>

                <div>Action</div>

            </div>

            <div className="table-body">

                {

                    videos.map((video) => (

                        <HistoryRow

                            key={video.id}

                            video={video}

                            onDelete={onDelete}

                        />

                    ))

                }

            </div>

        </section>

    );

};

export default HistoryTable;