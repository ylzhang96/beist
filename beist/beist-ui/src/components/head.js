import React, {Component} from 'react';
import {
    Button,
    FormControl,
    FormGroup, Glyphicon, Image, InputGroup, Label,
    MenuItem, Nav, Navbar, NavDropdown, NavItem
} from "react-bootstrap";
import Icon from '../images/icon.jpg';

class Head extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/myPage">Beist</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/word">背单词</NavItem>
                        <NavItem eventKey={2} href="/article">读文章</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={<Image src={Icon} circle/>} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><h5>Caroline</h5></MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.2} href="/settings">设置</MenuItem>
                            <MenuItem eventKey={3.3} href="/about">帮助</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.4} href="/">注销</MenuItem>
                        </NavDropdown>
                    </Nav>
                    {/*<Nav pullRight>*/}
                        {/*<Image src={Icon} circle/>*/}
                    {/*</Nav>*/}
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" placeholder="查单词"/>
                                <InputGroup.Button>
                                    <Button><Glyphicon glyph="search"/></Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Head;