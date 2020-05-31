import '../form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter, Redirect} from 'react-router-dom';
import * as Constants from '../constants';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            first_name: null,
            last_name: null,
            picture: null,
            bio: null,
            interests: null,
            skills: null,
        }
    }

    componentDidMount() {
        fetch(`${Constants.USER_LIST_URL}${this.props.user.id}`)
            .then((resp) => {
                if (!resp.ok) {
                    // Invokes the .catch() handler
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then((data) => {
                this.setState({
                    username: data.username,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    picture: data.profile.picture,
                    bio: data.profile.bio,
                    interests: data.profile.interests,
                    skills: data.profile.skills,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({person: {failed: true, error: error}});
            });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const url = Constants.USER_LIST_URL + this.props.user.id + '/profile';
        const method = 'PUT';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user.access_token}`
            },
            body: data
        });
        /*todo: fix pushing to server*/
        if (response.status === 200) {
            await response.json();
            this.props.history.push('/profile');
            alert("Profile successfully updated");
        } else {
            alert("Error: failed to submit");
        }
    }

    render() {
        if (!this.props.user) {
            return <Redirect to={{pathname: '/login', state: {redirectURL: this.props.location}}}/>
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for='first_name'>First Name*</Label>
                    <Input
                        type='text'
                        name='first_name'
                        id='first_name'
                        placeholder='Enter your name here'
                        defaultValue={this.state.first_name}
                        maxLength={Constants.MAX_NAME_LENGTH}
                        required
                        onChange={this.handleChange}
                    />

                    <Label for='last_name'>Last Name*</Label>
                    <Input
                        type='text'
                        name='last_name'
                        id='last_name'
                        placeholder='Enter your name here'
                        defaultValue={this.state.last_name}
                        maxLength={Constants.MAX_NAME_LENGTH}
                        required
                        onChange={this.handleChange}
                    />

                    <Label for='email'>Email*</Label>
                    <Input
                        type='text'
                        name='email'
                        id='email'
                        value={this.state.email}
                        maxLength={Constants.MAX_USER_LENGTH}
                        disabled
                        required
                    />

                    <Label for='skills'>Skills*</Label>
                    <Input
                        type='text'
                        name='skills'
                        id='skills'
                        placeholder="What's your favourite tech stack?"
                        defaultValue={this.state.skills}
                        maxLength={Constants.MAX_USER_FIELD_LENGTH}
                        onChange={this.handleChange}
                    />

                    <Label for='interests'>Interests*</Label>
                    <Input
                        type='text'
                        name='interests'
                        id='interests'
                        placeholder="What projects would you like to work on?"
                        defaultValue={this.state.interests}
                        maxLength={Constants.MAX_USER_FIELD_LENGTH}
                        onChange={this.handleChange}
                    />

                    <Label for='bio'>Bio</Label>
                    <Input
                        type='textarea'
                        name='bio'
                        id='bio'
                        placeholder='Tell us more about yourself!'
                        defaultValue={this.state.bio}
                        maxLength={Constants.MAX_BIO_LENGTH}
                        onChange={this.handleChange}
                    />

                    <Label for='picture'>Upload Profile Picture</Label>
                    <Input
                        type='link'
                        name='picture'
                        id='picture'
                        placeholder="Link your picture here (.jpg or .png)"
                        defaultValue={this.state.picture}
                        onChange={this.handleChange}
                        /*todo?: implement image preview?*/
                    />
                </FormGroup>

                <Button color='primary'>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(UserForm);
