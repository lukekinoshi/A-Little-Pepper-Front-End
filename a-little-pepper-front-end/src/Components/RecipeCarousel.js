import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";

function RecipeCarousel({ recipe }) {
  const [recipeInfo, setRecipeInfo] = useState([]);

  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/${recipe}/ingredientWidget.json?apiKey=9ab6abef58ff4088ab12f31009f1a8a9`)
      .then((res) => setRecipeInfo(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=First slide&bg=f5f5f5"
        alt="First slide"
      />
      <Carousel.Caption>
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

export default RecipeCarousel;
