import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Profile from "./Pages/Profile";
import Show from "./Pages/Show";
import NewProfile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Index />} />
          <Route path="/newprofile" element={<NewProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<Show />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
