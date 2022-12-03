import axios from "axios";
import { UserAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Carousel } from "react-bootstrap";
import CalorieTracker from "../Components/CalorieTracker";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([1,2,3]);
  
  const API = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    axios.get(`${API}/profiles/${user.uid}`).then((response) => {
      setProfile(response.data);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = () => {
    navigate(`/`);
  };

  return (
    <div className="my-5" style={{ color: "black" }}>
      <article className="mb-5">
        <CalorieTracker />
      </article>
      <div>
        <Card style={{ backgroundColor: "orange", alignItems: "center" }}>
          <Card.Img
            variant="top"
            // src={profile.picture}
            // style={{ width: "300px" ,borderRadius: "50%"}}
          />
          <Card.Body>
            {/* <h1>lol</h1> */}
            <Card.Title>{user.displayName}</Card.Title>
            <Card.Text>Calories: {profile.cal}</Card.Text>
            <Card.Text>Fat: {profile.fat}</Card.Text>
            <Card.Text>Carbs: {profile.carb}</Card.Text>
            <Card.Text>Protein: {profile.protein}</Card.Text>
          </Card.Body>
        </Card>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ gap: ".5rem" }}
        >
          <Button variant="light" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <section className="my-5">
          <h2>Bookmarked Recipes</h2>
          <Carousel>
          {savedRecipes.map((recipe) => {
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
                        )
                    })}
          </Carousel>
        </section>
      </div>
    </div>
  );
}
