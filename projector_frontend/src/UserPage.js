import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, NavLink
} from 'reactstrap';
import * as Constants from './constants';
//import UserForm from './components/user-form';

function Image(props) {
    return (
        <div className="Image" style={{backgroundImage: 'url(' + props.src + ')'}}></div>
    );
}

function Profile({person, projects}) {
    return (
        <div className="Profile">
            <h1 className="Name">Hi, {person.name}</h1>
            <p className="Email">{person.email}</p>
            <p className="Skills">My skills: {person.skills}</p>
            <p className="Interests">Project interests: {person.interests}</p>
            <p className="Bio">About me: {person.bio}</p>
            <div className="User-Projects">
            </div>
        </div>
    );
}

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: null,
                username: null,
                email: null,
                skills: null,
                interests: null,
                bio: null,
                projects: null,
                image: null,
            },
            incomplete: true,
        };
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
                const incomplete = () => {
                    Object.keys(this.state.person).map((key) => {
                        if (!this.state.person[key]) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
                this.setState({
                    person: {
                        name: data.first_name + " " + data.last_name,
                        username: data.username,
                        email: data.email,
                        skills: data.profile.skills,
                        interests: data.profile.interests,
                        bio: data.profile.bio,
                        projects: [],
                        image: data.profile.picture,
                    },
                    incomplete: incomplete,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({person: {failed: true, error: error}});
            });
    }

    render() {
        return (
            <div className="UserPage">
                <Card style={{width: "80%", height: "80%"}} className="mx-auto my-auto">
                    <CardImg top width="50%" src={this.state.person.image} alt="Profile Picture"/>
                    <CardBody>
                        <CardText>
                            <Profile person={this.state.person}/>
                            {(() => {
                                if (this.state.incomplete) {
                                    return (
                                        <div>
                                            <h5>Your profile seems incomplete!</h5>
                                            <h6>Please complete your profile below:</h6>
                                        </div>)
                                }
                            })()}
                        </CardText>
                        <Button><NavLink href="/profile/edit" style={{color: 'white', textDecoration: 'none'}}>
                            Edit Profile
                        </NavLink></Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default UserPage;
