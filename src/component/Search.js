import React, { Component } from 'react';

// Anh Dự - Review code
class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword : ''
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }
    onSearch = () =>{
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var {keyword} = this.state;
        return (
            <div className="input-group">
                <input
                name="keyword"
                type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa..."
                value = { keyword }
                onChange={this.onChange}/>
                        <span className="input-group-btn">
                          <button 
                            className="btn btn-info" 
                            type="button"
                            onClick={this.onSearch}>
                              <i className="fa fa-search mr-5"></i>Tìm
                          </button>
                        </span>
              </div>
        );
    }
}

export default Search;