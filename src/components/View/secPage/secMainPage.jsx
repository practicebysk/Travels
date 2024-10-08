import { useState, useEffect } from "react";
import PlaceList from "./../placeList/PlaceList";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPlace } from "../../service/API";
import SecHeroSection from "./../../Global/secHeroSection/SecHeroSection";

function SecMainPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // const query = searchParams.get("query");
  const location = useLocation();
  // const searchData = useSelector((state) => state);
  const [sigleData, getsigleData] = useState();
  const [allData, getAllData] = useState();

  useEffect(() => {
    const siglePlace = async () => {
      try {
        const data = await getPlace("place", id);
        if (id) {
          getsigleData(data[0]);
          getAllData();
        } else {
          getsigleData();
          // if (query === "search") {
          //   // getAllData(searchData);
          //   console.log("Search Data:", searchData);
          // } else {
            getAllData(data);
          // }
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };
    siglePlace();
  }, [location]);
  return (
    <div>
      <SecHeroSection imageData={sigleData} />
      <PlaceList imageData={sigleData} imageAllData={allData} />
    </div>
  );
}

export default SecMainPage;
