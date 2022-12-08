import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function CalorieTracker({profile}) {

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("regular");
  const [totCal, setTotCal] = useState(2000);
  const [totFat, setTotFat] = useState(55.56);
  const [totCarb, setTotCarb] = useState(250);
  const [totProtein, setTotProtein] = useState(125);


  let calSum = 0;
  let calArr = recipes.map((recipe) => Number(recipe.cal));
  calArr.forEach((amount) => {
    calSum += amount;
    return calSum;
  });

  const handleDiet = (e) => {
    setDiet(e.target.value)

    if(diet === "Average"){
      setTotCal(2000);
      setTotFat(22.26);
      setTotCarb(250);
      setTotProtein(125);
    }


  }

  return (
    <div>
      <div>
        <h2>Tracker</h2>
        <Row className="justify-content-center g-2">
          <ProgressBar
            style={{ width: "51%"}}
            striped
            animated
            variant="success"
            now={profile.cal / 2000 * 100}
            label={`Calories`}
          />

          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="info"
            now={profile.fat / 55.56 * 100}
            label={`Fat`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="warning"
            now={profile.carb / 250 * 100}
            label={`Carbs`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="danger"
            now={profile.protein / 125 * 100 }
            label={`Protein`}
          />
        </Row>
       
        <div
        className="mt-4 d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button variant="outline-dark" onClick={handleDiet} value={"Average"}>
          Average
        </Button>
        <Button variant="outline-dark" onClick={handleDiet} value={"Athlete"}>
          Athlete
        </Button>
        <Button variant="outline-dark" onClick={handleDiet} value={"Weight-Loss"}>
          Weight-Loss
        </Button>
      </div>
      </div>
    </div>
  );
}
