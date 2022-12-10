import { Row, Form, Button } from "react-bootstrap";
import pepper from "../Assets/chili-pepper.png";
import { useState } from "react";
import axios from "axios";
import About from "../Components/About";
import padThai from "../Assets/pad-thai.png";
// import { useNavigate } from "react-router-dom";

import Recipe from "../Components/Recipe";

const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const [input1, setInput1] = useState("");

  // const navigate = useNavigate();

  const getRecipes = () => {
    axios
      .get(
        `${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`
      )
      .then((res) => setRecipes(res.data))
      .catch((error) => console.error(error));
  };

  // const name = searchRecipe.name

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput1(input1);

    getRecipes();
  };

  console.log(recipes);

  return (
    <div className="my-5">
      <div>
        <img src={padThai} width="50%" />
        <h2 className="mt-4">Search for a recipe</h2>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <main
              className="col-lg-12 mx-auto py-3"
              style={{ maxWidth: "350px" }}
            >
              <div className="content mx-auto">
                <Row className="g-6">
                  <Form.Label>
                    Enter your ingredients seperated by commas
                  </Form.Label>
                  <Form.Control
                    className="mb-3"
                    size="lg"
                    type="text"
                    onChange={(e) => setInput1(e.target.value)}
                    value={input1}
                    placeholder="example: chicken,flour,salt"
                    required
                  />
                  {/* <Form.Label>Ingredient 2</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
                                    type="text"
                                    onChange={(e) => setInput2(e.target.value)}
                                    value={input2}
                                />
                                <Form.Label>Ingredient 3</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
                                    type="text"
                                    onChange={(e) => setInput3(e.target.value)}
                                    value={input3}

                                /> */}

                  <div>
                    <Button
                      type="submit"
                      style={{ maxWidth: "200px" }}
                      variant="danger"
                      size="lg"
                    >
                      Let's Get Spicy
                      <img
                        style={{ marginLeft: "5px" }}
                        src={pepper}
                        width="25"
                        height="25"
                      />
                    </Button>
                  </div>
                </Row>
              </div>
            </main>
          </div>
        </Form>
      </div>
      <article>
        <Row xs={1} md={2} lg={3} className="g-5 py-5">
          {recipes.map((recipe) => {
            return (
              <>
                <Recipe recipe={recipe} />
              </>
            );
          })}
        </Row>
      </article>
      <About />
    </div>
  );
}
