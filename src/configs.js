import axios from "axios";

export const api = axios.create({
    baseURL: !window.location.hostname.includes("jezstd.io") ? "/" : "/samsung-kepzes/",
    timeout: 8000,
    withCredentials: true,
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});