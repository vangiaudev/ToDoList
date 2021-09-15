/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './App.css';
import Control from './component/Control';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
import {findIndex} from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm: false,
      taskEditting: null,
      filter : {
        name: '',
        status: -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
    }
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }
  onToggleForm = () =>{
    (this.state.isDisplayForm && this.state.taskEditting !== null)
    ? this.setState({
      isDisplayForm : true,
      taskEditting : null
    })
    : this.setState({
      isDisplayForm : !this.state.isDisplayForm,
      taskEditting : null
    })
   
  }
  onCloseForm = () =>{
    this.setState({
      isDisplayForm : false
    })
  }
  onShowForm= () =>{
    this.setState({
      isDisplayForm : true
    })
  }
  onSubmit = (data) => {
    var randomID = require("randomstring");
    
    var { tasks } = this.state;
    if(data.id === ''){
      data.id = randomID.generate();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks : tasks,
      taskEditting : null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  onUpdateStatus = (id) =>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }

  }
  onDelete = (id) =>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1)
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.onCloseForm();
  }
  onUpdate = (id) =>{
    var {tasks} = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks, (task) =>{
      return task.id === id;
    })
    var getTaskEditting = tasks[index];
    this.setState({
      taskEditting : getTaskEditting
    })
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) =>{
    filterStatus = +filterStatus;
    this.setState({
      filter : {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  onSearch = (keyword) =>{
    this.setState({
      keyword : keyword
    })
  }
  onSort = (sort) =>{
    this.setState({
      sort : {
        by : sort.by,
        value : sort.value
      }
    });

  }
  findIndex = (id) =>{
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) =>{
      if(task.id === id){
        result = index;
      } 
    });
    return result;
  }
  render() {
    var { tasks, isDisplayForm, taskEditting, filter, keyword } = this.state; // (=) var tasks = this.state.tasks;
    var {by, value} = this.state.sort;
   
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) =>{
        if(filter.status === -1){
          return task;
        }
        else{
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    if(by === 'name'){
      tasks.sort((a, b) => {
        if(a.name > b.name) return value;
        else if(a.name < b.name) return -value;
        else return 0;
    });
    }
    else{
      tasks.sort((a, b) => {
        if(a.status > b.status) return -value;
        else if(a.status < b.status) return value;
        else return 0;
    });
    }
 
    var elementTaskForm = isDisplayForm 
    ? <TaskForm 
        task={taskEditting}
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
      /> 
    : '';
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <h6>-- Developer by Nguyễn Văn Giàu --</h6>
          </div>
            <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
              {elementTaskForm}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
              <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                        <i className="fa fa-plus mr-5"></i>Thêm Công Việc
              </button>              
              <Control onSearch={this.onSearch}
                       onSort={this.onSort}
              />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    tasks = {tasks} 
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                    onUpdateStatus={this.onUpdateStatus}
                    onFilter={this.onFilter}/>            
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;