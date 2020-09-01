import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import { connect} from "react-redux";
import { signOut } from "../../store/modules/auth/actions";
import { push } from 'connected-react-router';


class AdminNavbarLinks extends Component {
  
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        
        <Nav pullRight>
          
          <Nav pullRight>
            <NavItem eventKey={3} href="#" onClick={() => this.props.signOut()}>
              Log out
            </NavItem>
          </Nav>
          
        </Nav>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {dispatch(signOut()); dispatch(push("/login"))}
  }
}

export default connect(null, mapDispatchToProps)(AdminNavbarLinks);
