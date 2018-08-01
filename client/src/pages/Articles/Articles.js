import React, { Component } from "react";
import API from "../../utils/API";
import HeadLine from "../../components/HeadLine";
import DivHeader from "../../components/DivHeader";
//import { Link } from "react-router-dom";
import "../../components/HeadLine/HeadLine.css";

class Articles extends Component {
  state = {
    articlesCount: 0,
    articles: []
  };

  componentDidMount() {
    this.readArticlesFromDB();
  }

  scrapeForNews = () => {
    API.scrape()
      .then(res => this.readArticlesFromDB() )
      .catch(err => console.log(err));
  };

  readArticlesFromDB = () => {
    API.getArticles()
        .then(results => {
            this.setState({ articlesCount: results.data.length, articles: results.data });
        })
  };

  removeArticle = (id) => {
      console.log( `DEBUG - removeArticle - ${id}` );
      API.removeArticle(id)
         .then(res => {
             this.readArticlesFromDB();
         })
         .catch(err => console.log(err) );
  };

  render() {
    return (
      <div className='container'>
          <DivHeader
              count={this.state.articlesCount}
              scrapeForNews={this.scrapeForNews}
          />
          <div className='row'>
              <div className='table-responsive' id='tableHeader'>
                  <table className='table table-hover'>
                      <thead>
                          <tr>
                              <th className='numField'>#</th>
                              <th className='headLineField'>Headline</th>
                              <th className='numNotesField'># of notes</th>
                              <th className='delField'>delete</th>
                          </tr>
                      </thead>
                  </table>
              </div>
              <div className='table-responsive' id='tableData'>
                  <table className='table table-hover'>
                      <tbody id='articlesTable'>
                          {this.state.articles.map( (article, index) => (
                              <HeadLine
                                  key={article._id}
                                  id={article._id}
                                  index={index+1}
                                  headline={article.headline}
                                  numNotes={article.numNotes}
                                  removeArticle={this.removeArticle}
                              />
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    );
  }
}

export default Articles;