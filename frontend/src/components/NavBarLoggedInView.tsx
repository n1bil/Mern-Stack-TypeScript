import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User;
    onLogoutSuccessful: () => void;
}

export const NavBarLoggedInView = ( props: NavBarLoggedInViewProps): NavBarLoggedInViewProps => {

    const logout = async () => {
        try {
            await NotesApi.logout();
            props.onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {props.user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
};
