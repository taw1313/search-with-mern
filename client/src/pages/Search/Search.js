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
        <div className='row'>
            <div className='Jumbotron'>
              <h3>Search Parameters</h3>
            </div>
        </div>
            <div className='col-md-8 row'>
                <form>
                  <Input
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                    name="searchTerm"
                    placeholder="Search Term (required)"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    placeholder="Start Year (optional)"
                  />
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    name="endYear"
                    placeholder="End Year (Optional)"
                  />
                  <FormBtn
                    disabled={!this.state.searchTerm}
                    onClick={this.searchForNews}
                  >
                    <Link to={"/articles"}>
                        Search 
                    </Link>
                  </FormBtn>
                </form>
            </div>
      </div>
    );
  }
}

export default Search;