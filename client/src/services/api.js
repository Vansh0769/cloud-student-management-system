import axios from "axios";

const api = axios.create({
  baseURL: "https://sms-appservice-g6e7fkcrhabfaveq.centralindia-01.azurewebsites.net/api",
});

export default api;