import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/";

export const getPlace = async (endPoint, id) => {
  try {
    const getID = id ? id : "";
    const response = await axios.get(API_URL + endPoint + "?id=" + getID);
    return response.data;
  } catch (error) {
    console.error("Error fetching place information:", error);
    toast.error('Error');
    throw error;
  }
};
