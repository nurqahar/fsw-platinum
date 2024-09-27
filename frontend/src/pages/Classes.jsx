import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";

const ROUTE_CLASSES = "classes";
const API_URL_CLASSES = `http://localhost:3000/api/${ROUTE_CLASSES}`;

const Classes = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classesDB, setClassesDB] = useState([]);

  const onChange = (event) => {
    const updated = classesDB.map((classes) => {
      if (event.id === classes.id && event.class) {
        return {
          id: classes.id,
          class: event.class,
        };
      } else {
        return {
          id: classes.id,
          class: classes.class,
        };
      }
    });
    setClassesDB(updated);
  };

  const adds = async (event) => {
    event.preventDefault();
    const class_name = event.target.elements[0].value;
    await axios.post(`${API_URL_CLASSES}`, {
      class: class_name,
    });
    event.target.elements[0].value = "";
    window.location.reload();
  };

  async function saveChanges(index) {
    const class_name = classesDB[index].class;
    const id = classesDB[index].id;

    await axios.put(`${API_URL_CLASSES}/${id}`, {
      class: class_name,
    });

    window.location.reload();
  }

  async function deleteItem(index) {
    const id = classesDB[index].id;

    await axios.delete(`${API_URL_CLASSES}/${id}`);

    window.location.reload();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_CLASSES}`);
        setClassesDB(await response.data);
        setLoading(false);
      } catch (err) {
        setError("something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  if (isLoading) {
    return <Container className="mt-4">Loading...</Container>;
  }
  if (error) {
    return (
      <Container className="mt-4">
        <h2>{error}! Please try again.</h2>
        <Button onClick={refreshPage}>REFRESH PAGE</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card border="primary">
            <Card.Header className="text-center">
              <strong>Classes</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={adds}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Class Name" className="mb-3">
                    <Form.Control type="text" placeholder="Class Name" />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-center">
                  <Button className="btn btn-primary mx-1" type="submit">
                    Add Class
                  </Button>
                </Form.Group>
                <Table>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Class</th>
                      <th className="text-center">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classesDB &&
                      classesDB.map((class_name, index) => {
                        return (
                          <tr key={index}>
                            <td key={index + 1} className="text-center">
                              {index + 1}
                            </td>
                            <td key={index + 2} className="text-center">
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  value={class_name.class}
                                  onChange={(e) => {
                                    onChange({
                                      id: class_name.id,
                                      class: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>
                            <td key={index + 3} className="text-center">
                              <>
                                <Button
                                  className="btn btn-warning mx-1"
                                  onClick={() => {
                                    saveChanges(index);
                                  }}
                                >
                                  Save
                                </Button>
                                <Button
                                  className="btn btn-danger mx-1"
                                  onClick={() => {
                                    deleteItem(index);
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Classes;
