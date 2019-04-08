import React from 'react';
import logo from './Boxinator.png'

//This component shows the header with the nav buttons
export default function Navigation() {
    return(
        <div className='main-navigation'>
            <a href="/" ><img src={logo} className="img-responsive logo" alt="Logo"/></a>
            <div>
                <a href="/addbox" className="button-primary">Add new box</a>
                <a href="/listboxes" className="button-primary">List all boxes</a>  
            </div>
            
        </div>
    )
}