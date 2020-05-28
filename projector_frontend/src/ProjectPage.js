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
        this.processJoin = this.processJoin.bind(this);
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

    processJoin = async () => {
        if(!this.props.user) {
            alert("Please login or create an account first to join!");
            return;
        }

        let projectMembers = this.state.project.data.members;

        // TODO: get actual user information
        let user = {
            id: this.props.user.id,
            username: this.props.user.email,
            email: this.props.user.email,
        };
        projectMembers.push(user);

        const response = await fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}/join`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.access_token}`
            },
            body: JSON.stringify({
                members: projectMembers
            })
        });
        if(response.status === 200) {
            const data = await response.json();
            alert(`Successfully joined ${this.state.project.data.name}!`);
            await this.setState({
                project: { failed: false, data: data }
            })
        } else {
            alert("Error: failed to submit");
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

        // const logoUrl = data.logo !== Constants.DEFAULT_PROJECT_LOGO ? Constants.PROJECT_LOGO_PATH + data.logo : null;
        return (
            <div className="ProjectPage-container">
                <div className="ProjectPage-leftpanel">
                    <p>Owner: {data.owner.username}</p>
                    <p>
                        Category <Badge color="secondary">{data.category}</Badge>
                    </p>
                    {(this.props.user && this.props.user.email === data.owner.email) ? 
                        (<Link
                            style={{ marginTop: 16 }}
                            className="btn btn-secondary"
                            to={`/projects/${this.props.match.params.projectId}/edit`}
                          >
                            Edit
                        </Link>) : 
                        (!data.members.find(member => member.email === this.props.user.email) && <Button color="primary" onClick={this.processJoin}>
                            Join {data.name}!
                        </Button>)
                    }
                    <br />
                    <Button color="primary" onClick={this.toggleMemberList}>
                        See Who's Joined
                    </Button>
                </div>
                <div className="ProjectPage-rightpanel">
                    <div className="ProjectPage-header-container">
                        <h1 className="ProjectPage-title">{data.name}</h1>
                    </div>
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
                    <p style={{ marginTop: 16 }}>{data.description}</p>
                </div>
                {data && (
                    <MemberModal
                        members={data.members}
                        owner={data.owner}
                        open={this.state.showMembers}
                        onClick={this.toggleMemberList}
                    />
                )}
            </div>
        );
    }
}

export default ProjectPage;
