import React from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Welcome {user.displayName} </h2>
      <Button variant="outline-dark" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
