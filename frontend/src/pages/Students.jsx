import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
const route = "student";
const apiUrl = `http://localhost:3001/api/${route}`;
const routeClasses = "classes";
const apiUrlClasses = `http://localhost:3001/api/${routeClasses}`;
const Students = () => {
  const [students, setStudent] = useState([
    { id: 1, student: "Johned", sex: "Laki-laki", kelas_id: "1" },
    { id: 2, student: "Jensen", sex: "Laki-laki", kelas_id: "2" },
  ]);

  const [classes, setClasses] = useState([
    { id: 1, kelas: "X TOI 1" },
    { id: 2, kelas: "X TOI 2" },
  ]);

  const handleEditClick = (e) => {
    console.log("Edit button clicked");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseClasses = await fetch(`${apiUrlClasses}`);
        const response = await fetch(`${apiUrl}`);
        if (!responseClasses.ok) throw new Error("Error fetching users");
        if (!response.ok) throw new Error("Error fetching users");
        const dataClasses = await responseClasses.json();
        const data = await response.json();
        setStudent(data);
        setClasses(dataClasses);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-center">
        <Col md={8} lg={12}>
          <Card className="mt-4">
            {students.map((student, index) => {
              return (
                <CardBody>
                  <Row className="justify-content-center align-items-center">
                    <Col md={8}>
                      <h2>Siswa {student.id}</h2>
                      <CardTitle tag="h5">{student.student}</CardTitle>
                      <CardText>Jenis Kelamin: {student.sex}</CardText>
                      <CardText>Kelas: {classes[index].kelas}</CardText>
                    </Col>
                    <Col md={4} className="text-center">
                      <Button color="primary" onClick={handleEditClick}>
                        Edit Student
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              );
            })}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Students;
