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

const API_URL_TEACHING_NOTES = `${import.meta.env.VITE_APP_API_BASE_URL}/api/teaching_notes`;
const API_URL_STUDENTS = `${import.meta.env.VITE_APP_API_BASE_URL}/api/students`;
const API_URL_CLASSES = `${import.meta.env.VITE_APP_API_BASE_URL}/api/classes`;
const API_URL_SUBJECTS = `${import.meta.env.VITE_APP_API_BASE_URL}/api/subjects`;
const API_URL_TEACHERS = `${import.meta.env.VITE_APP_API_BASE_URL}/api/teachers`;

const TeachingNotes = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentsDB, setStudentsDB] = useState([]);
  const [classesDB, setClassesDB] = useState([]);
  const [subjectsDB, setSubjectsDB] = useState([]);
  const [teachingNotesDB, setTeachingNotesDB] = useState([]);
  const [teachingNotesStudents, setTeachingNotesStudents] = useState();
  const [idTeachingNotes, setIdTeachingNotes] = useState([]);
  const [teachersDB, setTeachersDB] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [foundData, setFoundData] = useState(true);

  const onChangeValue = (event) => {
    const studentsArr = teachingNotesDB.slice(1);
    const teachingNotesArr = teachingNotesDB.slice(0, 1);
    let updatedTeachingNotes;
    let updatedStudent;

    updatedTeachingNotes = teachingNotesArr.map((item) => {
      if (event.type === "teaching_notes") {
        if (item.hasOwnProperty("content")) {
          if (event.hasOwnProperty("content")) {
            return { ...item, content: event.content };
          }
        }
        if (item.hasOwnProperty("time")) {
          if (event.hasOwnProperty("time")) {
            return { ...item, time: event.time };
          }
        }
        if (item.hasOwnProperty("total_content_time")) {
          if (event.hasOwnProperty("total_content_time")) {
            return { ...item, total_content_time: event.total_content_time };
          }
        }
        if (item.hasOwnProperty("school_year")) {
          if (event.hasOwnProperty("school_year")) {
            return { ...item, school_year: event.school_year };
          }
        }
        if (item.hasOwnProperty("semester")) {
          if (event.hasOwnProperty("semester")) {
            return { ...item, semester: event.semester };
          }
        }
        if (item.hasOwnProperty("date")) {
          if (event.hasOwnProperty("date")) {
            return { ...item, date: event.date };
          }
        }
      } else {
        return { ...item };
      }
    });

    updatedStudent = studentsArr.map((student) => {
      if (!event.hasOwnProperty("teaching_notes")) {
        if (student.hasOwnProperty("presence")) {
          if (event.id === student.id) {
            if (event.hasOwnProperty("presence")) {
              return { ...student, presence: event.presence };
            }
          }
        }
        if (student.hasOwnProperty("notes")) {
          if (event.id === student.id) {
            if (event.hasOwnProperty("notes")) {
              return { ...student, notes: event.notes };
            }
          }
        }
        if (student.hasOwnProperty("grade")) {
          if (event.id === student.id) {
            if (event.hasOwnProperty("grade")) {
              return { ...student, grade: event.grade };
            }
          }
        }
      } else {
        return { ...student };
      }
    });

    for (let index = 0; index < studentsArr.length; index++) {
      if (updatedStudent[index] == undefined) {
        updatedTeachingNotes.push(studentsArr[index]);
      } else {
        updatedTeachingNotes.push(updatedStudent[index]);
      }
    }
    setTeachingNotesDB(updatedTeachingNotes);
    setTeachingNotesStudents(updatedTeachingNotes.slice(1));
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
        setTeachingNotesDB(await resTeachingNotesDB.data);

        const resStudents = await axios.get(
          `${API_URL_STUDENTS}?class_id=${classId[0].id}`
        );
        setStudentsDB(await resStudents.data);

        let id_teaching_notes = [];
        if ((await resTeachingNotesDB.data.length) === 0) {
          setFoundData(false);
          const tempStudents = await resStudents.data;
          const addStatusStudents = tempStudents.map((item) => {
            return { ...item, presence: "HADIR", notes: " ", grade: " " };
          });
          setTeachingNotesStudents(addStatusStudents);

          setTeachingNotesDB([
            {
              id: "",
              date: moment(date).format("YYYY-MM-DD"),
              class: class_name,
              subject: subject,
              teacher: teacher,
              content: "",
              time: "",
              total_content_time: "",
              school_year: "",
              semester: "",
            },
            ...addStatusStudents,
          ]);
        } else {
          const tempStudents = await resTeachingNotesDB.data;
          const addStatusStudents = tempStudents.map((item, index) => {
            id_teaching_notes.push(item.id);
            return {
              id: item.id,
              class_id: resStudents.data[item.student_id - 1].class_id,
              student: resStudents.data[item.student_id - 1].student,
              sex: resStudents.data[item.student_id - 1].sex,
              presence: item.presence,
              notes: item.notes,
              grade: item.grade,
            };
          });
          setTeachingNotesStudents(addStatusStudents);
          setIdTeachingNotes(id_teaching_notes);

          const classId = classesDB.filter((item) => {
            if (item.id === resTeachingNotesDB.data[0].class_id) return item.id;
          });
          const subjectId = subjectsDB.filter((item) => {
            if (item.id === resTeachingNotesDB.data[0].subject_id)
              return item.id;
          });
          const teacherId = teachersDB.filter((item) => {
            if (item.id === resTeachingNotesDB.data[0].teacher_id)
              return item.id;
          });
          const class_name = classId[0].class;
          const subject = subjectId[0].subject;
          const teacher = teacherId[0].teacher;
          const id = await resTeachingNotesDB.data[0].id;
          const date = moment(await resTeachingNotesDB.data[0].date).format(
            "YYYY-MM-DD"
          );
          const content = await resTeachingNotesDB.data[0].content;
          const time = await resTeachingNotesDB.data[0].time;
          const total_content_time = await resTeachingNotesDB.data[0]
            .total_content_time;
          const school_year = await resTeachingNotesDB.data[0].school_year;
          const semester = await resTeachingNotesDB.data[0].semester;
          setTeachingNotesDB([
            {
              id: id,
              date: date,
              class: class_name,
              subject: subject,
              teacher: teacher,
              content: content,
              time: time,
              total_content_time: total_content_time,
              school_year: school_year,
              semester: semester,
            },
            ...addStatusStudents,
          ]);
          setFoundData(true);
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
    const studentArr = teachingNotesDB.slice(1);

    const subjectId = subjectsDB.filter((subject) => {
      if (subject.subject === teachingNotesDB[0].subject) {
        return subject.id;
      }
    });
    const teacherId = teachersDB.filter((teacher) => {
      if (teacher.teacher === teachingNotesDB[0].teacher) {
        return teacher.id;
      }
    });

    studentArr.map(async (student, index) => {
      const presence = student.presence;
      const notes = student.notes;
      const grade = student.grade;

      const teaching_note_id = idTeachingNotes[index];
      const content = teachingNotesDB[0].content;
      const time = teachingNotesDB[0].time;
      const total_content_time = teachingNotesDB[0].total_content_time;
      const date = teachingNotesDB[0].date;
      const school_year = teachingNotesDB[0].school_year;
      const semester = teachingNotesDB[0].semester;

      await axios.put(
        `${API_URL_TEACHING_NOTES}/${teaching_note_id}/${subjectId[0].id}/${teacherId[0].id}}`,
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
    window.location.reload();
  };

  const save = async (event) => {
    event.preventDefault();
    const studentArr = teachingNotesDB.slice(1);

    const subjectId = subjectsDB.filter((subject) => {
      if (subject.subject === teachingNotesDB[0].subject) {
        return subject.id;
      }
    });
    const teacherId = teachersDB.filter((teacher) => {
      if (teacher.teacher === teachingNotesDB[0].teacher) {
        return teacher.id;
      }
    });
    const classId = classesDB.filter((class_name) => {
      if (class_name.class === teachingNotesDB[0].class) {
        return class_name.id;
      }
    });

    studentArr.map(async (student) => {
      const presence = student.presence;
      const notes = student.notes;
      const grade = student.grade;
      const studentId = student.id;

      const content = teachingNotesDB[0].content;
      const time = teachingNotesDB[0].time;
      const total_content_time = teachingNotesDB[0].total_content_time;
      const date = teachingNotesDB[0].date;
      const school_year = teachingNotesDB[0].school_year;
      const semester = teachingNotesDB[0].semester;

      await axios.post(
        `${API_URL_TEACHING_NOTES}/${subjectId[0].id}/${teacherId[0].id}/${classId[0].id}/${studentId}`,
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
    window.location.reload();
  };

  async function deleteItem() {
    const studentArr = teachingNotesDB.slice(1);

    const subjectId = subjectsDB.filter((subject) => {
      if (subject.subject === teachingNotesDB[0].subject) {
        return subject.id;
      }
    });
    const teacherId = teachersDB.filter((teacher) => {
      if (teacher.teacher === teachingNotesDB[0].teacher) {
        return teacher.id;
      }
    });

    studentArr.map(async (student, index) => {
      const presence = student.presence;
      const notes = student.notes;
      const grade = student.grade;

      const teaching_note_id = idTeachingNotes[index];
      const content = teachingNotesDB[0].content;
      const time = teachingNotesDB[0].time;
      const total_content_time = teachingNotesDB[0].total_content_time;
      const date = teachingNotesDB[0].date;
      const school_year = teachingNotesDB[0].school_year;
      const semester = teachingNotesDB[0].semester;

      await axios.delete(`${API_URL_TEACHING_NOTES}/${teaching_note_id}`);
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
    return (
      <Container className="mt-4 d-flex justify-content-center">
        Loading...
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="mt-4 d-flex justify-content-center">
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
                <Form.Group className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form.Group>
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
                  <FloatingLabel label="Class" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Class"
                      disabled
                      value={
                        teachingNotesDB.length !== 0 && teachingNotesDB[0].class
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <Form.Select name="teacher">
                    {teachersDB &&
                      teachingNotesDB.length !== 0 &&
                      teachersDB.map((teacher) => {
                        if (teachingNotesDB[0].teacher === teacher.teacher) {
                          return (
                            <option
                              key={teacher.id}
                              value={teacher.id}
                              selected
                            >
                              {teacher.teacher}
                            </option>
                          );
                        } else if (
                          teachingNotesDB[0].teacher !== teacher.teacher
                        ) {
                          return (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.teacher}
                            </option>
                          );
                        }
                      })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <Form.Select name="subject">
                    {subjectsDB &&
                      teachingNotesDB.length !== 0 &&
                      subjectsDB.map((subject) => {
                        if (teachingNotesDB[0].subject === subject.subject) {
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
                          teachingNotesDB[0].subject !== subject.subject
                        ) {
                          return (
                            <option key={subject.id} value={subject.id}>
                              {subject.subject}
                            </option>
                          );
                        }
                      })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Content" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Content"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          content: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 &&
                        teachingNotesDB[0].content
                      }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Date" className="mb-3">
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          date: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 &&
                        moment(teachingNotesDB[0].date).format("YYYY-MM-DD")
                      }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Time" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Time"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          time: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 && teachingNotesDB[0].time
                      }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Total Content Time (hours)">
                    <Form.Control
                      className="mb-3"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          total_content_time: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 &&
                        teachingNotesDB[0].total_content_time
                      }
                      type="text"
                      placeholder="Total Content Time"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="School Year" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="School Year"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          school_year: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 &&
                        teachingNotesDB[0].school_year
                      }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="m-auto mb-3 w-50">
                  <FloatingLabel label="Semester" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Semester"
                      onChange={(e) => {
                        onChangeValue({
                          type: "teaching_notes",
                          semester: e.target.value,
                        });
                      }}
                      value={
                        teachingNotesDB.length !== 0 &&
                        teachingNotesDB[0].semester
                      }
                      required
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
                    {teachingNotesStudents &&
                      teachingNotesStudents.map((teachingNotes, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td key={index}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  value={teachingNotes.student}
                                  disabled
                                />
                              </Form.Group>
                            </td>
                            <td key={index + 2}>
                              <Form.Group className="m-auto mb-2 w-60">
                                <Form.Select
                                  onChange={(e) => {
                                    onChangeValue({
                                      id: teachingNotes.id,
                                      presence: e.target.value,
                                    });
                                  }}
                                  value={teachingNotes.presence}
                                >
                                  <option value="HADIR">HADIR</option>
                                  <option value="ALPA">ALPA</option>
                                  <option value="SAKIT">SAKIT</option>
                                  <option value="NO DATA">NO DATA</option>
                                </Form.Select>
                              </Form.Group>
                            </td>
                            <td key={index + 3}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  onChange={(e) => {
                                    onChangeValue({
                                      id: teachingNotes.id,
                                      notes: e.target.value,
                                    });
                                  }}
                                  value={
                                    teachingNotes.notes === ""
                                      ? " "
                                      : teachingNotes.notes
                                  }
                                />
                              </Form.Group>
                            </td>
                            <td key={index + 4}>
                              <Form.Group className="m-auto mb-2 w-50">
                                <Form.Control
                                  type="text"
                                  onChange={(e) => {
                                    onChangeValue({
                                      id: teachingNotes.id,
                                      grade: e.target.value,
                                    });
                                  }}
                                  value={
                                    teachingNotes.grade === ""
                                      ? " "
                                      : teachingNotes.grade
                                  }
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
                  <Container className="mb-3 d-flex justify-content-center">
                    <Button className="btn btn-warning" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      className="mx-3 btn btn-danger"
                      onClick={deleteItem}
                    >
                      Delete
                    </Button>
                  </Container>
                ) : (
                  <Container className="mb-3 d-flex justify-content-center">
                    <Button className="btn btn-primary mx-auto" type="submit">
                      Save
                    </Button>
                  </Container>
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
