import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

const http = {
  post: axios.post,
  get: axios.get,
  client,
};
export default http;
