import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineDocumentAdd } from "react-icons/hi"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import '../css/ListContent.css'

export const ContentList = () => {

    let { group } = useParams()

    const [contentList, setContentList] = useState([])
    const [modal, setModal] = useState(false)
    const [delId, setDelId] = useState()
    const [delContent, setDelContent] = useState()

    useEffect(() => {
        axios.get(`http://admin.kodmu.com:4000/admin/blogs/getCategory?groupName=${group}`)
            .then(res => {
                setContentList(res.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    function clickDel(id, e) {
        console.log(id)
        axios.delete(`http://admin.kodmu.com:4000/admin/blogs?id=${id}`)
            .then(res => {
                console.log(res.data)
                window.location.href = `/CateList/${group}`;
            }).catch(error => {
                console.log(error)
            })
    }

    const toggle = () => setModal(!modal);
    function ConfirmDel(id, title) {
        setDelContent(title)
        setDelId(id)
        setModal(!modal);
    }

    return (
        <>
            <div className="content-containner background-inh" >
                <Link to={`/addContent/${group}`}>
                    <div className="list-content-containner" >
                        <div className="list-content-header">
                            <center><h2><HiOutlineDocumentAdd /></h2></center>
                        </div>
                        <div className="list-content-body">
                            <p>add new content</p>
                        </div>
                    </div>
                </Link>
            </div>
            {
                contentList.map((data, indexList) => {
                    return (
                        <div className="content-containner " >

                            <div className="card-header" key={indexList}> {data.cateName}  </div>
                            <div className="card-body list">

                                {
                                    data.contents.map((contents) => {
                                        return (
                                            <div>
                                                <Link to={`/editContent/${contents.id}`}>
                                                    <div className="list-content-containner" key={contents.id}>
                                                        <div className="list-content-header">
                                                            <h4>{contents.title}</h4>
                                                        </div>
                                                        <div className="list-content-body">
                                                            <p>{ReactHtmlParser(contents.content_value.substring(0, 150))}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Button color="danger" onClick={(e) => ConfirmDel(contents.id, contents.title)} > DELETE </Button>
                                            </div>
                                        )
                                    })
                                }
                                <Modal isOpen={modal} toggle={toggle} >
                                    <ModalHeader toggle={toggle}>ยืนยันการลบคอนเท็นท์</ModalHeader>
                                    <ModalBody>
                                        <p>{delContent}</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={(e) => clickDel(delId)} > DELETE </Button>
                                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <div className="card-footer">
                            </div>

                        </div>
                    )
                })
            }
        </  >
    )
}

export default ContentList