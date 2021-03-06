import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Input,  FormBtn } from "../../components/Form";

class Search extends Component {
  state = {
    searchTerm: "",
    startYear: "",
    endYear: ""
  };

  searchForNews = () => {
      console.log(`searchForNews()`, this.state)
    API.search(this.state)
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
            <div className='col-md-12 row' id='header'>
                <h3> New York Times Search </h3>
            </div>
        </div>
        <div className='row col-md-12 card'>
            <div className='card-header'>
              <strong> <i className="fa fa-list-alt"></i> Search Parameters</strong>
            </div>
            <div className='card-body'>
                <form>
                  <Input
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                    name="searchTerm"
                    label="Search Term"
                    placeholder="(required)"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    label="Start Year"
                    placeholder="(optional)"
                  />
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    name="endYear"
                    label="End Year"
                    placeholder="(optional)"
                  />
                  <FormBtn
                    disabled={!this.state.searchTerm}
                    onClick={this.searchForNews}
                  >
                    <Link to={"/articles"}>
                        <i style={{ color: "white"}}> Search </i>
                    </Link>
                  </FormBtn>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Search;