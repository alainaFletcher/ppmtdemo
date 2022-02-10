import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import {connect} from "react-redux"
import classnames from 'classnames';
import { updateProjectTask, getProjectTask } from '../../../actions/backlogActions';
import PropTypes from "prop-types";

const UpdateProjectTask = ({project, updateProjectTask, getProjectTask, history, errors}) => {
    const {backlog_id, pt_id} = useParams();

    const [formData, setFormData] = useState({});
    const [currErrors, setCurrErrors] = useState({});

    useEffect(() => {
        getProjectTask(backlog_id, pt_id, history);
    }, [])

    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])

    useEffect(()=>{
        setFormData(project)
    }, [project])

    const onChange = e => {
        const {name, value} = e.target;
        const updatedForm = {
            ...formData,
            [name]:value
        }
        setFormData(updatedForm);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        updateProjectTask(backlog_id, pt_id, formData, history)
    }

    return (
        <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${backlog_id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.summary
                            })} 
                            name="summary" 
                            placeholder="Project Task summary" 
                            value={(formData.summary)?formData.summary: ""} 
                            onChange={onChange}/>
                            {currErrors.summary && (
                                <div className="invalid-feedback">{currErrors.summary}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria" value={(formData.acceptanceCriteria)?formData.acceptanceCriteria:""} onChange={onChange}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="dueDate" value={(formData.dueDate)?formData.dueDate:""} onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="priority" value={(formData.priority)?formData.priority:0} onChange={onChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status" value={(formData.status)?formData.status:""} onChange={onChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>

    )
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project: state.backlog.projectTask,
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    {updateProjectTask, getProjectTask}
) (UpdateProjectTask)