//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { CardDeck, Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

    state = {
      projects: null
    }

    componentDidMount() {
      // TODO: Fetch project data
      this.setState({
        projects: [
        {
          id: 1,
          title: "Projector",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 2,
          title: "Another Project",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 3,
          title: "Project #3",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 4,
          title: "Project #4",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 5,
          title: "Project #5",
          description: "This is just a sample description so that you can figure out what's going on here."
        }
        ]
      });
    }

    render() {
      const { projects } = this.state;
      let indexPage;
      
      if(projects) {
        let projectTiles = projects.map(project => (
          <ProjectTile key={project.id} project={project} />
        ));
        indexPage = [];

        while(projectTiles.length > 3) {
          indexPage.push((
            <CardDeck className="mx-auto">
              {projectTiles.splice(0, 4)}
            </CardDeck>
          ));
        }
      } else {
        indexPage = (<div>Loading...</div>);
      }

      return (
        <Router>
          {/*Split up index page into separate component?*/}
          <Route exact={true} path='/' render={() => (
            <div>
              <div className="title"> Projector </div>
              {indexPage}
            </div>
          )} />
          {/*TODO: Project page component*/}
          <Route path='/projects/:projectId' component={ProjectPage} />
        </Router>
      );
    }
}

const ProjectPage = ({ match }) => (
  <div>
    You are now viewing project #{match.params.projectId}.
  </div>
)

const ProjectTile = ({ project }) => (
  <Card>
      {/* TODO: project logo */}
      <CardImg variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="Project Logo" />
      <CardBody>
        <CardTitle>{project.title}</CardTitle>
        <a href={`/projects/${project.id}`} className="stretched-link">{project.description}</a>
      </CardBody>
  </Card>
)

export default App;
