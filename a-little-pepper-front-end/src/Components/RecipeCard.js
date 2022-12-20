import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import axios from "axios";

function RecipeCard({ recipe }) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `${ACCESS_POINT}/${recipe}/information?apiKey=${API_KEY}`
      )
      .then((res) => {
        setRecipeInfo(res.data);
        console.log(recipeInfo);
      })
      .catch((error) => console.error(error));
  }, [ACCESS_POINT, API_KEY, recipe, recipeInfo]);

  return (
    <div>
      <Col>
        <Card variant="light" style={{ alignItems: "center", background: "#F8C771" }}>
          <Card.Img
            className="py-3"
            variant="top"
            src={recipeInfo.image}
            style={{ width: "250px", borderRadius: "50%" }}
          />
          <Card.Body>
            <Card.Title>
              <Card.Link
                href={`/recipe/${recipeInfo.id}`}
                style={{ color: "red" }}
              >
                {recipeInfo.title}
              </Card.Link>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default RecipeCard;
