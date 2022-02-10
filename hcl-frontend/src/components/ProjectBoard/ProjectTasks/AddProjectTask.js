import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import {connect} from "react-redux"
import classnames from 'classnames';
import { addProjectTask } from '../../../actions/backlogActions';
import PropTypes from "prop-types";

const AddProjectTask = ({addProjectTask, history, errors}) => {
    const {id} = useParams();
    
    const initState = {
        summary: "",
        acceptanceCriteria: "",
        dueDate: "",
        priority: 0,
        status: ""
    }

    const [formData, setFormData] = useState(initState);
    const [currErrors, setCurrErrors] = useState({});
    useEffect(() => {
        if(errors){
            setCurrErrors (errors)
        }
    }, [errors])
    
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
        addProjectTask(id, formData, history)
    }
    return (
        <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add  Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg ",{
                                    "is-invalid":currErrors.summary
                            })} 
                            name="summary" 
                            placeholder="Project Task summary" 
                            value={formData.summary} 
                            onChange={onChange}/>
                            {currErrors.summary && (
                                <div className="invalid-feedback">{currErrors.summary}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria" value={formData.acceptanceCriteria} onChange={onChange}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="dueDate" value={formData.dueDate} onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="priority" value={formData.priority} onChange={onChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status" value={formData.status} onChange={onChange}>
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

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    {addProjectTask}
) (AddProjectTask)