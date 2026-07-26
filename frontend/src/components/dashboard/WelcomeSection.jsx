import "./WelcomeSection.css";

const WelcomeSection = () => {

    return (

        <section className="welcome-section">

            <div className="welcome-content">

                <h1 className="welcome-title">

                    <span className="welcome-white">

                        Welcome back, {" "}  

                    </span>

                    

                    <span className="welcome-name">

                        {"  "}  Ankur Dubey

                    </span>

                    

                  
                </h1>

                <p className="welcome-description">

                    <span className="text-gray">

                        Stay focused.

                    </span>

                    <span className="text-accent">

                        {" "}Track every study session.

                    </span>

                    <span className="text-gray">

                        {" "}Build consistent learning habits and achieve your learning goals with StudyGuard.

                    </span>

                </p>

            </div>

        </section>

    );

};

export default WelcomeSection;