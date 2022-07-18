import { useState } from 'react';
import s from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export default function Searchbar({onSubmit}) {
    const [searchImg, setSearchImg] = useState('');

    const handleSearchChange = event => {
        setSearchImg(event.currentTarget.value.toLowerCase());
    };
    
    const handleSubmit = event => {
        event.preventDefault();

        if (searchImg.trim() === '') {
            toast.error('Enter something for search');
            return;
        }

        onSubmit(searchImg);
        setSearchImg('');  
    };

    return (
        <header className={s.searchbar}>
            <form className={s.searchForm} onSubmit={handleSubmit}>
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
                    onChange={handleSearchChange}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
