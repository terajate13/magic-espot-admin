import React from 'react'
import { FaUserAlt } from "react-icons/fa"
import { AiFillFacebook } from "react-icons/ai"
import { BiSearchAlt } from "react-icons/bi"
import { GoCommentDiscussion } from "react-icons/go"

import '../css/topbar.css'



export const Topbar = () => {
    function logOut () {
        localStorage.clear()
        window.location.href = '/Login'
    }
    
    return (
        <div className="top-bar">
            <ul >
                <li >
                <a href="#" onClick={logOut} ><FaUserAlt/></a><p>Logout</p>
                </li>
                <li>
                    <a href="#home"><AiFillFacebook/></a><p>facebook</p>
                </li>
                <li>
                    <a href="#home"><GoCommentDiscussion/></a><p>chat</p>
                </li>
                <li>
                    <a href="#home"  ><BiSearchAlt/></a><p>search</p>
                </li>
            </ul>
        </div>
    )
}

export default Topbar