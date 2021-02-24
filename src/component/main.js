import React from "react"
import SideBar from "./SideBar.js"
import Editor from "./editor"
import CusInfo from "./CusInfo"
import Topbar from "./topbar"
import WebList from "./WebList"
import Login from "./Login"
import ContentList from "./ContentList"
import CategoryList from "./CategoryList"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import AddContent from "./addContent"

class Main extends React.Component {

    render() {
        return (
            <>
            <Router>
                <SideBar/>
                <Topbar />
                <Container className="themed-container" fluid={true}>
                    <Switch>
                        {/* <Route path="/" exact component={} /> */}
                        <Route path="/CusInfo"  component={CusInfo} />
                        <Route path="/WebList"  component={WebList} />
                        <Route path="/login"  component={Login} />
                        <Route path="/CateList/:group"  component={ContentList} />
                        {/* <Route path="/ContentList/:cate" exact component={ContentList} /> */}
                        <Route path="/EditContent/:contentId"  component={Editor} />
                        <Route path="/addContent/:groupName"  component={AddContent} />
                    </Switch>
                </Container>
            </Router>
        </>
        )
    }
}

export default Main