import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    // componentDidMount(){
    //     if(this.props.task){
    //         this.setState({
    //             id : this.props.task.id,
    //             name : this.props.task.name,
    //             status : this.props.task.status
    //         });
    //     }
    // }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.task) {
          if(nextProps.task.id !== prevState.id){
            return {
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            }
          }
        }
        else if(prevState.id){
            return {
                id: '',
                name: '',
                status: true
            }
        }
        else return null;
    }

    onCloseForm = () =>{
        this.props.onCloseForm();
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value ==='true' ? true : false;
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }
    onClear = () =>{
        this.setState({
            name : '',
            status : false
        })
    }
    render() {
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
            <div className="panel-heading">
               <div className="row">
                 <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <h3 className="panel-title" >
                      {id === '' ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                  </h3>
                 </div>
                 <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <i className="fas fa-times-circle" onClick={this.onCloseForm}></i>
                 </div>
               </div>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            className="form-control" />
                    </div>
                    <label>Trạng Thái :</label>
                    <select
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        className="form-control" 
                        required="required">
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="btn btn-warning">
                          <i className="fas fa-save">&nbsp;Lưu Lại</i>
                        </button>&nbsp;
                        <button 
                            type="button"
                            onClick={this.onClear}
                            className="btn btn-danger">
                          <i className="fas fa-window-close">&nbsp;Hủy Bỏ</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default TaskForm;