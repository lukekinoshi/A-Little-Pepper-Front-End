import React from "react";
import { UserAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-5" style={{ color: "white" }}>
      <h2>Welcome {user.displayName} </h2>

      {profile.id ? (
        <div>
          <Card style={{ backgroundColor: "#202225", alignItems: "center" }}>
            <Card.Img
              variant="top"
              // src={profile.picture}
              // style={{ width: "300px" ,borderRadius: "50%"}}
            />
            <Card.Body>
              {/* <Card.Title>{profile.name}</Card.Title> */}
              <Card.Title>UserName</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">text</Card.Subtitle>
              <Card.Text>about</Card.Text>
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

            <Button variant="danger">Delete Profile</Button>
            <Button variant="outline-dark" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <Button className="mt-5" variant="warning">
          Create Profile
        </Button>
      )}
    </div>
  );
}
