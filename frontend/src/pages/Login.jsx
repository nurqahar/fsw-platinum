import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useUser();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setApiError("");
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/login`,
        data
      );
      await authenticateUser(res.data);
      navigate("/profile");
      navigate(0);
    } catch (error) {
      console.error("There was an error login using user:", error);
      setApiError(
        `An error ocurred while creating your account. ${error.res.data.error}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card border="primary">
            <Card.Header className="text-center ">Login</Card.Header>
            <Card.Body>
              {apiError && (
                <Alert className="text-center" variant="danger">
                  {apiError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 character long and include one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </Form.Group>
                <Button className="w-100 mb-3" variant="primary" type="submit">
                  Submit
                </Button>
                <p className="text-center">
                  Don't have an account? <Link to="/signup">Sign Up Here</Link>
                </p>
                <p className="text-center">
                  Forgot password? <Link to="/forgotPassword">Reset Here</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
