import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

function TeachingNote() {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card border="primary">
            <Card.Header className="text-center">
              <strong>Search Teaching Note</strong>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter date" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className=" justify-content-center mt-5">
        <Col>
          <Card>
            <Card.Body className="text-center">Teaching Note</Card.Body>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter date" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Guru</Form.Label>
                  <Form.Control type="text" placeholder="Guru" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TeachingNote;
