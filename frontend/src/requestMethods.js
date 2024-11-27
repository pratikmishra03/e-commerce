import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const TOKEN = 'pk_test_51OtUVPSBMoBUZEjBOxqilLTmk9X5ItdaFLuQzUOt9vpELQICgKQZPPHcX40ewbZihY0BvBeO6ugoODQ7mfDnuKnD004Zj6EGOv'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });

  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });