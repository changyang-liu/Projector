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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Projector</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/ProjectPage/">Projects</NavLink> {/*todo: fix linking*/}
                        </NavItem>

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
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

}

export default Header;