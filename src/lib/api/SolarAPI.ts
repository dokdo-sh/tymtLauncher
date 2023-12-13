import axios, { AxiosResponse } from 'axios';

const DEFAULT_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
    },
};

class SolarAPI {
    static async addTxToQueue (body: any, url: string) : Promise<AxiosResponse<any, any>> {
        return await axios.post( `${url}/transactions`, body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }
        )
    }
}

export default SolarAPI;