import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DataCard(props) {
  return (
    <div>
      <Card
        style={{
          width: "20rem",
          backgroundColor: "white",
          paddingTop: "2rem",
          paddingBottom: "0.75rem",
          marginBottom: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Card.Img
          variant="top"
          src={props.image}
          style={{ width: "80%", aspectRatio: "1/1" }}
        />
        <Card.Body style={{ color: "black" }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DataCard;
