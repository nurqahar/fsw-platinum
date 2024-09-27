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
import moment from "moment";

const routeTeachingNotes = "teaching_notes";
const API_URL_TEACHING_NOTES = `http://localhost:3000/api/${routeTeachingNotes}`;
const ROUTE_STUDENTS = "students";
const API_URL_STUDENTS = `http://localhost:3000/api/${ROUTE_STUDENTS}`;
const ROUTE_CLASSES = "classes";
const API_URL_CLASSES = `http://localhost:3000/api/${ROUTE_CLASSES}`;
const ROUTE_SUBJECTS = "subjects";
const API_URL_SUBJECTS = `http://localhost:3000/api/${ROUTE_SUBJECTS}`;
const ROUTE_TEACHERS = "teachers";
const API_URL_TEACHERS = `http://localhost:3000/api/${ROUTE_TEACHERS}`;

const TeachingNotes = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentsDB, setStudentsDB] = useState([]);
  const [classesDB, setClassesDB] = useState([]);
  const [subjectsDB, setSubjectsDB] = useState([]);
  const [teachingNotesDB, setTeachingNotesDB] = useState([]);
  const [teachersDB, setTeachersDB] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [teachingNotes, setTeachingNotes] = useState();
  const [foundData, setFoundData] = useState(true);
  const [studentsStatus, setStudentsStatus] = useState([]);

  const onChangeStudent = (event) => {
    //  students name
  };

  const onChangeValue = (event) => {
    setTeachingNotes([{
      date: event.date,
      class: event.class,
      subject: event.subject,
      teacher: event.teacher,
      content: event.content,
      time: event.time,
      total_content_time: event.total_content_time,
      school_year: event.school_year,
      semester: event.semester,
    }]);
  };

  const searchTeachingNotes = async (event) => {
    event.preventDefault();
    try {
      const date = event.target.date.value;
      const classId = classesDB.filter((classes) => {
        if (classes.id === parseInt(event.target.class.value))
          return classes.id;
      });
      const subjectId = subjectsDB.filter((subject) => {
        if (subject.id === parseInt(event.target.subject.value))
          return subject.id;
      });
      const teacherId = teachersDB.filter((teacher) => {
        if (teacher.id === parseInt(event.target.teacher.value))
          return teacher.id;
      });

      if (
        !classId.includes("Choose") &&
        !subjectId.includes("Choose") &&
        !teacherId.includes("Choose")
      ) {
        setSearch(true);
        const class_name = classId[0].class;
        const subject = subjectId[0].subject;
        const teacher = teacherId[0].teacher;

        const resTeachingNotesDB = await axios.get(
          `${API_URL_TEACHING_NOTES}?date=${date}&subject_id=${subjectId[0].id}&class_id=${classId[0].id}&teacher_id=${teacherId[0].id}`
        );
        setTeachingNotesDB(resTeachingNotesDB.data);

        const resStudents = await axios.get(
          `${API_URL_STUDENTS}?class_id=${classId[0].id}`
        );
        setStudentsDB(resStudents.data);

        if (resTeachingNotesDB.data.length === 0) {
          setFoundData(false);
          setTeachingNotesDB([
            {
              date: date,
              class: class_name,
              subject: subject,
              teacher: teacher,
              content: "",
              time: "",
              total_content_time: "",
              school_year: "",
              semester: "",
            },
            ...resStudents.data,
          ]);
        }

        setLoading(false);
      }
    } catch (error) {
      setError("something went wrong");
      setLoading(false);
    }
  };

  const saveChanges = async (event) => {
    event.preventDefault();

    let subjectId;
    let teacherId;

    subjectsDB.map((subject) => {
      if (subject.subject === teachingNotes.subject) {
        subjectId = subject.id;
      }
    });
    teachersDB.map((teacher) => {
      if (teacher.teacher === teachingNotes.teacher) {
        teacherId = teacher.id;
      }
    });

    studentsStatus.map(async (studentStatus, index) => {
      const teachingNotesId = studentStatus.teachingNotesId;
      const presence = studentStatus.presence;
      const content = teachingNotes.content;
      const notes = studentStatus.notes;
      const time = teachingNotes.time;
      const total_content_time = teachingNotes.total_content_time;
      const date = teachingNotes.date;
      const school_year = teachingNotes.school_year;
      const semester = teachingNotes.semester;
      const grade = studentStatus.grade;
      await axios.put(
        `${API_URL_TEACHING_NOTES}/${teachingNotesId}/${subjectId}/${teacherId}`,
        {
          presence: presence,
          content: content,
          notes: notes,
          time: time,
          total_content_time: total_content_time,
          date: date,
          school_year: school_year,
          semester: semester,
          grade: grade,
        }
      );
    });
  };

  const save = async (event) => {
    event.preventDefault();
    console.log(teachingNotesDB);
    console.log(studentsDB);
  };

  async function deleteItem() {
    studentsStatus.map(async (studentStatus, index) => {
      const teachingNotesId = studentStatus.teachingNotesId;
      const presence = studentStatus.presence;
      const content = teachingNotes.content;
      const notes = studentStatus.notes;
      const time = teachingNotes.time;
      const total_content_time = teachingNotes.total_content_time;
      const date = teachingNotes.date;
      const school_year = teachingNotes.school_year;
      const semester = teachingNotes.semester;
      const grade = studentStatus.grade;
      await axios.delete(`${API_URL_TEACHING_NOTES}/${teachingNotesId}`, {
        presence: presence,
        content: content,
        notes: notes,
        time: time,
        total_content_time: total_content_time,
        date: date,
        school_year: school_year,
        semester: semester,
        grade: grade,
      });
    });
    window.location.reload();
  }

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClasses = await axios.get(`${API_URL_CLASSES}`);
        const resSubjects = await axios.get(`${API_URL_SUBJECTS}`);
        const resTeachers = await axios.get(`${API_URL_TEACHERS}`);
        setClassesDB(resClasses.data);
        setSubjectsDB(resSubjects.data);
        setTeachersDB(resTeachers.data);

        setLoading(false);
      } catch (err) {
        setError("something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {/* SEARCH */}
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card border="primary">
            <Card.Header className="text-center">
              <strong>Search Teaching Note</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={searchTeachingNotes}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Date" className="mb-3">
                    <Form.Control type="date" name="date" required />
                  </FloatingLabel>
                </Form.Group>
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
                <Form.Group className="mb-3">
                  <Form.Select name="subject">
                    <option>Choose Subject</option>
                    {subjectsDB &&
                      subjectsDB.map((subject) => {
                        return (
                          <option key={subject.id} value={subject.id}>
                            {subject.subject}
                          </option>
                        );
                      })}
                    ;
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select name="teacher">
                    <option>Choose Teacher</option>
                    {teachersDB &&
                      teachersDB.map((teacher) => {
                        return (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.teacher}
                          </option>
                        );
                      })}
                    ;
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* READ VALUE */}
      <Row className=" justify-content-center mt-5">
        <Col>
          {/* IF SEARCH */}
          {isSearch ? (
            <Card>
              <Card.Body className="text-center">Teaching Notes</Card.Body>
              <Form onSubmit={foundData ? saveChanges : save}>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Teacher" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Teacher"
                      disabled
                      // value={teachingNotesDB && teachingNotesDB.teacher}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Class" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Class"
                      disabled
                      // value={teachingNotesDB && teachingNotesDB.class}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <Form.Select name="subject">
                    {/* {subjectsDB &&
                      subjectsDB.map((subject) => {
                        if (teachingNotesDB.subject === subject.subject) {
                          return (
                            <option
                              key={subject.id}
                              value={subject.id}
                              selected
                            >
                              {subject.subject}
                            </option>
                          );
                        } else if (
                          teachingNotesDB.subject !== subject.subject
                        ) {
                          return (
                            <option key={subject.id} value={subject.id}>
                              {subject.subject}
                            </option>
                          );
                        }
                      })} */}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Content" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Content"
                      // value={teachingNotesDB && teachingNotesDB.content}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Date" className="mb-3">
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      disabled
                      // value={teachingNotesDB && teachingNotesDB.date}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Time" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Time"
                      // value={teachingNotesDB && teachingNotesDB.time}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel
                    label="Total Content Time (hours)"
                    className="mb-3"
                    // value={
                    //   teachingNotesDB && teachingNotesDB.total_content_time
                    // }
                  >
                    <Form.Control
                      type="text"
                      placeholder="Total Content Time"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="School Year" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="School Year"
                      // value={teachingNotesDB && teachingNotesDB.school_year}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Semester" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Semester"
                      // value={teachingNotesDB && teachingNotesDB.semester}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Presence</th>
                      <th className="text-center">Notes</th>
                      <th className="text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsDB.length !== 0 &&
                      studentsDB.map((student, studentIndex) => {
                        return (
                          <tr key={studentIndex}>
                            <td>{studentIndex + 1}</td>
                            <td key={studentIndex}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  value={student.student}
                                  disabled
                                />
                              </Form.Group>
                            </td>
                            <td key={studentIndex + 2}>
                              <Form.Group className="m-auto mb-2 w-60">
                                <Form.Select
                                  onChange={(e) => {
                                    onChangeStudent({
                                      index: studentIndex,
                                      presence: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="HADIR">HADIR</option>
                                  <option value="ALPA">ALPA</option>
                                  <option value="SAKIT">SAKIT</option>
                                  <option value="NO DATA">NO DATA</option>
                                </Form.Select>
                              </Form.Group>
                            </td>
                            <td key={studentIndex + 3}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  onChange={(e) => {
                                    onChangeStudent({
                                      index: studentIndex,
                                      notes: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>
                            <td key={studentIndex + 4}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  onChange={(e) => {
                                    onChangeStudent({
                                      index: studentIndex,
                                      grade: e.target.value,
                                    });
                                  }}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                {/* button */}
                {foundData ? (
                  <>
                    <Button className="btn btn-warning" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      className="mx-3 btn btn-danger"
                      onClick={deleteItem}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button className="btn btn-primary mx-auto" type="submit">
                    Save
                  </Button>
                )}
              </Form>
            </Card>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TeachingNotes;
