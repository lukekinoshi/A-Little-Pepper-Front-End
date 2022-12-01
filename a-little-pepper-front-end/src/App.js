import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import NavBar from "./Components/NavBar";
import Home from "./Components/Homepage";
import Index from "./Pages/Index";
import Profile from "./Pages/Profile";
import Show from "./Pages/Show";
import NewProfile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import SignIn from "./Components/SignIn";
import CalorieTracker from "./Components/CalorieTracker"
import Protected from "./Components/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/recipes" element={<Index />} />
            <Route path="/newprofile" element={<NewProfile />} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/calorietracker" element={<CalorieTracker />} />
            <Route path="/recipe/:id" element={<Show />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
