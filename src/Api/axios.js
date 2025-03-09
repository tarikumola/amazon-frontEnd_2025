import axios from 'axios'

const axiosInstance = axios.create({

  // local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-2025-5e762/us-central1/api",

  // deployed link of amazon api on render.com
  baseURL: "https://amazon-api-deploy-7g99.onrender.com",
});

export { axiosInstance };