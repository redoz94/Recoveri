import axios from 'axios';




const baseApi = "https://paym-api.herokuapp.com";



export const postRequest = async (api, data) => {
    const APIURL = baseApi + "/" + api;
    console.log("In post  request", api, data);
    try {
        let response = await axios.post(APIURL, data);
        console.log("API Response", api, response);
        // toast.success(response.status+"\n"+response.data);
        return response;
    } catch (err) {
        // Handle Error Here
        console.log("Error in API", APIURL, data, err);

    }

}