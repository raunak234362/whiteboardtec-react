import { JobPortalInterface } from "./index";
import api from "./api";
class Service{
 static async JobPortal({data}:JobPortalInterface){
    try {
        const response = await api.post("/jobportal", data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        alert("Something went wrong, Please try again later")
    }
}
}
export default Service