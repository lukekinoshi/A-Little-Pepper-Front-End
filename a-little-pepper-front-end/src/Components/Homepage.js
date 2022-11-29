import { Row, Form, Button } from "react-bootstrap";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ACCESS_POINT = process.env.ACCESS_POINT;
const API_KEY = process.env.API_KEY;

export default function Homepage() {

    const [searchRecipe, setSearchRecipe] = useState({});
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState({
        name: '',
        cal: 0,
        fat: 0,
        carb: 0,
        protein: 0,
        photos: '',
        ingredients: [],
        instructions: [],
    });

    const navigate = useNavigate();

    const getRecipes = () => {
        // axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input},`)
        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=df49e55434e34cab8f10d2a1cad00bee&ingredients=${input}`)
            .then(res => setSearchRecipe(res.data))
            .catch(error => console.error(error))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInput(input);
        getRecipes();
    };

    console.log(searchRecipe)

    return (
        <>
            <h2>Put in Your Ingredients!</h2>
            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <main
                        className="col-lg-12 mx-auto"
                        style={{ maxWidth: "300px" }}
                    >
                        <div className="content mx-auto">
                            <Row className="g-6">
                                <Form.Label>Ingredient 1</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
                                    type="text"
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    required
                                />
                                <Form.Label>Ingredient 2</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
                                    type="text"
                                />
                                <Form.Label>Ingredient 3</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
                                    type="text"
                                />
                                <div className=" mb-5">
                                    <Button
                                        type="submit"
                                        style={{ maxWidth: "200px" }}
                                        variant="danger"
                                        size="md"
                                    >
                                        Let's get spicy 🌶
                                    </Button>
                                </div>
                            </Row>
                        </div>
                    </main>
                </div>
            </Form>
            <article>
           
            </article>
        </>
    )
}
