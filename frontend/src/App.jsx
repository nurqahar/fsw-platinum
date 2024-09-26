import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import TeachingNotes from "./pages/TeachingNotes";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/teaching_notes" element={<TeachingNotes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
