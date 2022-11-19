import React from 'react'
import webIcon from '../images/webIcon.svg';
import { Link } from 'react-scroll';


const NewNavbar = () => {
    return (
        <div className='flex flex-row justify-start align-center'>
<div>
<img src={webIcon} alt="website icon" width="54" height="54" />
</div>        
    <div>Loyalty Point Exchange System</div>
            <div><Link
                activeClass="active"
                to="profile"
                spy={true}
                smooth={true}
                duration={500}>Profile</Link></div>
            <div>
            <Link
                activeClass="active"
                to="transact"
                spy={true}
                smooth={true}
                duration={500}>Transact</Link>
            </div>
            <div>
            <Link
                activeClass="active"
                to="transactionRecords"
                spy={true}
                smooth={true}
                duration={500}>Transaction Records</Link>
            </div>
        </div>
    )
}

export default NewNavbar