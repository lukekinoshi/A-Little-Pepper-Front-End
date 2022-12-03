import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function CalorieTracker() {
  const [recipes, setRecipes] = useState([]);
  const [totCal, setTotCal] = useState(2000);

  let calSum = 0;
  let calArr = recipes.map((recipe) => Number(recipe.cal));
  calArr.forEach((amount) => {
    calSum += amount;
    return calSum;
  });

  const calorieBar = [
    { bgcolor: "#6a1b9a", completed: Math.round((calSum / totCal) * 100) },
  ];

  return (
    <div>
      {/* <form>
        {calorieBar.map((item, idx) => (
          <ProgressBar
            key={idx}
            bgcolor={item.bgcolor}
            completed={item.completed}
          />
        ))}
      </form> */}
      
        <div>
            <h2>Tracker</h2>
          <ProgressBar striped animated variant="success" now={40} label={`40%`}/>
          <ProgressBar striped animated variant="info" now={20} label={`20%`}/>
          <ProgressBar striped animated variant="warning" now={60} label={`60%`}/>
          <ProgressBar striped animated variant="danger" now={80} label={`80%`}/>

        </div>
    </div>
  );
}
