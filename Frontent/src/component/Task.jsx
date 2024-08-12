import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { MakeRequest } from '../MakeReuest';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../assets/css/Task.css';
import Loading from '../Loading';

const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [editTaskId, setEditTaskId] = useState('');
  const [taskData, setTaskData] = useState({ Title: "", Description: "" });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTasks();
  }, []);

  // fetch task list function
  const fetchTasks = async () => {
    try {
      const response = await MakeRequest('get', '/allList');
      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //track entering value by user 
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  //handle close fuction of model
  const handleModalClose = () => setIsModalOpen(false);

  //function to get previous value of task while editing.
  const handleEditTask = async (id) => {
    setIsCreateMode(false);
    setIsModalOpen(true);
    setEditTaskId(id);

    try {
      const response = await MakeRequest('post', `/taskById/${id}`);
      setTaskData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //function for submit form on the basis of condiction 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (taskData.Title.length <= 3) {
      toast.error("please enter more then 5 character in title");
      return;
    }
    if (taskData.Description.length <= 5) {
      toast.error("please enter more then 5 character in description");
      return;
    }

    try {
      setLoading(true)
      if (isCreateMode) {
        await MakeRequest('post', '/createProduct', taskData);
        toast.success('Task created successfully');
      } else {
        await MakeRequest('put', `/edittask/${editTaskId}`, taskData);
        toast.success('Task updated successfully');
      }
      fetchTasks();
      handleModalClose();
      setTaskData({ Title: "", Description: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  //delete task from list function
  const handleDeleteTask = async (id) => {
    try {
      await MakeRequest('delete', `/deleteTask/${id}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  //function for addding new task in list
  const handleAddTask = () => {
    setIsCreateMode(true);
    setTaskData({ Title: "", Description: "" });
    setIsModalOpen(true);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="mt-1 mb-4 d-flex justify-content-between">
          <h2>Your Task</h2>
          <button className="btn btn-success" onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="row">
          {taskList.map((item) => (
            <div className="col-sm-12 col-md-4 col-lg-3 mx-1 mt-1 card" key={item._id}>
              <div className="card-body">
                <h5 className="card-title">{item.Title}</h5>
                <p className="card-text">{item.Description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning" onClick={() => handleEditTask(item._id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteTask(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box className="EditModel">
          <form onSubmit={handleFormSubmit}>
            <div className="form-outline mb-4">
              <input type="text" className="form-control" id="Title" name="Title" value={taskData.Title} onChange={handleTaskChange} required />
              <label className="form-label" htmlFor="Title">Title</label>
            </div>
            <div className="form-outline mb-4">
              <textarea className="form-control" rows={2} id="Description" name="Description" value={taskData.Description} onChange={handleTaskChange} required />
              <label className="form-label" htmlFor="Description">Description</label>
            </div>
            {loading ? <Loading /> : <button type="submit" className="btn btn-primary btn-block mb-4">
              {isCreateMode ? "Create" : "Update"}
            </button>}

          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Task;