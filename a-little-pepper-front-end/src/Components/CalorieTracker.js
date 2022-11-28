import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function CalorieTracker() {
    const [recipes, setRecipes] = useState([]);
    const [totCal, setTotCal] = useState(2000);

    let calSum = 0;
    let calArr = recipes.map((recipe) => Number(recipe.cal))
    calArr.forEach(amount => {
      calSum += amount;
      return calSum;
    })

    const calorieBar = [
        { bgcolor: "#6a1b9a", completed: Math.round(calSum / totCal * 100) },
      ];

    return (
        <form>
            {calorieBar.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}
        </form>

    )

}