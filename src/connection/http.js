import axios from "axios";

const client = axios.create({
  baseURL: "https://housedesing.onrender.com/",
});

export default {
  post: axios.post,
  get: axios.get,
  client,
};
