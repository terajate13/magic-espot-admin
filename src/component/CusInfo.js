import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import "../css/Customer.css"
import '../css/main.css'
import axios from 'axios';

export const CusInfo = () => {
    const [customers, setCustomers] = useState([])

    const [url, setUrl] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)


    const handleSelected = (currentPage) => {
        console.log(currentPage)
        console.log(customers.slice(currentPage * pageSize, (currentPage + 1) * pageSize))
        setCurrentPage(currentPage - 1)
    };
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`
    }

    useEffect(() => {
        axios.get(`http://admin.kodmu.com:4000/admin/blogs/getContacts`, headers)
            .then(res => {
                setCustomers(res.data)
            })
    }, [])

    return (
        <>
            <div className="content-containner">
                <div className="card-header"> Customer info  </div>
                <div className="card-body">
                    <Table>
                        <thead>
                            <tr>
                                <th>no.</th>
                                <th>Name</th>
                                <th>TEL</th>
                                <th>Email</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((data, index) => {
                                    return (
                                        <tr key={index} className="cus-table">
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.tel}</td>
                                            <td>{data.email}</td>
                                            <td><button>Del</button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                </div>
                <div className="card-footer center">
                    <div>
                        <div className="paging">
                            <PaginationComponent
                                size="sm"
                                totalItems={customers.length}
                                pageSize={pageSize}
                                onSelect={handleSelected}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-tools">
                </div>
            </div>
        </>
    )
}
export default CusInfo