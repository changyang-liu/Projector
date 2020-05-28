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

    // Re-order member list alphabetically + display project owner at top
    let sortedMembers = members.slice();
    sortedMembers.sort((a, b) => a.username.localeCompare(b.username))
    sortedMembers.unshift(owner);

    const memberListElements = sortedMembers.map((member, i) => (
      <ListGroupItem key={i} tag="a" href="/" action>
        {member.username} {(member.username === owner.username) && <Badge pill>Owner</Badge>}
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
