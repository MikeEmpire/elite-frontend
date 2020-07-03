import React, { useState } from "react";
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
} from "reactstrap";

const Navigation = () => {
  const [isOpen, navIsOpen] = useState(false);

  const toggle = () => navIsOpen(!isOpen);

  return (
    <Navbar className="elite--nav" light expand="lg">
      <NavbarBrand className="nav--link">ELITE</NavbarBrand>
      <NavbarToggler className="toggler" onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="cat mr-auto" navbar>
          <NavItem>
            <NavLink className="nav--link">Music</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav--link">Sports</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav--link">Style</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav--link">Culture</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav--link">Entertainment</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Follow Elite
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Twitter</DropdownItem>
              <DropdownItem>Instagram</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
