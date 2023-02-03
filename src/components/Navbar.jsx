// react library
import React, {useState, useEffect} from 'react'
import { useLocation, useParams, NavLink as Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
     <div className='navBar'>
        <div>
          <Link className='links' to='/'>Home</Link>
          <Link className='links' to='/users'>Users</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar