import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { WELCOMEWOMAN } from "../utils/image-constannts";

const WelcomeComponent = () => {
  
  const navigate = useNavigate();

  

  return (
    <div className="wellcome_screen">

      <div className="wellcome_screen_img">
        <img src={WELCOMEWOMAN} alt="welcome" />
      </div>

      <div className="wellcome_screen_content">
        <h5>Welcome</h5>

        <p>
          Welcome to Woliba! You’ll find wellness challenges, fitness and recipe videos,
          and daily tips to support your health goals. Download our iOS or Android app
          and start your wellbeing journey today.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("welcome"); // optional cleanup
            navigate("/");
          }}
        >
          Let’s get Started
        </button>
      </div>

    </div>
  );
};

export default WelcomeComponent;