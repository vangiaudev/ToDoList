import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterName : '',
      filterStatus : -1 //tatca = -1, kichhoat = 1, an = 0
    };
  }
  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
      [name] : value
    });

  }
    render() {
      var { tasks } = this.props;
      var {filterName, filterStatus} = this.state;
      var elementTasks = tasks.map((task, index)=>{
        return <TaskItem key = {task.id}
                         index = {index}
                         task = {task}
                         onDelete = {this.props.onDelete}
                         onUpdate = {this.props.onUpdate}
                         onUpdateStatus = {this.props.onUpdateStatus}
                          />
      })
        return (
            <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="filterName"
                    value={filterName}
                    onChange={this.onChange} />
                </td>
                <td>
                  
                  <select 
                    id="input" 
                    className="form-control" 
                    value={filterStatus}
                    onChange={this.onChange}
                    name="filterStatus">
                    <option value="-1">Tất Cả</option>
                    <option value="0">Ẩn</option>
                    <option value="1">Kích Hoạt</option>
                  </select>
                  
                </td>
                <td></td>
              </tr>
                {elementTasks}
            </tbody>
          </table>
        );
    }
}

export default TaskList;