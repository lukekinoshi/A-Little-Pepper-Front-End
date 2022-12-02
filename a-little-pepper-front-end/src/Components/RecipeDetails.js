import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios;"


export default function RecipeDetails() {

  const [instructions, setInstructions] = useState({});

  let { id } = useParams();

  // const navigate = useNavigate();



  const getInstructions = () => {
    // axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`)
    axios.get(`https://api.spoonacular.com/recipes/{id}/analyzedInstructions?apiKey=df49e55434e34cab8f10d2a1cad00bee`)
      .then(res => setInstructions(res.data))
      .catch(error => console.error(error))
  }

  return (
    <article className='RecipeDetails'>
      <h1>{id}</h1>
      <h1>{instructions}</h1>
    </article>
  )
}





