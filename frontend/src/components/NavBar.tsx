import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import { NavBarLoggedInView } from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"

interface NavBarProps {
    loggedInUser?: User | null,
    onSignUpClicked: () => void,  
    onLoginClicked: () => void,  
    onLogoutSuccessful: () => void,  
}

const NavBar = (props: NavBarProps): NavBarProps => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
            <Navbar.Brand>
                Cool Notes App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="ms-auto">
                    { props.loggedInUser
                        ? <NavBarLoggedInView user={props.loggedInUser} onLogoutSuccessful={props.onLogoutSuccessful} />
                        : <NavBarLoggedOutView onLoginUpClicked={props.onLoginClicked} onSignUpClicked={props.onSignUpClicked} />
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar