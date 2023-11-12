import { Container } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import SignUpModal from "./components/SignUpModal";
import { LoginModal } from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await NotesApi.getLoggedOnUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLoggedInUser();
    }, []);

    return (
        <div>
            <NavBar
                loggedInUser={loggedInUser}
                onLoginClicked={() => setShowLoginModal(true)}
                onSignUpClicked={() => setShowSignUpModal(true)}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <Container className={styles.notesPage}>
                <>
                    {loggedInUser ? (
                        <NotesPageLoggedInView />
                    ) : (
                        <NotesPageLoggedOutView />
                    )}
                </>
            </Container>
            {showSignUpModal && (
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowSignUpModal(false);
                    }}
                />
            )}
            {showLoginModal && (
                <LoginModal
                    onDismiss={() => setShowLoginModal(false)}
                    onLoginSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowLoginModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default App;
