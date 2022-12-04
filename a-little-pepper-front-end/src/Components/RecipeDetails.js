import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Col, Card } from "react-bootstrap"
import { UserAuth } from "../Context/AuthContext";
import axios from "axios";


const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function RecipeDetails() {
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [directions, setDirections] = useState('');
  const [price, setPrice] = useState([])

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
    setProfile({ ["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"]: 10 })
  };

  const handleTrack = () => {
    setProfile({ ["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"]: 10 })
    console.log(profile)
  };
  // const navigate = useNavigate();
  useEffect(() => {
    // axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`)

    axios
      .get(
        `${ACCESS_POINT}/${id}/nutritionWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setNutrition(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${ACCESS_POINT}/${id}/ingredientWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setIngredients(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${ACCESS_POINT}/${id}/analyzedInstructions?apiKey=${API_KEY}`
      )
      .then((res) => {setInstructions(res.data)
      setDirections(res.data[0].steps[0].step)
      })
      .catch((error) => console.error(error));

      axios
      .get(
        `${ACCESS_POINT}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setPrice(res.data))
      .catch((error) => console.error(error));

  }, []);

  let ingredient = ingredients.ingredients;

  console.log(price);

  return (
    <article className="RecipeDetails">
      <h6>Recipe ID:{id}</h6>
      <br></br>
      <h1>Nutritional Information</h1>
      <br></br>
      <br></br>
      <span>
        <h3>{nutrition.calories}ilo calories</h3>
        <h6>*Note: 1000kilo calories = 1 calorie</h6>
        <h3>Fat: {nutrition.fat}</h3>
        <h3>Carbohydrates: {nutrition.carbs}</h3>
        <h3>Protein: {nutrition.protein}</h3>
      </span>
      <br></br>
      <br></br>
      <h1>Ingredients</h1>
      <article>
        {ingredient && ingredient.map(item => {
          return (
            <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
              <Card.Title>{item.amount.us.value} {item.amount.us.unit}  of {item.name} </Card.Title>
            </Card>
          )
        } )}
      </article>
      <br></br>
      <br></br>
        <h1>Instructions</h1>
      <article>
      <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
              <Card.Title>{directions}</Card.Title>
            </Card>
      </article>
      <br></br>
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
