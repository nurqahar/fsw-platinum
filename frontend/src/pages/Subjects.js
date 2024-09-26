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
const ROUTE_SUBJECTS = "subjects";
const API_URL_SUBJECTS = `http://localhost:3000/api/${ROUTE_SUBJECTS}`;

const Subjects = () => {
  const [subjects, setSubject] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onChangeSubject = (event) => {
    const updatedSubject = subjects.map((subject) => {
      if (event.id === subject.id) {
        return {
          id: subject.id,
          subject: event.subject,
        };
      } else {
        return {
          id: subject.id,
          subject: subject.subject,
        };
      }
    });
    setSubject(updatedSubject);
  };

  const addSubject = async (event) => {
    event.preventDefault();
    const subject = event.target.elements[0].value;
    await axios.post(`${API_URL_SUBJECTS}`, {
      subject: subject,
    });
    event.target.elements[0].value = "";

    const response = await axios.get(`${API_URL_SUBJECTS}`);
    setSubject(await response.data);
  };

  async function saveChanges(index) {
    const subject = subjects[index].subject;
    const id = subjects[index].id;

    await axios.put(`${API_URL_SUBJECTS}/${id}`, {
      subject: subject,
    });

    const response = await axios.get(`${API_URL_SUBJECTS}`);
    setSubject(await response.data);
  }

  async function deleteItem(index) {
    const id = subjects[index].id;

    await axios.delete(`${API_URL_SUBJECTS}/${id}`);

    const response = await axios.get(`${API_URL_SUBJECTS}`);
    setSubject(await response.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_SUBJECTS}`);
        setSubject(await response.data);
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
              <strong>Subjects</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addSubject}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Subject Name" className="mb-3">
                    <Form.Control type="text" placeholder="Subject Name" />
                  </FloatingLabel>
                </Form.Group>
                <Button className="btn btn-primary mx-1" type="submit">
                  Add Subject
                </Button>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects &&
                      subjects.map((subject, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <Form.Group className="m-auto mb-2 w-60">
                                <Form.Control
                                  type="text"
                                  value={subject.subject}
                                  onChange={(e) => {
                                    onChangeSubject({
                                      id: subject.id,
                                      subject: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>

                            <td>
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

export default Subjects;
