import { fetchUtils, DataProvider } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const fetchJsonUtil: (url: string, options?: RequestInit) => Promise<any> = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    (options.headers as Headers).set("Authentication", `Bearer ${localStorage.getItem("auth")}`);
    return fetchUtils.fetchJson(url, options);
};

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL; // Replace with your actual API URL
export const dataProvider: DataProvider = jsonServerProvider(apiUrl, fetchJsonUtil);