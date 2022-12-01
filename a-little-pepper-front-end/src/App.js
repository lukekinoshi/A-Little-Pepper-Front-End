import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

import NavBar from "./Components/NavBar";
import Home from "./Components/Homepage";
import SignIn from "./Components/SignIn";
import Protected from "./Components/Protected";
import RecipeDetails from "./Components/RecipeDetails";

import Profile from "./Pages/Profile";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
