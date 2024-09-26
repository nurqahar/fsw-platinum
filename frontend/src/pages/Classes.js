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

const ROUTE_STUDENTS = "students";
const API_URL_STUDENTS = `http://localhost:3000/api/${ROUTE_STUDENTS}`;
const ROUTE_CLASSES = "classes";
const API_URL_CLASSES = `http://localhost:3000/api/${ROUTE_CLASSES}`;

const TeachingNotes = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentsDB, setStudentsDB] = useState([]);
  const [classesDB, setClassesDB] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [classes, setClasses] = useState();
  const [valueSearch, setValueSearch] = useState();
  const [students, setStudents] = useState([]);
  const [addStudents, setAddStudents] = useState([]);
  const [count, setCount] = useState(1);

  function showAddStudents() {
    setSearch(false);
  }

  function addStudent() {
    let td = [];
    for (let index = 0; index < count; index++) {
      td.push(
        <tr>
          <td>{index + 1}</td>
          <td>
            <Form.Group className="m-auto mb-2 w-50">
              <Form.Control
                type="text"
                onChange={(e) => {
                  onChangeStudent({
                    index: index,
                    student: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="m-auto mb-2 w-60">
              <Form.Select
                onChange={(e) => {
                  onChangeStudent({
                    index: index,
                    sex: e.target.value,
                  });
                }}
              >
                <option value="LAKI-LAKI">LAKI-LAKI</option>
                <option value="PEREMPUAN">PEREMPUAN</option>
              </Form.Select>
            </Form.Group>
          </td>
        </tr>
      );
    }
    setAddStudents(td);
    setCount(count + 1);
  }

  const onChangeStudent = (event) => {
    //  students name
    if (event.student) {
      const studentEdit = event.student;
      const updatedStudent = students.map((student, studentIndex) => {
        const studentDefault = student.student;
        const studentId = students[studentIndex].id;
        const studentDefaultSex = students[studentIndex].sex;
        if (studentIndex === event.index) {
          return {
            id: studentId,
            student: studentEdit,
            sex: studentDefaultSex,
          };
        } else {
          return {
            id: studentId,
            student: studentDefault,
            sex: studentDefaultSex,
          };
        }
      });
      setStudents(updatedStudent);
    }

    if (event.sex) {
      const studentEditSex = event.sex;
      const updatedStudent = students.map((student, studentIndex) => {
        const studentDefault = student.student;
        const studentId = students[studentIndex].id;
        const studentDefaultSex = students[studentIndex].sex;
        if (studentIndex === event.index) {
          return {
            id: studentId,
            student: studentDefault,
            sex: studentEditSex,
          };
        } else {
          return {
            id: studentId,
            student: studentDefault,
            sex: studentDefaultSex,
          };
        }
      });
      setStudents(updatedStudent);
    }
  };

  const onChangeValue = (event) => {
    setClasses({
      class: event.class,
    });
  };

  const searchTeachingNotes = async (event) => {
    event.preventDefault();
    try {
      setSearch(true);
      const classId = event.target.class.value;
      setValueSearch({
        classId: classId,
      });

      const resStudents = await axios.get(
        `${API_URL_STUDENTS}?class_id=${classId}`
      );
      setStudentsDB(resStudents.data);
      setStudents(resStudents.data);

      setLoading(false);
    } catch (error) {
      setError("something went wrong");
      setLoading(false);
    }
  };

  const saveChanges = async (event) => {
    event.preventDefault();

    let classId;
    classes.map((class_name) => {
      if (class_name.class === event.target.elements[0].value) {
        classId = class_name.id;
      }
    });

    students.map(async (student) => {
      await axios.put(`${API_URL_STUDENTS}/${classId}`, {
        student: student.student,
        sex: student.sex,
      });
    });
  };

  const save = async (event) => {
    let newStudent = [];
    for (let index = 1; index <= event.target.elements.length - 3; index += 2) {
      newStudent.push({
        student: event.target.elements[index].value,
        sex: event.target.elements[index + 1].value,
      });
    }

    let classId;
    classes.map((class_name) => {
      if (class_name.class === event.target.elements[0].value) {
        classId = class_name.id;
      }
    });

    newStudent.map(async (student) => {
      await axios.post(`${API_URL_STUDENTS}/${classId}`, {
        student: student.student,
        sex: student.sex,
      });
    });
  };

  async function deleteItem(studentIndex) {
    await axios.delete(`${API_URL_STUDENTS}/${studentIndex}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClasses = await axios.get(`${API_URL_CLASSES}`);
        setClassesDB(resClasses.data);
        setClasses(resClasses.data);
        setLoading(false);
      } catch (err) {
        setError("something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, [studentsDB, classesDB]);

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
    <Container className="mt-4 ">
      {/* ADD & SEARCH */}
      <Row classame="justify-content-center">
        <Col>
          <Card border="primary">
            <Card.Header className="text-center">
              <strong>Search Classes</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={searchTeachingNotes}>
                <Form.Group className="mb-3">
                  <Form.Select name="class">
                    <option>Choose Class</option>
                    {classesDB &&
                      classesDB.map((class_name) => {
                        return (
                          <option key={class_name.id} value={class_name.id}>
                            {class_name.class}
                          </option>
                        );
                      })}
                    ;
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Search
                </Button>
                <Button
                  variant="primary"
                  onClick={showAddStudents}
                  className="mx-3"
                >
                  Add Students
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* READ VALUE */}
      <Row className=" justify-content-center mt-5">
        <Col>
          {/* IF TRUE */}
          {isSearch ? (
            <Card>
              <Card.Body>Classes</Card.Body>
              <Form onSubmit={classesDB.length !== 0 ? saveChanges : save}>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Class" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Class"
                      value={classes && classes[valueSearch.classId - 1].class}
                      onChange={(e) => {
                        onChangeValue({
                          ...classes,
                          class: e.target.value,
                        });
                      }}
                      disabled
                    />
                  </FloatingLabel>
                </Form.Group>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Sex</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* if true TABLE */}
                    {students.length !== 0 &&
                      students.map((student, studentIndex) => {
                        return (
                          <tr>
                            <td>{studentIndex + 1}</td>
                            <td>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  value={student && student.student}
                                  onChange={(e) => {
                                    onChangeStudent({
                                      index: studentIndex,
                                      student: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="m-auto mb-2 w-60">
                                <Form.Select
                                  value={student && student.sex}
                                  onChange={(e) => {
                                    onChangeStudent({
                                      index: studentIndex,
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
                              <Button
                                className="mx-3 btn btn-danger mb-3"
                                onClick={() => {
                                  deleteItem(student.id);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                {/* button */}
                {studentsDB.length !== 0 ? (
                  <Button className="btn btn-warning mb-3" type="submit">
                    Save Changes
                  </Button>
                ) : (
                  <Button className="btn btn-primary mb-3" type="submit">
                    Save
                  </Button>
                )}
              </Form>
            </Card>
          ) : (
            <Card>
              <Card.Body>Add Student</Card.Body>
              <Form onSubmit={save}>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Class" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Class"
                      onChange={(e) => {
                        onChangeValue({
                          ...classes,
                          class: e.target.value,
                        });
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Sex</th>
                    </tr>
                  </thead>
                  <tbody>{addStudents}</tbody>
                </Table>
                {/* button */}

                <Button className="btn btn-primary mb-3" type="submit">
                  Save
                </Button>
                <Button
                  className="btn btn-primary mb-3 mx-3"
                  onClick={addStudent}
                >
                  Add
                </Button>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TeachingNotes;
