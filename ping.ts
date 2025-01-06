import axios from "axios";

const BASE_URL = "https://api.rugcheck.xyz/v1";

axios
  .get(`${BASE_URL}/stats/new_tokens`)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.response?.data || error.message);
  });