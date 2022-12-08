import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Col, Card, Row, Container } from "react-bootstrap";
import { UserAuth } from "../Context/AuthContext";
import axios from "axios";
import image1 from "../Assets/chili-pepper.png";

const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API = process.env.REACT_APP_API_URL;

export default function RecipeDetails() {
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [prices, setPrices] = useState([]);

  let { id } = useParams();
  const { user } = UserAuth();
  const [profile, setProfile] = useState([]);

  const handleBookmark = () => {
    if (profile.recipes.includes(id)) {
      alert("Already Bookmarked!");
      return;
    }
    let savedRecipes = [];
    if (profile.recipes.length < 1) {
      savedRecipes = [id];
    } else {
      savedRecipes = [...profile.recipes, id];
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
    return str.replace(/\D/g, "") * 1;
  };
  const handleTrack = () => {
    let newCal = profile.cal + makeNum(nutrition.calories);
    let newFat = profile.fat + makeNum(nutrition.fat);
    let newCarb = profile.carb + makeNum(nutrition.carbs);
    let newProtein = profile.protein + makeNum(nutrition.protein);
    console.log(newCal);
    console.log(newFat);
    console.log(newCarb);
    console.log(newProtein);

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
        setInstructions(res.data[0].steps);
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

  // console.log(instructions)

  return (
    <Container className="py-3">
      <h6>Hello {profile.name}!</h6>
      <Row>
        <Col>
          <p>Recipe ID:{id}</p>
          <img src={image1} width="250px" height="250px" />
        </Col>
        <Col>
          <h2>Recipe Name</h2>
          <h4 style={{ color: "#FB8F00" }}>Nutritional Information</h4>
          <section>
            <p>Calorie: {nutrition.calories}cal</p>
            {/* <h6>*Note:
          To ease calculations, energy is expressed in 1000-calorie units known as kilocalories. That is, 1 Calorie is equivalent to 1 kilocalorie; the capital C in Calories denotes kcal on food labels, calories and kilocalories are used interchangeably to mean the same thing. For example: 1kcal = 1 calorie. </h6> */}
            <p>Fat: {nutrition.fat}</p>
            <p>Carbohydrates: {nutrition.carbs}</p>
            <p>Protein: {nutrition.protein}</p>
          </section>
          {profile.id ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button variant="outline-danger" onClick={handleTrack}>
                Track
              </Button>
              <Button variant="outline-dark" onClick={handleBookmark}>
                Bookmark
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="py-5">
        <Col>
        <h3 style={{ color: "#FB8F00" }}>Ingredients</h3>
          <article>
            {ingredient &&
              ingredient.map((item) => {
                return (
                  <Card
                    variant="light"
                    style={{ alignItems: "center" }}
                  >
                    <Card.Text>
                      {item.amount.us.value} {item.amount.us.unit} of{" "}
                      {item.name}{" "}
                    </Card.Text>
                  </Card>
                );
              })}
          </article>
        </Col>
        <Col>
          <h3 style={{ color: "#FB8F00" }}>Ingredients Price Breakdown</h3>
          <article>
            {price &&
              price.map((item) => {
                return (
                  <Card
                    variant="light"
                    style={{ alignItems: "center" }}
                  >
                    <Card.Text>
                      {item.name} : ${Math.round(10 * item.price) / 100}{" "}
                    </Card.Text>
                  </Card>
                );
              })}
            <h6>Total Cost: ${Math.round(10 * priceSum) / 100}</h6>
          </article>
        </Col>
      </Row>
      <h3 style={{ color: "#FB8F00" }}>Instructions</h3>
      <article>
        {instructions &&
          instructions.map((instruction) => {
            return (
              <Card
                variant="light"
              >
                <Card.Text>
                  Step {instruction.number}: {instruction.step}
                </Card.Text>
              </Card>
            );
          })}
      </article>
    </Container>
  );
}
