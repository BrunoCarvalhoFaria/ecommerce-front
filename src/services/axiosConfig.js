import axios from "axios";

const api = axios.create({
  baseURL: "https://fair-ruby-stingray-gown.cyclic.app/",
});

export { api };
