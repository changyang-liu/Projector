import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const userMenu = props.user ? (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                My account {/*to fetch username*/}
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <NavItem>
                        <NavLink href="/ProjectPage/">My Profile</NavLink> {/*todo: fix linking*/}
                    </NavItem>
                </DropdownItem>
                <DropdownItem>
                    <NavItem>
                        <NavLink href="/ProjectPage/">My Projects</NavLink> {/*todo: fix linking*/}
                    </NavItem>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                    <NavItem>
                        <NavLink href="/ProjectPage/">Log Out</NavLink> {/*todo: fix linking*/}
                    </NavItem>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    ) : (
        <NavItem>
            <NavLink href="/login">Login</NavLink>
        </NavItem>
    );

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Projector</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Projects</NavLink>
                        </NavItem>
                        {userMenu}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
