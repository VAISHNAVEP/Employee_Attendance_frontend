import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:3006",
  headers: {
    "Content-Type": "application/json",
  },
});


export { userInstance };
