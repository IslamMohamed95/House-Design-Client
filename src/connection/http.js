import axios from "axios";

const client = axios.create({
  baseURL: "https://construction-company-server.onrender.com/",
});

const http = {
  post: axios.post,
  get: axios.get,
  client,
};
export default http;
