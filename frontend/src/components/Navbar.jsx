import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import viteLogo from "../../public/vite.svg";

const NavBar = () => {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={viteLogo} width="30" height="30" alt="vite logo" />
          Perangkat Ajar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={url === "/" ? "active" : ""}>
              HOME
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/classes"
              className={url === "/classes" ? "active" : ""}
            >
              CLASSES
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/students"
              className={url === "/students" ? "active" : ""}
            >
              STUDENTS
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/teachers"
              className={url === "/teachers" ? "active" : ""}
            >
              TEACHERS
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/subjects"
              className={url === "/subjects" ? "active" : ""}
            >
              SUBJECTS
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/teaching_notes"
              className={url === "/teaching_notes" ? "active" : ""}
            >
              TEACHING NOTES
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                title={user.firstName + " " + user.lastName}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className={
                      (url === "/signup" ? "active" : "") + " nav-link"
                    }
                  >
                    SIGNUP
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={(url === "/login" ? "active" : "") + " nav-link"}
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
