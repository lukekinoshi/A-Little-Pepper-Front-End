import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import { UserAuth } from "../Context/AuthContext";
import axios from "axios";

const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API = process.env.REACT_APP_API_URL;

export default function RecipeDetails() {
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [directions, setDirections] = useState("");
  const [prices, setPrices] = useState([]);

  let { id } = useParams();
  const { user } = UserAuth();
  const [profile, setProfile] = useState([]);

  const handleBookmark = () => {
    let savedRecipes = []
    if(profile.recipes.length < 1){
      savedRecipes = [id]
    } else {
      savedRecipes = [...profile.recipes, id]
    }
    axios
      .put(`${API}/profiles/${user.uid}`, {
        uid: user.uid,
        name: user.displayName,
        cal: profile.cal,
        fat: profile.fat,
        carb: profile.carb,
        protein: profile.protein,
        recipes: savedRecipes,
      })
      .then(() => {
        console.log("update sent");
      });
  };

  const handleTrack = () => {
    let newCal = profile.cal + nutrition.calories
    let newFat = profile.fat + nutrition.fat
    let newCarb = profile.carb + nutrition.carbs
    let newProtein = profile.protein + nutrition.protein
    console.log(newCal)
    console.log(newFat)
    console.log(newCarb)
    console.log(newProtein)

    axios
    .put(`${API}/profiles/${user.uid}`, {
      uid: user.uid,
      name: user.displayName,
      cal: 50,
      fat: 10,
      carb: 5,
      protein: 15,
      recipes: profile.recipes,
    })
    .then(() => {
      console.log("update sent");
    });
  };

  useEffect(() => {
    axios.get(`${API}/profiles/${user.uid}`).then((response) => {
      setProfile(response.data);
    });
  }, [profile]);

  // const navigate = useNavigate();
  useEffect(() => {
    // axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`)

    axios
      .get(`${ACCESS_POINT}/${id}/nutritionWidget.json?apiKey=${API_KEY}`)
      .then((res) => setNutrition(res.data))
      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/ingredientWidget.json?apiKey=${API_KEY}`)
      .then((res) => setIngredients(res.data))
      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/analyzedInstructions?apiKey=${API_KEY}`)
      .then((res) => {
        setInstructions(res.data);
        setDirections(res.data[0].steps[0].step);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`)
      .then((res) => setPrices(res.data.ingredients))
      .catch((error) => console.error(error));
  }, []);

  let ingredient = ingredients.ingredients;
  let price = prices;

  let priceSum = 0;
  let priceArr = price.map((item) => Number(item.price));
  priceArr.forEach((amount) => {
    priceSum += amount;
    return priceSum;
  });
  return (
    <article className="RecipeDetails">
      <h6>Recipe ID:{id}</h6>
      <h6>User:{profile.name}</h6>
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
        {ingredient &&
          ingredient.map((item) => {
            return (
              <Card
                bg="warning"
                variant="light"
                style={{ alignItems: "center" }}
              >
                <Card.Title>
                  {item.amount.us.value} {item.amount.us.unit} of {item.name}{" "}
                </Card.Title>
              </Card>
            );
          })}
      </article>
      <br></br>
      <br></br>
      <h1>Ingredients Price Breakdown</h1>
      <article>
        {price &&
          price.map((item) => {
            return (
              <Card
                bg="warning"
                variant="light"
                style={{ alignItems: "center" }}
              >
                <Card.Title>
                  {item.name} : ${Math.round(10 * item.price) / 100}{" "}
                </Card.Title>
              </Card>
            );
          })}
        <h2>Total Cost: ${Math.round(10 * priceSum) / 100}</h2>
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
