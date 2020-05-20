import '../App.css';
import '../form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import * as Constants from '../constants';

class ProjectForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formFields: {
        name: '',
        owner: '',
        category: '',
        description: '',
        video: '',
        deck: '',
        logo: '',
      }
    }
  }

  componentDidMount = async () => {
    if(this.props.edit){
      const res = await fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}`);
      const json = await res.json();
      const formFields = this.state.formFields;
      for(let key in formFields){
        formFields[key] = json[key];
      }
      this.setState({formFields})
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let url = Constants.PROJECT_LIST_URL;
    let method;
    if(this.props.edit){
      url += this.props.match.params.projectId;
      method ='PUT'
    }else{
      method='POST'
    }
    const response = await fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
      },
      body: data
    });
    if(response.status === 201){
      const json = await response.json();
      this.props.history.push('/projects/' + json.id.toString());
      alert(this.props.edit ? "Successfully edited" : "Successfully created");
    }else{
      alert("Error: failed to submit");
    }
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
            defaultValue={this.state.formFields.name}
            required
          />

          <Label for='ownerfield'>Owner*</Label>
          <Input
            type='text'
            name='owner'
            id='ownerfield'
            placeholder='Enter owner here'
            defaultValue={this.state.formFields.owner}
            required
          />

          <Label for='catselect'>Select Category*</Label>
          <Input
            type='select'
            name='category'
            id='catselect'
            defaultValue={this.state.formFields.category} //NOTE this does not work for whatever reason
            required
          >
            <option value='GEN'>General</option>
            <option value='TEC'>Technology</option>
            <option value='SVC'>Service</option>
            <option value='MED'>Media</option>
            <option value='GAM'>Games</option>
          </Input>

          <h3 id='header2'>More info</h3>

          <Label for='descfield'>Description</Label>
          <Input
            type='textarea'
            name='description'
            id='descfield'
            defaultValue={this.state.formFields.description}
          />

          <Label for='vidfield'>Video</Label>
          <Input
            type='text'
            name='video'
            id='vidfield'
            placeholder='Youtube URL'
            defaultValue={this.state.formFields.video}
          />

          <Label for='deckfield'>Deck</Label>
          <Input
            type='text'
            name='deck'
            id='deckfield'
            placeholder='Google Slides URL'
            defaultValue={this.state.formFields.deck}
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

export default withRouter(ProjectForm);
