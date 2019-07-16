import axios from "axios";

export default () => {
    return axios.create({
        baseURL: `https://api.adsim.co/crm/api/v1/refrigerante/listar`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}