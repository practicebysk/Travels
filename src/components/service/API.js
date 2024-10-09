import axios from "axios";
import { toast } from "react-toastify";

const APIURL = import.meta.env.VITE_API_URL;

export const getPlace = async (endPoint, id) => {
  try {
    const getID = id ? "?id=" + id : "";
    const response = await axios.get(APIURL + endPoint + getID);
    return response.data;
  } catch (error) {
    console.error("Error fetching place information:", error);
    toast.error('Error');
    throw error;
  }
};
