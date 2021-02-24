import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../css/main.css'

export const WebList = () => {

    const [webList, setWebList] = useState([])

    var token = 'Bearer ' + localStorage.getItem('token')

    const headers = {
        'Content-Type': 'application/json',
        'authorization': token
    }

    useEffect(() => {
        // axios.get('http://admin.kodmu.com:4000/admin/blogs/getGroupName', {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
        //         'Access-Control-Max-Age': 86400,
        //         authorization: token
        //     }
        // })
        // .then((response) => {
        //         console.log("res : " + response.data)
        //     }, (error) => {
        //         console.log(error);
        //     });
            
        console.log(token)
        axios.get(`http://admin.kodmu.com:4000/admin/blogs/getGroupName`, headers)
            .then(res => {
                if (res.data == '') {
                    setWebList([{ groupName: 'ไม่พบข้อมูล' }])
                } else {
                    setWebList(res.data)
                }
            }).catch( err => {
                alert('ไม่สามารถเชื่อมต่อกับระบบหลังบ้านได้')
            })
        console.log(headers)
        // axios.get(`http://admin.kodmu.com:4000/admin/blogs/getGroupName`,headers)
        //     .then(res => {
        //         if (res.data == '') {
        //             setWebList([{ groupName: 'ไม่พบข้อมูล' }])
        //         } else {
        //             setWebList(res.data)
        //         }
        //     })
    }, [])

    return (
        <>
            {
                webList.map((data, index) => {
                    return (
                        <div className="content-containner " key={index}>
                            <Link to={`/CateList/${data.groupName}`}>
                                <div className="card-header"> {data.groupName}  </div>
                                <div className="card-body">
                                </div>
                                <div className="card-footer">
                                </div>
                            </Link>
                        </div>
                    )
                })}
        </>
    )
}

export default WebList
