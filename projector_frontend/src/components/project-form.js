import '../App.css';
import '../form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      formFields: {
        name: '',
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const url = 'http://127.0.0.1:8080/projects/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data
    })
    .then((response) => {
      //TODO: Add redirect for successful response
      alert(response.status);
      console.log(response);
    });
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <h3>Basic details</h3>
          <Label for='namefield'>Project Name*</Label>
          <Input
            type='text'
            name='name'
            id='namefield'
            placeholder='Enter name here'
            required
          />

          <Label for='ownerfield'>Owner*</Label>
          <Input
            type='text'
            name='owner'
            id='ownerfield'
            placeholder='Enter owner here'
            required
          />

          <Label for='catselect'>Select Category*</Label>
          <Input
            type='select'
            name='category'
            id='catselect'
            required
          >
            <option value='GEN'>General</option>
            <option value='TEC'>Technology</option>
            <option value='SER'>Service</option>
            <option value='MED'>Media</option>
            <option value='GAM'>Games</option>
          </Input>

          <h3 id='header2'>More info</h3>

          <Label for='descfield'>Description</Label>
          <Input
            type='textarea'
            name='description'
            id='descfield'
          />

          <Label for='vidfield'>Video</Label>
          <Input
            type='text'
            name='video'
            id='vidfield'
            placeholder='Youtube URL'
          />

          <Label for='deckfield'>Deck</Label>
          <Input
            type='text'
            name='deck'
            id='deckfield'
            placeholder='Google Slides URL'
          />

          <Label for='logofield'>Upload Logo</Label>
          <Input
            type='file'
            name='logo'
            id='logofield'
            accept='image/jpeg, image/png'
          />
        </FormGroup>

        <Button color='primary'>Submit</Button>
      </Form>
    )
  }
}

export default ProjectForm
