import { Row, Form, Button } from "react-bootstrap";

const handleSubmit = (event) => {
  event.preventDefault();
};


export default function Home() {
  return (
    <>
     <h2>Put in Your Ingredients!</h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <main
            className="col-lg-12 mx-auto"
            style={{ maxWidth: "300px" }}
          >
            <div className="content mx-auto">
              <Row className="g-6">
                <Form.Label>Ingredient 1</Form.Label>
                <Form.Control
                  className="mb-3"
                  size="md"
                  type="text"
                  required
                />
                <Form.Label>Ingredient 2</Form.Label>
                <Form.Control
                  className="mb-3"
                  size="md"
                  type="text"
                />
                <Form.Label>Ingredient 3</Form.Label>
                <Form.Control
                  className="mb-3"
                  size="md"
                  type="text"
                />
                <div className=" mb-5">
                  <Button
                    type="submit"
                    style={{ maxWidth: "200px" }}
                    variant="danger"
                    size="md"
                  >
                    Let's get spicy 🌶  
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </Form>
    </>
  )
}
