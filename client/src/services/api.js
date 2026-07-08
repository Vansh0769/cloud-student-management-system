import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-sms-project-d7ancvhgfycxdjhn.centralindia-01.azurewebsites.net/api",
});

export default api;