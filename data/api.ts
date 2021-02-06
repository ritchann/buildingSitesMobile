import axios from "axios";

const url = "http://localhost:3000/";

export const getSiteList = () => axios.get(url + "site");

// export const setSiteEvent = (data: SiteEventRequest) => {
//   return axios.post("http://drop-table.tech/api/site-event", data);
// };
