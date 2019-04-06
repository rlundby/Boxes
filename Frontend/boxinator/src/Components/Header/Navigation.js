import React from 'react';
import logo from './Boxinator.png'
import './Header.css'


export default function Navigation() {
    return(
        <div className='main-navigation'>
            <img src={logo} className="img-responsive logo" alt="Logo"/>
            <div>
                <a href="/addbox" className="button-primary">Add new box</a>
                <a href="/listboxes" className="button-primary">List all boxes</a>  
            </div>
            
        </div>
    )
}