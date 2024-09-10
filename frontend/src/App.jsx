import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import "./App.css";
import TeachingNotes from "./pages/TeachingNote.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/teachingNote" element={<TeachingNotes />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
