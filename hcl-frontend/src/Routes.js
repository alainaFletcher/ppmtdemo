import React from 'react'
import { useHistory } from 'react-router';
import {Route} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import AddProject from './components/project/AddProject';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Login from './components/UserRoutes/Login';
import Register from './components/UserRoutes/Register';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import SecuredRoute from './SecuredRoute';

const Routes = ({security}) => {
    const history = useHistory();
    return (
        <>
        <Header security={security}/>
        <div>
            <Route exact path="/">
                <Landing security={security}/>
            </Route>
            <Route exact path="/register">
                <Register history={history} security={security}/>
            </Route>
            <Route exact path="/login">
                <Login history={history} security={security}/>
            </Route>
            
            <SecuredRoute exact path="/dashboard" security={security}>
                <Dashboard security={security}/>
            </SecuredRoute>
            <SecuredRoute exact path="/addProject" security={security}>
                <AddProject history={history}/>
            </SecuredRoute>
            <SecuredRoute exact path="/updateProject/:id" security={security}>
                <UpdateProject history={history}/>
            </SecuredRoute>
            <SecuredRoute exact path="/projectBoard/:id" security={security}>
                <ProjectBoard/>
            </SecuredRoute>
            <SecuredRoute exact path="/addProjectTask/:id" security={security}>
                <AddProjectTask history={history}/>
            </SecuredRoute>
            <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" security={security}>
                <UpdateProjectTask history={history}/>
            </SecuredRoute>
        </div>    
        </>
        
    )
}

Routes.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, {})(Routes);
