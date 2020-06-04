import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardImg, CardBody, Button, NavLink, ListGroup, ListGroupItem
} from 'reactstrap';
import * as Constants from './constants';
import './UserPage.css';

function ProjectList({projects}) {
    return (
        <ListGroup style={{width: "70%"}}>
            {
                projects.map(([name, id]) => {
                    const url = "/projects/" + id;
                    return <ListGroupItem><NavLink href={url}>{name}</NavLink></ListGroupItem>
                })
            }
        </ListGroup>
    )
}

function Profile({person, visiting}) {
    return (
        <div className="Profile">
            {!visiting ? 
                <div><h1>Hi, {person.name}</h1></div> :
                <div id="Profile-name"><h1>{person.name}</h1></div>
            }
            {/*todo?: optional relationship markers - e.g. Leader, Teammate*/}
            <p className="Email">{person.email}</p>
            <p className="Skills"><b>My skills:</b> {person.skills}</p>
            <p className="Interests"><b>Project interests:</b> {person.interests}</p>
            <p className="Bio"><b>About me:</b> {person.bio}</p>
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
        };
    }

    componentDidMount() {
        let userToGet;
        if(this.props.visiting)
            userToGet = this.props.match.params.userId;
        else if(this.props.user)
            userToGet = this.props.user.id;
        else
            return;
        fetch(`${Constants.USER_LIST_URL}${userToGet}`)
            .then((resp) => {
                if (!resp.ok) {
                    // Invokes the .catch() handler
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then((data) => {
                /*const incomplete = () => {
                    Object.keys(this.state.person).map((key) => {
                        if (!this.state.person[key]) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }*/
                let projects = [];
                for (let i = 0; i < data.owned_projects.length; i++) {
                    let currproject = data.owned_projects[i];
                    projects.push([currproject.name,currproject.id]);
                }
                for (let i = 0; i < data.member_of.length; i++) {
                    let curproject = data.member_of[i];
                    projects.push([curproject.name,curproject.id]);
                }
                this.setState({
                    person: {
                        name: data.first_name + " " + data.last_name,
                        username: data.username,
                        email: data.email,
                        skills: data.profile.skills,
                        interests: data.profile.interests,
                        bio: data.profile.bio,
                        projects: projects,
                        image: data.profile.picture,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({person: {failed: true, error: error}});
            });
    }

    render() {
        const incomplete = (() => {
            const objects = Object.keys(this.state.person).map((key) => {
                if (!this.state.person[key]) {
                    return true;
                } else {
                    return false;
                }
            });
            return objects.includes(true);
        })();

        return (
            <div className="UserPage">
                <Card style={{width: "80%", height: "80%"}} className="mx-auto my-auto">
                    <CardImg top width="100%" style={{maxHeight: 250, maxWidth: 250}} src={this.state.person.image} alt="Profile Picture"/>
                    <CardBody>
                        <Profile person={this.state.person} visiting={this.props.visiting}/>
                        {!this.props.visiting && incomplete && (
                            <div>
                                <h5>Your profile seems incomplete!</h5>
                                <h6>Please complete your profile below:</h6>
                            </div>
                        )}
                        { !this.props.visiting && (
                            <Button><NavLink href="/profile/edit" style={{color: 'white', textDecoration: 'none'}}>
                                Edit Profile
                            </NavLink></Button>
                        )}
                    </CardBody>
                </Card>
                <br/>
                {this.state.person.projects ?
                    <div style={{width: "80%"}} className="mx-auto my-auto">
                        <h4 className="pl-2">My Projects</h4>
                        <ProjectList projects={this.state.person.projects}/>
                    </div> : <div/>
                }
            </div>
        );
    }
}

export default UserPage;
