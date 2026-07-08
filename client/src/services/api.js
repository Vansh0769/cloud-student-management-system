import axios from "axios";

const api = axios.create({
 // baseURL: "http://localhost:5000/api",
 baseURL: "cloud-sms-project-d7ancvhgfycxdjhn.centralindia-01.azurewebsites.net/api",
});

export default api;