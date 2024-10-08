import { getPlace } from "../components/service/API";

export const fetchPlaceList =
  (search = "", fromDate = "", toDate = "") =>
  async (dispatch) => {
    try {
      const data = await getPlace("place");
      if (data) {
        const filterData = data.filter((ele) => {
          const searchData = search
            ? ele.name.toLowerCase().includes(search.toLowerCase())
            : true;
          const fromDateValid = fromDate
            ? new Date(ele.fromDate) >= new Date(fromDate)
            : true;
          const toDateValid = toDate
            ? new Date(ele.toDate) <= new Date(toDate)
            : true;

          return searchData && fromDateValid && toDateValid;
        });

        console.log("Filtered data:", filterData); // Log filtered data
        dispatch({ type: "ALL_PLACE_SUCCESS", payload: filterData });
      }
    } catch (error) {
      console.error("Failed to fetch places:", error);
    }
  };
