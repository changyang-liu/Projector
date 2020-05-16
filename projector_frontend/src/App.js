//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage';
import * as Constants from './constants';

import ProjectForm from './components/project-form.js'



class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        projects: null
      }
      this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
      fetch(Constants.PROJECT_LIST_URL)
        .then(response => response.json())
        .then(data => this.setState({ projects: data }))
        .catch(err => console.log(err));
    }

    handleSearch(event) {
      let newList = [];

      if (event.target.value !== "") {
        // Search query is not empty, so filter projects by title
        let currentList = this.state.projects;

        // TODO: make a better search that doesn't search only project titles
        newList = currentList.filter(project => {
          const lc = project.name.toLowerCase();
          const filter = event.target.value.toLowerCase();
          return lc.includes(filter);
        });

      } else {
        // If search query is empty, show all projects
        newList = this.state.projects;
      }

      this.setState({
        filtered: newList
      });
    }

    getProjectTiles() {
      const { projects, filtered } = this.state;
      const toUse = filtered ? filtered : projects;

      let indexPage;
      
      if(projects) {
        // Generate project tiles from filtered or projects list
        indexPage = toUse.map(project => (
          <Col xs="auto" className="mb-4 d-flex align-items-stretch" key={project.id}>
            <ProjectTile key={project.id} project={project} />
          </Col>
        ));
      } else {
        // Show loading page if projects haven't been fetched yet
        indexPage = (<div>Loading...</div>);
      }

      return indexPage;
    }

    render() {
      const { projects } = this.state;

      return (
        <Router>
          <Route exact={true} path='/' render={() => (
            <div>
              <div className="title"> 
                Projector
              </div>
              {/* TODO: improve search styling */}
              <SearchBox handleSearch={this.handleSearch}></SearchBox>
              <Container className="mt-4">
                <Row className="justify-content-center">
                  {this.getProjectTiles()}
                </Row>
              </Container>
            </div>
          )} />
          <Route path='/projects/:projectId' render={(props) => <ProjectPage {...props} projects={projects} />} />
          <Route path='/projects/create' render={() => <ProjectForm />} />
        </Router>
      );
    }
}

const ProjectTile = ({ project }) => {
  let logo = project.logo ? (Constants.PROJECT_LOGO_PATH + project.logo) : Constants.DEFAULT_PROJECT_LOGO;

  return (
    <Card>
      <CardImg variant="top" src={logo} alt="Project Logo" />
      <CardBody>
        <CardTitle>
          {project.name}
          <div>
            {/* Neaten the badge layout */}
            <Badge color="secondary">{project.category}</Badge>
          </div>
        </CardTitle>
        <a href={`/projects/${project.id}`} className="stretched-link">{project.description}</a>
      </CardBody>
    </Card>
  );
};

const SearchBox = ({ handleSearch }) => (
  <span>
    <input 
      type="text"
      placeholder="Search for projects"
      onChange={handleSearch}
      className="search-box"
    />
  </span>
);

export default App;
