import React, {Component} from 'react';
import {
    MenuItem, Nav, Navbar, NavDropdown, NavItem
} from "react-bootstrap";

class Head extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Beist</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">背单词</NavItem>
                        <NavItem eventKey={2} href="#">读文章</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Caroline" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>设置</MenuItem>
                            <MenuItem eventKey={3.2}>帮助</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.3}>注销</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Head;