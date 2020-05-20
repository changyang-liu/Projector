import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default class MemberModal extends Component {
  render() {
    const { open, onClick } = this.props;
    return (
      <Modal isOpen={open}>
        <ModalHeader>
          List of Members
        </ModalHeader>
        <ModalBody>
          {/* TODO: Show list of all the members who have joined */}
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
