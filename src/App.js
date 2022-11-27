import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("submitButton").setAttribute("disabled", "true");
    document.getElementById("submitButton").classList.add("class", "visually-hidden");
    document.getElementById("loadingButton").classList.remove("visually-hidden");
    try {
      const API = process.env.REACT_APP_API_URL;
      const url = `${API}/monster`;
      const response = await axios.get(url, {
        params: {
          description: e.target.description.value,
          type: e.target.type.value,
          cr: e.target.cr.value,
        },
      });
      console.log(response.data);
      this.setState({ monsters: [...this.state.monsters, response.data] });
      document.querySelector("form").reset();
      document.getElementById("loadingButton").classList.add("class", "visually-hidden");
      document.getElementById("submitButton").classList.remove("visually-hidden");
      document.getElementById("submitButton").removeAttribute("disabled");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Container>
        <Row key="a">
          <Col>
            <Form
              onSubmit={this.handleSubmit}
              className="mx-auto p-3 border border-primary border-2 rounded"
            >
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description of Monster</Form.Label>
                <Form.Control type="text" placeholder="eg. large and scary" required />
                <Form.Text className="text-muted">
                  Enter the monster's description.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Type of Monster</Form.Label>
                <Form.Control type="text" placeholder="eg. Elephant Zombie" required />
                <Form.Text className="text-muted">
                  Enter the monster's species.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 w-25" controlId="cr">
                <Form.Label>Challenge Rating</Form.Label>
                <Form.Control type="number" min="1" max="25" required />
              </Form.Group>
              <Button variant="primary" type="submit" id="submitButton">
                Submit
              </Button>
              <Button variant="primary" disabled className="visually-hidden" id="loadingButton">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' '}Loading...
              </Button>
            </Form>
          </Col>
        </Row>
        <Row key="b">
          {this.state.monsters.length ? (
            this.state.monsters.map((monster, i) => {
              return (
                <Col key={i}>
                  <Card
                    style={{ width: "36rem" }}
                    className="my-3 mx-auto"
                    key={i}
                  >
                    <Card.Img
                      variant="top"
                      src={`https://via.placeholder.com/572x360/555?text=${monster.monster}`}
                    />
                    <Card.Body>
                      <Card.Title>{monster.monster}</Card.Title>
                      <div>
                        <p className="fst-italic size">
                          {monster["size-type-and-alignment"]}
                        </p>{" "}
                        <p>"{monster["describe-how-it-looks-and-acts"]}"</p>{" "}
                        <hr />
                        <span className="text-primary fw-bold">
                          Armor Class
                        </span>{" "}
                        {monster["armor-class"]} <br></br>
                        <span className="text-primary fw-bold">
                          Hit Points
                        </span>{" "}
                        {monster["hit-points"]} <br></br>
                        <span className="text-primary fw-bold">Speed</span>{" "}
                        {monster["speed"]} <br></br>
                        <hr />
                        <section className="stats">
                          <div className="atr">
                            <span className="text-primary fw-bold">STR</span>
                            <span>{monster.stats["STR"]}</span>
                          </div>
                          <div className="atr">
                            <span className="text-primary fw-bold">DEX</span>
                            <span>{monster.stats["DEX"]}</span>
                          </div>
                          <div className="atr">
                            <span className="text-primary fw-bold">CON</span>
                            <span>{monster.stats["CON"]}</span>
                          </div>
                          <div className="atr">
                            <span className="text-primary fw-bold">INT</span>
                            <span>{monster.stats["INT"]}</span>
                          </div>
                          <div className="atr">
                            <span className="text-primary fw-bold">WIS</span>
                            <span>{monster.stats["WIS"]}</span>
                          </div>
                          <div className="atr">
                            <span className="text-primary fw-bold">CHA</span>
                            <span>{monster.stats["CHA"]}</span>
                          </div>
                        </section>
                        <hr />
                        {monster["skills"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Skills{" "}
                            </span>
                            <span>{monster["skills"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["saving-throws"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Saving Throws{" "}
                            </span>
                            <span>{monster["saving-throws"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["damage-resistances"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Damage Resistances{" "}
                            </span>
                            <span>{monster["damage-resistances"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["damage-immunities"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Damage Immunities{" "}
                            </span>
                            <span>{monster["damage-immunities"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["damage-vulnerabilities"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Damage Vulnerabilities{" "}
                            </span>
                            <span>{monster["damage-vulnerabilities"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["condition-immunities"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Condition Immunities{" "}
                            </span>
                            <span>{monster["condition-immunities"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["senses"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Senses{" "}
                            </span>
                            <span>{monster["senses"]}</span>
                            <br></br>
                          </div>
                        )}
                        {monster["languages"] && (
                          <div className="details">
                            <span className="text-primary fw-bold">
                              Languages{" "}
                            </span>
                            <span>{monster["languages"]}</span>
                            <br></br>
                          </div>
                        )}
                        <span className="text-primary fw-bold">Challenge</span>{" "}
                        {monster["cr"]} <br></br>
                        <hr />
                        {monster["special-traits"].length &&
                          monster["special-traits"].map((trait, i) => {
                            let arr = trait.split(".");
                            let first = arr.shift();
                            first += ".";
                            arr = arr.join(".");
                            return (
                              <div key={i}>
                                <span className="text-primary fw-bold fst-italic">
                                  {first}
                                </span>{" "}
                                <span>{arr}</span>
                                <br></br>
                                <br></br>
                              </div>
                            );
                          })}
                        <h5 className="actions">Actions</h5>
                        <hr className="actions" />
                        {monster["actions"].length &&
                          monster["actions"].map((action, i) => {
                            let arr = action.split(".");
                            let first = arr.shift();
                            first += ".";
                            arr = arr.join(".");
                            return (
                              <div key={i}>
                                <span className="text-primary fw-bold fst-italic">
                                  {first}
                                </span>{" "}
                                <span>{arr}</span>
                                {i < monster["actions"].length - 1 ? (
                                  <>
                                    <br></br>
                                    <br></br>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <></>
          )}
        </Row>
      </Container>
    );
  }
}

export default App;
