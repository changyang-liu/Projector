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
    const { 
      members, 
      joinRequests, 
      owner, 
      user, 
      open, 
      closeOnClick, 
      acceptOnClick,
      denyOnClick
    } = this.props;

    // Create member list with project owner at top, join request list, then member list.
    // Join request list and member list are individually alphabetically sorted.
    let sortedMembers = members.slice();
    sortedMembers.sort((a, b) => a.username.localeCompare(b.username));

    let sortedJoinRequests = joinRequests.slice();
    sortedJoinRequests.sort((a, b) => a.username.localeCompare(b.username));

    // Add owner to top of the list
    let memberListElements = [
      <ListGroupItem key={0} tag="a" href="/" action>
        {owner.username} <Badge pill>Owner</Badge>
      </ListGroupItem>
    ];

    // Show join requests next, but only if the viewer is the owner
    if(user.id === owner.id) {
      memberListElements = memberListElements.concat(sortedJoinRequests.map((request, i) => (
        <ListGroupItem key={i+1} tag="a" href="/" action>
          <span style={{"verticalAlign": "middle"}}>
            {request.username}
          </span>
          <span className="float-right">
            <Button 
              onClick={(event) => {
                acceptOnClick({ 
                  id: request.id, 
                  username: request.username, 
                  email: request.email 
                });

                // This stops the list group item link from firing on button click
                event.preventDefault();
                event.stopPropagation();
              }}
              className="modal-request-button"
              size="sm"
              color="success"
            >
              Accept
            </Button>
            <Button 
              onClick={(event) => {
                denyOnClick({ 
                  id: request.id, 
                  username: request.username, 
                  email: request.email 
                });

                // This stops the list group item link from firing on button click
                event.preventDefault();
                event.stopPropagation();
              }} 
              className="modal-request-button"
              size="sm"
              color="danger"
            >
              Deny
            </Button>
          </span>
        </ListGroupItem>
      )));
    }

    // Add other actual members afterward
    memberListElements = memberListElements.concat(sortedMembers.map((member, i) => (
      <ListGroupItem key={i+memberListElements.length+1} tag="a" href="/" action>
        {member.username}
      </ListGroupItem>
    )));

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
          <Button color="primary" onClick={closeOnClick}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
