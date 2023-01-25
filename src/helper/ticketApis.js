import {API} from "../backend";

export const getAllTicket = () => {
    return fetch(`${API}/tickets`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const createTicket = (ticket) => {
    return fetch(`${API}/create-ticket`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(ticket)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateTicket = (ticket) => {
    return fetch(`${API}/update-ticket`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(ticket)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const deleteTicket = (ticketId) => {
    return fetch(`${API}/delete-ticket`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(ticketId)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const addComment = (comment) => {
    return fetch(`${API}/add-comment`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(comment)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}