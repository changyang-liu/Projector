import './App.css';

import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import * as Constants from './constants';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import MemberModal from './components/MemberModal';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: undefined,
            showMembers: false,
        };
        this.toggleMemberList = this.toggleMemberList.bind(this);
        this.processJoinOrAccept = this.processJoinOrAccept.bind(this);
    }

    componentDidMount() {
        fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}`)
            .then((resp) => {
                if (!resp.ok) {
                    // Invokes the .catch() handler
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then((data) => {
                this.setState({ project: { failed: false, data: data } });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ project: { failed: true, error: error } });
            });
    }

    toggleMemberList() {
        this.setState({
            showMembers: !this.state.showMembers,
        });
    }

    processJoinOrAccept = async (type, userInfo) => {
        if(!this.props.user) {
            alert("Please login or create an account first to join!");
            return;
        }
        
        const response = await fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}/join`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.access_token}`
            },
            body: JSON.stringify({
                user: userInfo,
                type: type
            })
        });
        if(response.status === 200) {
            const data = await response.json();
            await this.setState({
                project: { failed: false, data: data }
            })
        } else {
            alert("Sorry, an error has occured in your request. Please try again later.");
        }
    }

    render() {
        const { project } = this.state;
        if (project === undefined) {
            // This means that we are still waiting for the data to be fetched.
            // This could show some loading icon/message if we want.
            return <p>Loading...</p>;
        }

        if (project.failed) {
            return <p>{'' + project.error}</p>;
        }

        const { data } = project;

        let videoId = null;
        try {
            const youtubeUrl = new URL(data.video);
            const params = new URLSearchParams(youtubeUrl.search);
            videoId = params.get('v');
        } catch {
            // There's no video, or the URL is malformed
        }

        let slidesEmbedUrl = null;
        try {
            const slidesUrl = new URL(data.deck);
            const key = slidesUrl.pathname.replace(/\/presentation\/d\/(.*)\/.*/g, '$1');
            slidesEmbedUrl = `https://docs.google.com/presentation/d/${key}/embed?start=false&loop=false&delayms=5000`;
        } catch {
            // There's no slides, or the URL is malformed
        }

        return (
            <div className="ProjectPage-container">
                <div className="ProjectPage-leftpanel">
                    <img className="card-img" src={data.logo} />
                    <p style={{ marginTop: 16 }}>Owner: {data.owner.username}</p>
                    <p>
                        Category <Badge color="secondary">{data.category}</Badge>
                    </p>
                    <p>
                        Status <Badge color="secondary">{data.status}</Badge>
                    </p>
                    {(this.props.user && this.props.user.email === data.owner.email) ? 
                        // Show the edit button for the project owner
                        (<Link
                              style={{ marginTop: 16 }}
                              className="btn btn-secondary"
                              to={`/projects/${this.props.match.params.projectId}/edit`}
                          >
                            Edit
                        </Link>) : 
                    ((this.props.user && !data.members.find(member => member.id === this.props.user.id) &&
                      !data.join_requests.find(request => request.id === this.props.user.id)) ?
                        // Show the join button if the user is not a member nor in the join request list
                        (<Button 
                              color="primary" 
                              onClick={() => this.processJoinOrAccept(Constants.JOIN_REQUEST_CODE, {
                                  id: this.props.user.id,
                                  username: this.props.user.email,
                                  email: this.props.user.email,
                              }
                          )}>
                            Join {data.name}!
                        </Button>) :
                    (this.props.user &&
                        // Show the cancel join button if the user is in the join request list
                        (<Button 
                              color="primary" 
                              onClick={() => this.processJoinOrAccept(Constants.CANCEL_JOIN_CODE, {
                                  id: this.props.user.id,
                                  username: this.props.user.email,
                                  email: this.props.user.email,
                              }
                          )}>
                            Cancel Join
                        </Button>)
                    ))}
                    <br />
                    <Button color="primary" onClick={this.toggleMemberList}>
                        See Who's Joined
                    </Button>
                </div>
                <div className="ProjectPage-rightpanel">
                    <div className="ProjectPage-header-container">
                        <h1 className="ProjectPage-title">{data.name}</h1>
                    </div>
                    <h5 style={{ marginTop: 16 }}>{data.blurb}</h5>
                    <hr/>
                    <div className="ProjectPage-media-container">
                        {videoId && (
                            <YouTube videoId={videoId} containerClassName="ProjectPage-youtube-container" className="ProjectPage-youtube" />
                        )}
                        {slidesEmbedUrl && (
                            <div className="ProjectPage-slides-container">
                                <iframe title="Project Slides" src={slidesEmbedUrl} width="100%" height="100%" allowFullScreen={true} />
                            </div>
                        )}
                    </div>
                    <p>{data.description}</p>
                </div>
                {data && (
                    <MemberModal
                        members={data.members}
                        joinRequests={data.join_requests}
                        owner={data.owner}
                        user={this.props.user}
                        open={this.state.showMembers}
                        closeOnClick={this.toggleMemberList}
                        acceptOnClick={(userInfo) => 
                            this.processJoinOrAccept(Constants.ACCEPT_JOIN_CODE, userInfo)
                        }
                        denyOnClick={(userInfo) => 
                            this.processJoinOrAccept(Constants.CANCEL_JOIN_CODE, userInfo)
                        }
                    />
                )}
            </div>
        );
    }
}

export default ProjectPage;
