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
const ROUTE_TEACHERS = "teachers";
const API_URL_TEACHERS = `http://localhost:3000/api/${ROUTE_TEACHERS}`;

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onChangeTeachers = (event) => {
    const updatedTeacher = teachers.map((teacher) => {
      if (event.id === teacher.id && event.teacher) {
        return {
          id: teacher.id,
          teacher: event.teacher,
          sex: teacher.sex,
        };
      } else if (event.id === teacher.id && event.sex) {
        return {
          id: teacher.id,
          teacher: teacher.teacher,
          sex: event.sex,
        };
      } else {
        return {
          id: teacher.id,
          teacher: teacher.teacher,
          sex: teacher.sex,
        };
      }
    });
    setTeachers(updatedTeacher);
  };

  const addTeacher = async (event) => {
    event.preventDefault();
    const teacher = event.target.elements[0].value;
    const sex = event.target.elements[1].value;
    await axios.post(`${API_URL_TEACHERS}`, {
      teacher: teacher,
      sex: sex,
    });
    event.target.elements[0].value = "";
    event.target.elements[1].value = "LAKI-LAKI";

    const response = await axios.get(`${API_URL_TEACHERS}`);
    setTeachers(await response.data);
  };

  async function saveChanges(index) {
    const teacher = teachers[index].teacher;
    const sex = teachers[index].sex;
    const id = teachers[index].id;

    await axios.put(`${API_URL_TEACHERS}/${id}`, {
      teacher: teacher,
      sex: sex,
    });

    const response = await axios.get(`${API_URL_TEACHERS}`);
    setTeachers(await response.data);
  }

  async function deleteItem(index) {
    const id = teachers[index].id;

    await axios.delete(`${API_URL_TEACHERS}/${id}`);

    const response = await axios.get(`${API_URL_TEACHERS}`);
    setTeachers(await response.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_TEACHERS}`);
        setTeachers(await response.data);
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
              <strong>Teachers</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addTeacher}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Teacher Name" className="mb-3">
                    <Form.Control type="text" placeholder="Teacher Name" />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-2 w-55">
                  <Form.Select>
                    <option value="LAKI-LAKI">LAKI-LAKI</option>
                    <option value="PEREMPUAN">PEREMPUAN</option>
                  </Form.Select>
                </Form.Group>
                <Button className="btn btn-primary mx-1" type="submit">
                  Add Teacher
                </Button>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher</th>
                      <th>Sex</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers &&
                      teachers.map((teacher, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  value={teacher.teacher}
                                  onChange={(e) => {
                                    onChangeTeachers({
                                      id: teacher.id,
                                      teacher: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="m-auto mb-2 w-55">
                                <Form.Select
                                  value={teacher.sex}
                                  onChange={(e) => {
                                    onChangeTeachers({
                                      id: teacher.id,
                                      sex: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="LAKI-LAKI">LAKI-LAKI</option>
                                  <option value="PEREMPUAN">PEREMPUAN</option>
                                </Form.Select>
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

export default Teachers;
