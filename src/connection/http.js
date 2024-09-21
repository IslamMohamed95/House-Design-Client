import axios from "axios";

const client = axios.create({
  baseURL: "http://server.housed.ae/",
});

export default {
  post: axios.post,
  get: axios.get,
  client,
};
