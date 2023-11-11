import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginUpClicked: () => void,
}

const NavBarLoggedOutView = (props: NavBarLoggedOutViewProps): NavBarLoggedOutViewProps => {
  return (
    <>
        <Button onClick={props.onSignUpClicked}>Sign Up</Button>
        <Button onClick={props.onLoginUpClicked}>Log In</Button>
    </>
  )
}

export default NavBarLoggedOutView