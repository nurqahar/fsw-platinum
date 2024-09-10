import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProfileSkeleton from "../components/ProfileSkeleton";

const ProfilePage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  if (!user) return <ProfileSkeleton />;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-muted">Software Engineer</p>
                </Col>
                <Col md={8}>
                  <h4>Contact Information</h4>
                  <p>{`Email: ${user.email}`} </p>
                  <p>{`Phone: ${user.phoneNumber}`} </p>
                  <Button variant="primary" className="mt-3">
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
