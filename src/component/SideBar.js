import React , { useState } from 'react'

import {Navigation} from 'react-minimal-side-navigation';
import { useHistory, useLocation } from "react-router-dom";
import '../css/main.css'
import '../css/sidebar.css'
import { FaHome, FaEdit } from "react-icons/fa";
import { BsPersonCheckFill } from "react-icons/bs";
import logo from '../img/logo.jpg';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';




export const SideBar = () => {

    const history = useHistory();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    
    return (
        
        <div className="sidenav">
        <img src={logo} alt="Avatar" />
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
                history.push(itemId);
            }}
            items={[
            {
                title: 'Home',
                itemId: '/Home',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () =><FaHome />,
            },
            {
                title: 'Customer',
                itemId: '/CusInfo',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () =><BsPersonCheckFill />,
            },
            {
                title: 'Edit Content',
                itemId: '/WebList',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () =><FaEdit />,
            },
            // {
            //     title: 'Edit Content',
            //     itemId: '/editContent',
            //     elemBefore: () => <FaPencilAlt />,
            //     subNav: [
            //     {
            //         title: 'KODMU',
            //         itemId: '/editContent/kodmu',
            //     },
            //     {
            //         title: 'BLA BLA',
            //         itemId: '/editContent/BLA',
            //     },
            //     ],
            // },
            ]}
        />
        </div> 
    )
}

export default SideBar