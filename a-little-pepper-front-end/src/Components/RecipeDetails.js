import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserAuth } from "../Context/AuthContext";
import axios from "axios";

export default function RecipeDetails() {
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  let { id } = useParams();
  const { user } = UserAuth();
  const [profile, setProfile] = useState({
    uid: "",
    cal: "",
    fat: "",
    carb: "",
    protein: "",
    recipes: [],
  })

  const handleBookmark = () => {
    setProfile({["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"] : 10 })
  };

  const handleTrack = () => {
    setProfile({["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"] : 10 })
    console.log(profile)
  };
  // const navigate = useNavigate();
  useEffect(() => {
    // axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`)
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=9ab6abef58ff4088ab12f31009f1a8a9`
      )
      .then((res) => setInstructions(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=9ab6abef58ff4088ab12f31009f1a8a9`
      )
      .then((res) => setNutrition(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=9ab6abef58ff4088ab12f31009f1a8a9`
      )
      .then((res) => setIngredients(res.data))
      .catch((error) => console.error(error));
  }, []);

  // console.log(nutrition);
  // console.log(ingredients);
  // console.log(instructions[0]);

  return (
    <article className="RecipeDetails">
      <h1>{id}</h1>
      <h1>{nutrition.calories}ilo calories</h1>
      <h6>*Note: 1000kilo calories = 1 calorie</h6>
      <h1>Fat: {nutrition.fat}</h1>
      <h1>Carbohydrates: {nutrition.carbs}</h1>
      <h1>Protein: {nutrition.protein}</h1>

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button variant="light" onClick={handleTrack}>
          Track
        </Button>
        <Button variant="light" onClick={handleBookmark}>
          Bookmark
        </Button>
      </div>
    </article>
  );
}
