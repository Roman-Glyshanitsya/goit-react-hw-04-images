import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export class App extends Component {
  state = {
    searchImg: ''
  }

  handleFormSubmit = searchImg => {
    this.setState({ searchImg });
  }


  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImg={this.state.searchImg} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
