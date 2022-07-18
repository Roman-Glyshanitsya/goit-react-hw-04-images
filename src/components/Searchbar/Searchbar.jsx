import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export default class Searchbar extends Component {

    state = {
        searchImg: ''
    };

     handleSearchChange = event => {
        this.setState({ searchImg: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchImg.trim() === '') {
            toast.error('Enter something for search');
            return;
        }

        this.props.onSubmit(this.state.searchImg);
        this.setState({ searchImg: '' });
        
    };

       render() {
        return (
            <header className={s.searchbar}>       
                <form className={s.searchForm} onSubmit={this.handleSubmit}>    
                    <button type="submit" className={s.searchFormButton}>
                        <FcSearch className={s.iconButton} />
                        <span className={s.searchFormButtonLabel}></span>
                    </button>               
                    <input
                        className={s.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"  
                        onChange={this.handleSearchChange}
                    />                   
                </form>                
            </header>            
        )
    }

}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
