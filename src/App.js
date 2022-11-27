import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      encounters: [],
    };
  }

  handleMonsterSubmit = async (e) => {
    e.preventDefault();
    document
      .getElementById("submitMonsterButton")
      .setAttribute("disabled", "true");
    document
      .getElementById("submitMonsterButton")
      .classList.add("class", "visually-hidden");
    document
      .getElementById("loadingMonsterButton")
      .classList.remove("visually-hidden");
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
      document.getElementById("monsterForm").reset();
      document
        .getElementById("loadingMonsterButton")
        .classList.add("class", "visually-hidden");
      document
        .getElementById("submitMonsterButton")
        .classList.remove("visually-hidden");
      document
        .getElementById("submitMonsterButton")
        .removeAttribute("disabled");
    } catch (error) {
      console.error(error);
    }
  };

  handleEncounterSubmit = async (e) => {
    e.preventDefault();
    let request = "";
    for (let i = 0; i < this.state.monsters.length; i++) {
      if (e.target[`monster${i}`].value > 0) {
        request += `${e.target[`monster${i}`].value} ${
          this.state.monsters[i].monster
        }`;
        if (e.target[`monster${i}`].value > 1) {
          request += "s";
        }
        request += ", ";
      }
    }
    console.log(request);
    if (request === "") {
      alert("You have to submit at least 1 monster to build an encounter!");
      return;
    }
    document
      .getElementById("submitEncounterButton")
      .setAttribute("disabled", "true");
    document
      .getElementById("submitEncounterButton")
      .classList.add("class", "visually-hidden");
    document
      .getElementById("loadingEncounterButton")
      .classList.remove("visually-hidden");
    try {
      const API = process.env.REACT_APP_API_URL;
      const url = `${API}/encounter`;
      const response = await axios.get(url, {
        params: {
          monsters: request,
        },
      });
      console.log(response.data);
      this.setState({ encounters: [...this.state.encounters, response.data] });
      document.getElementById("encounterForm").reset();
      document
        .getElementById("loadingEncounterButton")
        .classList.add("class", "visually-hidden");
      document
        .getElementById("submitEncounterButton")
        .classList.remove("visually-hidden");
      document
        .getElementById("submitEncounterButton")
        .removeAttribute("disabled");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Container>
        <Row key="carousel">
          <h1 className="text-center w-75 mx-auto">AI Generated Monsters and Adventures!</h1>
          <Carousel fade className="w-75 mx-auto mb-3">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1529981188441-8a2e6fe30103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Harness the Power of AI</h3>
                <p>
                  Adventures limited only by imagination
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row key="a">
          <Col>
            <Form
              onSubmit={this.handleMonsterSubmit}
              className="w-75 mx-auto p-3 border border-primary border-2 rounded"
              id="monsterForm"
            >
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description of Monster</Form.Label>
                <Form.Control type="text" placeholder="eg. large and scary" />
                <Form.Text className="text-muted">
                  Enter the monster's description.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Type of Monster</Form.Label>
                <Form.Control type="text" placeholder="eg. Elephant Zombie" />
                <Form.Text className="text-muted">
                  Enter the monster's species.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 w-50" controlId="cr">
                <Form.Label>Challenge Rating</Form.Label>
                <Form.Control type="number" min="1" max="25" />
              </Form.Group>
              <Button variant="primary" type="submit" id="submitMonsterButton">
                Generate Monster
              </Button>
              <Button
                variant="primary"
                disabled
                className="visually-hidden"
                id="loadingMonsterButton"
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </Button>
            </Form>
          </Col>
        </Row>
        <Row key="b">
          {this.state.monsters.length ? (
            <Col>
              <Form
                onSubmit={this.handleEncounterSubmit}
                className="w-75 mx-auto p-3 border border-primary border-2 rounded"
                id="encounterForm"
              >
                <h3 className="text-center">Make a random encounter!</h3>
                {this.state.monsters.map((monster, i) => {
                  return (
                    <Form.Group
                      className="mb-3 w-50"
                      controlId={`monster${i}`}
                      key={i}
                    >
                      <Form.Label>Number of {monster.monster}s</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={0}
                      />
                    </Form.Group>
                  );
                })}
                <Button
                  variant="primary"
                  type="submit"
                  id="submitEncounterButton"
                >
                  Make Encounter
                </Button>
                <Button
                  variant="primary"
                  disabled
                  className="visually-hidden"
                  id="loadingEncounterButton"
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </Button>
              </Form>
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row key="c">
          {this.state.encounters.length ? (
            <Accordion defaultActiveKey="0" className="w-75 mx-auto">
              {this.state.encounters.map((encounter, i) => {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>Encounter {i + 1}</Accordion.Header>
                    <Accordion.Body>{encounter}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          ) : (
            <></>
          )}
        </Row>
        <Row key="d">
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
