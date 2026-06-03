import { useNavigate } from "react-router-dom";
import { WELCOMEWOMAN } from "../utils/image-constannts";

const WelcomeComponent = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="wellcome_screen">
      <div className="wellcome_screen_img">
        <img src={WELCOMEWOMAN} alt="welcome" />
      </div>

      <div className="wellcome_screen_content">
        <h5>
          Welcome {user?.first_name} {user?.last_name}
        </h5>

        <p>
          Welcome to Woliba! You’ll find wellness challenges, fitness and
          recipe videos, and daily tips to support your health goals.
          Download our iOS or Android app and start your wellbeing journey
          today.
        </p>

        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Let’s Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;  