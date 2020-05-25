import React, { Component } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export default class MemberModal extends Component {
  render() {
    const { members, owner, open, onClick } = this.props;
    const memberListElements = members.map((m, i) => (
      <ListGroupItem key={i} tag="a" href="/" action>
        {m.username} {(m.username === owner) && <Badge pill>Owner</Badge>}
      </ListGroupItem>
    ));

    return (
      <Modal isOpen={open}>
        <ModalHeader>
          List of Members
        </ModalHeader>
        <ModalBody>
          <ListGroup>
            {memberListElements}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClick}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
