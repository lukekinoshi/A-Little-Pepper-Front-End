import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const API = process.env.REACT_APP_API_URL;


export default function RecipeDetails() {
  const [recipes, setRecipes] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(
    () => {
      axios
        .get(`${API}/recipes/${id}`)
        .then((response) => setRecipes(response.data.payload))
        .catch((error) => navigate('/recipes'))
    });
  const handleDelete = () => {
    axios
      .delete(`${API}/recipes/${id}`)
      .then((response) => navigate(`/recipes`))
      .catch((error) => console.error(error))
  }
  return (
    <article className='RecipeDetails'>
      <div>
        <h1>{recipes.name}</h1>
      </div>
      <h3>{recipes.cal} calories</h3>
      <h4>Fat: {recipes.fat}g</h4>
      <h4>Carb: {recipes.carb}g</h4>
      <h4>Fiber: {recipes.fiber}g</h4>
      <h4>Protein: {recipes.protein}g</h4>
      <img src={recipes.image} alt={recipes.name} />
      <div className="showNavigation">
        <div>
          <a href={`/recipes`}>
            <button className="backButton">Back</button>
          </a>
        </div>
        <div>
          <a href={`/recipes/${id}/edit`}>
            <button className="editButton">Edit</button>
          </a>
        </div>
        <span>
          <button className="deleteButton" onClick={handleDelete}>Delete</button>
        </span>
      </div>
    </article>
  )
}





