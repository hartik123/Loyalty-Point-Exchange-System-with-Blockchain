import React, { useRef } from 'react'
import webIcon from '../images/webIcon.svg';
import { Link } from 'react-scroll';

const Navbar = () => {

  const profile = useRef(null);
  const transact = useRef(null);
  const transactionRecords = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }


  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={webIcon} width="54" height="54" />
        <span className="font-semibold text-xl tracking-tight ml-2"> Loyalty Point Exchange System</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="" style={{display:"flex", color:"white", fontSize:"1.2rem"}}>
      {/* <div className="w-full block flex-row lg:flex lg:items-center lg:w-auto"> */}
        {/* <div> */}
          <div style={{ marginRight:"1rem", cursor:"pointer"}}>
            <Link
              activeClass="active"
              to="profile"
              spy={true}
              smooth={true}
              duration={500}>Profile</Link>
              </div>
          <div style={{ marginRight:"1rem", cursor:"pointer"}}>
            <Link
              activeClass="active"
              to="transact"
              spy={true}
              smooth={true}
              duration={500}>Transact</Link>
          </div>
          <div style={{ marginRight:"1rem", cursor:"pointer"}}>
            <Link
              activeClass="active"
              to="transactionRecords"
              spy={true}
              smooth={true}
              duration={500}>Transaction Records</Link>
          </div>
        </div>
      {/* </div> */}
    </nav>
  )
}

export default Navbar