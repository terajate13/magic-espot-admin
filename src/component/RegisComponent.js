import React from "react"
import { Container, Row, Col } from 'reactstrap';

class RegisComponent extends React.Component {

    render() {
        return (
        <div>
             <Container className="themed-container" fluid={true}>
                <Row>
                    <div>s</div>
                </Row>
                <Row>
                    <div>s</div>
                </Row>
                    <div>s</div>
                <Row>
                </Row>
            </Container>
        </div>
        )
    }
    handleClick() {
        this.setState( privState => ({
            counter: this.state.counter + 1
        }))
      }
}

export default RegisComponent