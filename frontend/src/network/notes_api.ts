import { Note } from "../models/note";
import { User } from "../models/user";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
};

export async function getLoggedOnUser(): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await fetchData("http://localhost:5000/api/notes", {
        method: "GET",
    });
    return response.json();
};

export interface NoteInput {
    title: string;
    text?: string;
}

export const createNote = async (note: NoteInput): Promise<Note> => {
    const response = await fetchData("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const updateNote = async (noteId: string, note: NoteInput): Promise<Note> => {
    const response = await fetchData("http://localhost:5000/api/notes/" + noteId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return response.json();
}

export const deleteNote = async (noteId: string) => {
    await fetchData("http://localhost:5000/api/notes/" + noteId, {
        method: "DELETE",
    });
};

