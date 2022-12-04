import { Row, Form, Button } from "react-bootstrap";

import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import Recipe from "../Components/Recipe";


const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Homepage() {

    const [recipes, setRecipes] = useState([]);
    const [input1, setInput1] = useState('');
  
    // const navigate = useNavigate();

    const getRecipes = () => {
        axios.get(`${ACCESS_POINT}/findByIngredients?apiKey=${API_KEY}&ingredients=${input1}`)
            .then(res => setRecipes(res.data))
            .catch(error => console.error(error))
    }

    // const name = searchRecipe.name

    const handleSubmit = (event) => {
        event.preventDefault();
        setInput1(input1);


        getRecipes();
    };

    console.log(recipes)

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
                                <Form.Label>Add Ingredints Seperated by Commas</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    size="md"
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


                <Row xs={1} md={2} lg={3} className="g-5 py-5">
                    {recipes.map((recipe) => {
                        return (
                            <>
                                <Recipe recipe={recipe} />
                            </>
                        )
                    })}
                </Row>


            </article>
        </>
    )
                }