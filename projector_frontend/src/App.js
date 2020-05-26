//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardImg, 
  CardTitle, 
  CardBody, 
  Badge 
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProjectPage from './ProjectPage';
import ProjectForm from './components/project-form'
import Header from './components/Header';
import Footer from './components/Footer';
import * as Constants from './constants';
import LoginPage from './LoginPage';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        projects: null,
        user: null
      }
      this.login = this.login.bind(this);
      this.refreshUserToken = this.refreshUserToken.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    login(user) {
      this.setState({ user: user });
      localStorage.setItem('Projector-User', JSON.stringify(user));
    }

    logout() {
      localStorage.removeItem('Projector-User');
      this.setState({ user: null });
    }

    refreshUserToken(refreshToken) {
      fetch(Constants.OAUTH_REFRESH_URL, { 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }) 
      })
        .then(resp => resp.json())
        .then(data => this.setState(oldState => { oldState.user.access_token = data.access; }))
        .catch(err => console.log(err));
    }

    componentDidMount() {
      fetch(Constants.PROJECT_LIST_URL)
        .then(response => response.json())
        .then(data => this.setState({ projects: data }))
        .catch(err => console.log(err));

        const userString = localStorage.getItem('Projector-User');
        if (userString) {
          const user = JSON.parse(userString);
          this.setState({ user: user });
          this.refreshUserToken(user.refresh_token);
        }
    }

    handleSearch(event) {
      let filteredList = [];
      let query = event.target.value;
      const { projects } = this.state;

      if (projects && query !== "") {
        // Search query is not empty, so filter projects by title
        query = query.toLowerCase().split(" ");

        // TODO: search + sort by relevancy?
        filteredList = projects.filter(project => {
          const projectName = project.name.toLowerCase();
          const projectBlurb = project.blurb.toLowerCase();
          const projectDescription = project.description.toLowerCase();
          return query.some(term => (projectName.includes(term) ||
                                     projectBlurb.includes(term) ||
                                     projectDescription.includes(term)));
        });

      } else {
        // If search query is empty, show all projects
        filteredList = projects;
      }

      this.setState({
        filtered: filteredList
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
      return (
        <div className="wrapper">
          <Header user={this.state.user} />
          <div className="page-body">
            <Router>
              <Switch>
                <Route exact={true} path='/' render={() => (
                  <div>
                    <div className="top">
                      <SearchBox handleSearch={this.handleSearch} disabled={!this.state.projects} />
                      <span id="new-project">
                        {this.state.projects ? 
                          <Link to='/projects/create' className="btn btn-outline-primary">Add new project</Link> :
                          <Link to='/projects/create' className="btn btn-outline-primary" style={{ pointerEvents: 'none' }}>Add new project</Link>
                        }
                      </span>
                    </div>
                    <Container className="mt-4">
                      <Row className="justify-content-center">
                        {this.getProjectTiles()}
                      </Row>
                    </Container>
                  </div>
                )} />
                <Route exact path='/login' 
                       render={props => <LoginPage {...props} onLogin={this.login} />}  
                />
                <Route exact path='/projects/create' component={ProjectForm} />
                <Route exact path='/projects/:projectId' component={ProjectPage} />
                <Route exact path='/projects/:projectId/edit'
                  render={() => (
                    <ProjectForm edit={true}/>
                  )}
                />
              </Switch>
            </Router>
          </div>
          <div className="page-footer">
            <Footer />
          </div>
        </div>
        
      );
    }
}

const ProjectTile = ({ project }) => {
  let logo = Constants.PROJECT_LOGO_PATH;
  logo += project.logo ? project.logo : Constants.DEFAULT_PROJECT_LOGO;

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
        <a href={`/projects/${project.id}`} className="stretched-link">{project.blurb}</a>
      </CardBody>
    </Card>
  );
};

const SearchBox = ({ handleSearch, disabled }) => (
  <span>
    <input 
      type="text"
      placeholder="Search for projects"
      onChange={handleSearch}
      id="search-box"
      disabled={disabled}
    />
  </span>
);

export default App;
