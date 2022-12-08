import { useParams } from "react-router-dom";
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
  const [prices, setPrices] = useState([]);
  const [calorie, setCalorie] = useState('')

  let { id } = useParams();
  const { user } = UserAuth();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(`${ACCESS_POINT}/${id}/nutritionWidget.json?apiKey=${API_KEY}`)
      .then((res) => {
        setNutrition(res.data)
        setCalorie(res.data.calories)
      })

      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/ingredientWidget.json?apiKey=${API_KEY}`)
      .then((res) => setIngredients(res.data))
      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/analyzedInstructions?apiKey=${API_KEY}`)
      .then((res) => {
        setInstructions(res.data[0].steps);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${ACCESS_POINT}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`)
      .then((res) => setPrices(res.data.ingredients))
      .catch((error) => console.error(error));

  }, [id]);


  const handleBookmark = () => {
    if (profile.recipes.includes(id)) {
      alert("Already Bookmarked!")
      return
    }
    let savedRecipes = []
    if (profile.recipes.length < 1) {
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

  const makeNum = (str) => {
    return str.replace(/\D/g, '') * 1;
  }

  const handleTrack = () => {

    let newCal = profile.cal + makeNum(nutrition.calories);
    let newFat = profile.fat + makeNum(nutrition.fat);
    let newCarb = profile.carb + makeNum(nutrition.carbs);
    let newProtein = profile.protein + makeNum(nutrition.protein);

    console.log(newCal)
    console.log(newFat)
    console.log(newCarb)
    console.log(newProtein)

    axios
      .put(`${API}/profiles/${user.uid}`, {
        uid: user.uid,
        name: user.displayName,
        cal: newCal,
        fat: newFat,
        carb: newCarb,
        protein: newProtein,
        recipes: profile.recipes,
      })
      .then(() => {
        console.log("update sent");
      });
  };

  useEffect(() => {
    if (user) {
      axios.get(`${API}/profiles/${user.uid}`).then((response) => {
        setProfile(response.data);
      });
    }
  }, [user]);

  let ingredient = ingredients.ingredients;
  let price = prices;
  // let calorie = makeNum(nutrition.calories);

  let priceSum = 0;
  let priceArr = price.map((item) => Number(item.price));
  priceArr.forEach((amount) => {
    priceSum += amount;
    return priceSum;
  });

  console.log(calorie)

  return (
    <article className="RecipeDetails">
      <h6>User:{profile.name}</h6>
      <h1>Nutritional Information</h1>
      <br></br>
      <br></br>
      <span>
        <h3>Calorie: {makeNum(calorie)} calories</h3>
        <h6>*Note:
          To ease calculations, energy is expressed in 1000-calorie units known as kilocalories. That is, 1 Calorie is equivalent to 1 kilocalorie; the capital C in Calories denotes kcal on food labels, calories and kilocalories are used interchangeably to mean the same thing. For example: 1kcal = 1 calorie. </h6>
        <h3>Fat: {(nutrition.fat)}</h3>
        <h3>Carbohydrates: {(nutrition.carbs)}</h3>
        <h3>Protein: {(nutrition.protein)}</h3>
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
                  {item.amount.us.value} {item.amount.us.unit} {item.name} : ${Math.round(10 * item.price) / 1000}{" "}
                </Card.Title>
              </Card>
            );
          })}
        <h2>Total Cost: ${Math.round(10 * priceSum) / 1000}</h2>
        <h6>per serving</h6>
      </article>
      <br></br>
      <br></br>
      <h1>Instructions</h1>
      <article>
        {instructions && instructions.map((instruction) => {
          return (
            <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
              <Card.Title>Step {instruction.number}: {instruction.step}</Card.Title>
            </Card>
          )
        })}
      </article>
      <br></br>
      {profile.id ? (<div
        className="d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button variant="light" onClick={handleTrack}>
          Track
        </Button>
        <Button variant="light" onClick={handleBookmark}>
          Bookmark
        </Button>
      </div>) : <></>}
    </article>
  );
}
