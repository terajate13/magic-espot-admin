import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import MyUploadAdapter from './MyUploadAdaptor'
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import "../css/addContent.css"

const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin]
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}

export const AddContent = () => {

    var { groupName } = useParams()

    const [contents, setContents] = useState()
    const [title, setTitle] = useState()
    const [category, setCategory] = useState()

    const headers = {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`
    }

    let params = {
        "img": "https://www.kodmu.com/images/title1.jpg",
        "title": title,
        "content_value": contents,
        "group_name": groupName,
        "category_name": category
    }

    function add() {
        console.log(groupName)
        console.log(title)
        axios.post(`http://admin.kodmu.com:4000/admin/blogs`, params, headers)
            .then(res => {
                console.log(res.data)
                window.location.href = `/CateList/${groupName}`;
            }).catch(error => {
                console.log(error)
            })
    }

    const categorys = [
        {
            name: 'LuckyColor',
            name_th: 'สีมงคล'
        },
        {
            name: 'LuckySpell',
            name_th: 'คาถามงคล'
        },
        {
            name: 'Fortune',
            name_th: 'ฮวงจุ้ย',
        },
        {
            name: 'Other',
            name_th: 'อื่นๆ',
        }
    ]

    function handleSelecct(e) {
        setCategory(e.target.value)
    }

    return (
        <>
            <div className="content-containner">
                <div className="card-header"> ADD NEW CONTENT  </div>
                <div className="card-body">
                    <div className="tools-containner">
                        <div className="input-tools-containner">
                            <Row>
                                <Col sm='2'>
                                    <Label for="exampleSelect">เลือก categories</Label>
                                </Col>
                                <Col sm='10'>
                                    <Input type="select" name="select" id="exampleSelect" onChange={handleSelecct}>
                                        {
                                            categorys.map((cate, inx) => {
                                                return (
                                                    <option key={inx} value={cate.name}>{cate.name_th}</option>
                                                )
                                            })
                                        }
                                    </Input>

                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col sm='2'>

                                </Col>
                                <Col sm='10'>
                                    <Input type="text" name="title" id="title" placeholder="ใส่หัวข้อที่นี่..." onChange={e => setTitle(e.target.value)} />
                                </Col>
                            </Row>
                        </div>
                        <div className="editor-box">
                            <CKEditor
                                editor={InlineEditor}
                                data={contents}
                                onReady={editor => {
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContents(data)
                                }}
                                config={custom_config}
                                onBlur={(event, editor) => {
                                }}
                                onFocus={(event, editor) => {
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <Button onClick={add}> ADD </Button>
                </div>
            </div>
        </>
    )
}

export default AddContent