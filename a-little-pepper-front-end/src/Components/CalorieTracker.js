import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function CalorieTracker({profile, totCal, setTotCal, totFat, setTotFat, totCarb, setTotCarb, totProtein, setTotProtein }) {

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("Average");
  const [showPopup, setShowPopup] = useState(false);

  let calSum = 0;
  let calArr = recipes.map((recipe) => Number(recipe.cal));
  calArr.forEach((amount) => {
    calSum += amount;
    return calSum;
  });

useEffect(() => {
  // handleDiet()
}, [diet] )


  const handleDiet = (e) => {
    setDiet(e.target.value)
    console.log(diet)
    if(diet === "Average"){
      setTotCal(2000);
      setTotFat(55.56);
      setTotCarb(275);
      setTotProtein(125);
    } else if(diet === "Athlete"){
      setTotCal(3000);
      setTotFat(83.33);
      setTotCarb(337);
      setTotProtein(225);
    } else if(diet === "Weight-Loss"){
      setTotCal(1500);
      setTotFat(25);
      setTotCarb(187.5);
      setTotProtein(131.25);
    } else if(diet === "Keto"){
      setTotCal(2000);
      setTotFat(155.56);
      setTotCarb(25);
      setTotProtein(125);
  }
}

const handleMouseEnter = () => {
  setShowPopup(true);
}
const handleMouseLeave = () => {
  setShowPopup(false);
}

  return (
    <div>
      <div>
        <h2>Tracker</h2>
        <Row className="justify-content-center g-2">
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="success"
            now={profile.cal / totCal * 100}
            label={`Calories`}
          />

          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="info"
            now={profile.fat / totFat * 100}
            label={`Fat`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="warning"
            now={profile.carb / totCarb * 100}
            label={`Carbs`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="danger"
            now={profile.protein / totProtein * 100 }
            label={`Protein`}
          />
        </Row>
       
        <div
        className="mt-4 d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button variant="light" onClick={handleDiet} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} value={"Average"}>
          Average
          <br></br>
          {/* {showPopup && <h6>This is the default diet that most individuals follow with a balanced ratio of carbohydrates, fats, and protein. This is typically used when a person does not have any specific goals in mind as this is a perfect diet to maintain weight. This assumes that the individual spends the reccomended 30 mminutes of daily activies.</h6>} */}
        </Button>
        <Button variant="light" onClick={handleDiet} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} value={"Athlete"}>
          Athlete
          <br></br>
          {/* {showPopup && <h6>An athlete diet is for individuals who are active exercising, this includes any type of dynamic movments or muscle-building. The main focus of this diet is high protein consumption to ensure healthy muscle building and enough carbohydrates to maintain energy for these activities. </h6>} */}
        </Button>
        <Button variant="light" onClick={handleDiet} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} value={"Weight-Loss"}>
          Weight-Loss
          <br></br>
          {/* {showPopup && <h6>This diet is gears toward individuals are looking to lose some belly fat. This assumes the individual is meeting the daily reccomended 30 minutes of activies, if not more to ensure burning more calories than you consume. </h6>} */}
        </Button>
        <Button variant="light" onClick={handleDiet} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} value={"Keto"}>
          Keto
          <br></br>
          {/* {showPopup && <h6></h6>} */}
        </Button>
      </div>
      </div>
    </div>
  );
}
