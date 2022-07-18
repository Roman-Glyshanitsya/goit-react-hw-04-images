import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';


export default class Loader extends Component {
    render() {
        return (
            <div className={s.loader}>
                <ThreeDots
                    color="blue"
                    height={50}
                    width={50}
                    ariaLabel="loading"
                />
                </div>
        )
    }
}
