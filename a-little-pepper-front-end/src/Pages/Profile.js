import axios from "axios";
import { UserAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState([]);
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
      <h2>Welcome {user.displayName} </h2>
      <h3>{user.uid}</h3>
      <div>
        <Card style={{ backgroundColor: "orange", alignItems: "center" }}>
          <Card.Img
            variant="top"
            // src={profile.picture}
            // style={{ width: "300px" ,borderRadius: "50%"}}
          />
          <Card.Body>
            {/* <Card.Title>{profile.name}</Card.Title> */}
            <Card.Title>Profile</Card.Title>
            <Card.Subtitle className="mb = ">{user.displayName}</Card.Subtitle>
            <Card.Text>profile.cal</Card.Text>
            <Card.Text>profile.fat</Card.Text>
            <Card.Text>profile.carb</Card.Text>
            <Card.Text>profile.protein</Card.Text>
          </Card.Body>

          <Card.Body>
            <Card.Text>What to put here?</Card.Text>
          </Card.Body>
        </Card>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ gap: ".5rem" }}
        >
          <Button variant="outline-light">Edit Profile</Button>
          <Button variant="outline-dark" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <Button onClick={editProfile} className="mt-5" variant="warning">
        Edit Profile
      </Button>
    </div>
  );
}