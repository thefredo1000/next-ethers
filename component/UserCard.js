import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LENS_ABI from "../ABI/LensHub.json";
import UIDATAPROVIDER_ABI from "../ABI/UIDataProvider";
import { ethers } from "ethers";

function UserCard(props) {

  return (
    <div
      style={{
        width: "20rem",
        backgroundColor: "white",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        marginBottom: "1rem",
        borderRadius: "1rem",
      }}
    >
      <Row>
        <Col>
          <Image
            variant="top"
            src={
                props.profileImageURI ? props.profileImageURI : "https://via.placeholder.com/150"
            }
            style={{ width: "75%", aspectRatio: "1/1", borderRadius: "50%", objectFit: "cover" }}
          />
        </Col>
        <Col style={{ color: "black" }}>
          <h1>{props.handle}</h1>
        </Col>
      </Row>
    </div>
  );
}

export default UserCard;
