import { Axios, AxiosRequestConfig } from 'axios';
import { BlockchainNetwork, Block, Transaction } from './types';

const BASE_URL = 'https://api.rosetta.io';

const API_VERSION = 'v1';

const DEFAULT_OPTIONS = {
    baseURL: `${BASE_URL}/${API_VERSION}`,
    headers: {
        'Content-Type': 'application/json',
    },
};

class RosettaClient {
    private readonly httpClient: Axios;

    public constructor(options?: AxiosRequestConfig) {
        this.httpClient = new Axios({
        ...DEFAULT_OPTIONS,
        ...options,
        });
    }

    public async getBlockchainNetwork(networkIdentifier: string): Promise<BlockchainNetwork> {
        const response = await this.httpClient.get<BlockchainNetwork>(`/network/${networkIdentifier}`);
        return response.data;
    }

    public async getBlock(networkIdentifier: string, blockIdentifier: string): Promise<Block> {
        const response = await this.httpClient.get<Block>(`/block/${networkIdentifier}/${blockIdentifier}`);
        return response.data;
    }

    public async getTransaction(networkIdentifier: string, transactionIdentifier: string): Promise<Transaction> {
        const response = await this.httpClient.get<Transaction>(`/transaction/${networkIdentifier}/${transactionIdentifier}`);
        return response.data;
    }
}

export default RosettaClient;