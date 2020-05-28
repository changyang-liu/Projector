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
        blurb: '',
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
        if(key === "owner")
          formFields[key] = json[key].username;
        else
          formFields[key] = json[key];
      }
      this.setState({formFields})
    }else if(this.props.user) {
      this.setState((oldState) => oldState.formFields.owner = this.props.user.email);
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
        'Authorization': `Bearer ${this.props.user.access_token}`
      },
      body: data
    });
    if(this.props.edit ? response.status === 200 : response.status === 201){
      const json = await response.json();
      this.props.history.push('/projects/' + json.id.toString());
      alert(this.props.edit ? "Successfully edited" : "Successfully created");
    }else{
      alert("Error: failed to submit");
    }
  }

  render() {
    if(this.props.edit && this.props.user && this.props.user.email !== this.state.formFields.owner) {
      return <div>You do not have permission to view this page!</div>;
    }

    const canRenderCategory = ((this.props.edit && this.state.formFields.category !== "") || !this.props.edit);

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
            maxLength={Constants.MAX_PROJECT_LENGTH}
            required
          />

          <Label for='ownerfield'>Owner*</Label>
          <Input
            type='text'
            name='owner'
            id='ownerfield'
            value={this.state.formFields.owner}
            maxLength={Constants.MAX_USER_LENGTH}
            disabled
            required
          />

          <Label for='catselect'>Select Category*</Label>
          {canRenderCategory && 
          <Input
            type='select'
            name='category'
            id='catselect'
            defaultValue={this.state.formFields.category}
            required
          >
            {Object.keys(Constants.CATEGORIES).map(e => 
              <option value={e}>
                {Constants.CATEGORIES[e]}
              </option>
            )}
          </Input>
          }

          <h3 id='header2'>More info</h3>

          <Label for='blurbfield'>Blurb</Label>
          <Input
            type='text'
            name='blurb'
            id='blurbfield'
            defaultValue={this.state.formFields.blurb}
            maxLength={Constants.MAX_BLURB_LENGTH}
          />

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
