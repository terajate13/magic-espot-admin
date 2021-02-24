import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import '../css/main.css'

export const CategoryList = () => {

    let { group } = useParams();
    const [cate, setCate] = useState([
        {
            categoryName:'มูเตลู',
        },
        {
            categoryName:'สีมงคล',
        },
        {
            categoryName:'คาถามงคล',
        },
        {
            categoryName:'อื่นๆ',
        }
    ])

    useEffect(() => {
        console.log(group)
        axios.get(`http://www.kodmu.com:4000/admin/blogs/countCategory?groupName=${group}`
        ).then(res => {
            console.log(res.data)
            setCate(res.data)
        }).catch( error => {
            console.log(error)
            }
        )
    }, [])

    return (
        <>
            {
                cate.map((data, index) => {
                    return (
                        <div className="content-containner" key={index}>
                            <Link to={`/ContentList/${data.categoryName}`}>
                                <div className="card-header"> {data.categoryName}  </div>
                                <div className="card-body">
                                    <p>{data.categoryName} มีทั้งหมด {data.countCategory} คอนเท็นท์</p>
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

export default CategoryList
