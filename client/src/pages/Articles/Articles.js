import React, { Component } from "react";
import API from "../../utils/API";
import HeadLine from "../../components/HeadLine";
import DivHeader from "../../components/DivHeader";
//import { Link } from "react-router-dom";
import "../../components/HeadLine/HeadLine.css";

class Articles extends Component {
  state = {
    saveddArticlesCount: 0,
    savedArticles: [],
    scrapedArticlesCount: 0,
    scrapedArticles: []
  };

  componentDidMount() {
    this.readArticlesFromDB();
  }

  scrapeForNews = () => {
    API.scrape()
      .then(res => this.readArticlesFromDB() )
      .catch(err => console.log(err));
  };

  removeAllSaved = () => {
      // TODO
  };

  readArticlesFromDB = () => {
    API.getArticles()
        .then(results => {
            let scraped = [];
            let saved = [];
            results.data.map( r => r.saveArticle ? saved.push(r) : scraped.push(r) );
            this.setState({ 
                savedArticlesCount: saved.length, 
                savedArticles: saved,
                scrapedArticlesCount: scraped.length, 
                scrapedArticles: scraped
            });
        })
  };

  removeArticle = (id) => {
      API.removeArticle(id)
         .then(res => {
             this.readArticlesFromDB();
         })
         .catch(err => console.log(err) );
  };

  saveArticle = (id) => {
      API.getArticle(id)
         .then( result => {
             if ( result.data._id === id ) {
                 let article = result.data;
                 article.saveArticle = true;
                 console.log( article );
                 API.updateArticle(id, article)
                     .then(res => {
                         this.readArticlesFromDB();
                     })
             }
         })
         .catch(err => console.log(err) );
  };

  render() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <DivHeader
                        title={`Total Articles scraped: ${this.state.scrapedArticlesCount}`}
                        btnID={`Scrape`}
                        action={this.scrapeForNews}
                    />
                    <div className='row'>
                        <div className='table-responsive' id='tableHeader'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th className='numField'>#</th>
                                        <th className='headLineField'>Headline</th>
                                        <th className='actionField'>save</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='table-responsive' id='tableData'>
                            <table className='table table-hover'>
                                <tbody id='articlesTable'>
                                    {this.state.scrapedArticles.map( (article, index) => (
                                        <HeadLine
                                            key={article._id}
                                            id={article._id}
                                            index={index+1}
                                            headline={article.headline}
                                            iconClass={`fas fa-save actionField`}
                                            action={this.saveArticle}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='col-md-6'>
                    <DivHeader
                        title={`Saved Articles: ${this.state.savedArticlesCount}`}
                        btnID={`RemoveAll`}
                        action={this.removeAllSaved}
                    />
                    <div className='row'>
                        <div className='table-responsive' id='tableHeader'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th className='numField'>#</th>
                                        <th className='headLineField'>Headline</th>
                                        <th className='actionField'>delete</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='table-responsive' id='tableData'>
                            <table className='table table-hover'>
                                <tbody id='articlesTable'>
                                    {this.state.savedArticles.map( (article, index) => (
                                        <HeadLine
                                            key={article._id}
                                            id={article._id}
                                            index={index+1}
                                            headline={article.headline}
                                            iconClass={`fas fa-trash-alt actionField`}
                                            action={this.removeArticle}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
  }
}

export default Articles;