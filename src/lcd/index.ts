import {Coin, Fee, StdTx} from "../message";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {DENOM, GAS_ADJUSTMENT, MIN_GAS_PRICE} from "../const";

export * from "./api";

const instances: { [chainId: string]: LCD } = {};

interface lcdOptions {
    gasPrice?: number,
    gasAdjustment?: number,
    denom?: string
}

const API_ESTIMATE_GAS = "txs/estimate_gas";

export class LCD {
    public readonly chainId: string;
    public readonly url: string;
    public readonly gasPrice: number;
    public readonly gasAdjustment: number;
    public readonly denom: string;

    constructor(chainId: string, url: string, options: lcdOptions = {}) {
        if (url.substr(-1) !== '/')
            url = url + '/';

        this.chainId = chainId;
        this.url = url;

        this.denom = options.denom || DENOM;
        this.gasPrice = options.gasPrice || MIN_GAS_PRICE;
        this.gasAdjustment = options.gasAdjustment || GAS_ADJUSTMENT
    }

    static getInstance(chainId: string): LCD {
        if (!instances.hasOwnProperty(chainId))
            throw new Error("No instance for this chainId: " + chainId);

        return instances[chainId];
    }

    public estimateGas(stdTx: StdTx, adj?: number, gasPrice?: number, denom?: string): Promise<Fee> {
        if (!(stdTx instanceof StdTx))
            throw 'stdTx must be StdTx';

        const body = {
            tx: {msg: stdTx.value.msg, memo: stdTx.value.memo},
            adj: (adj || this.gasAdjustment).toString()
        };

        return new Promise<Fee>((resolve, reject) => {
            this.post(API_ESTIMATE_GAS, body).then((json) => {
                if (!json.result || !json.result.adjusted)
                    reject(new Error('Estimate transaction gas failed'));

                const gas: number = parseInt(json.result.adjusted);
                const amount = Math.ceil(gas * (gasPrice || this.gasPrice)).toString();

                const coin: Coin = new Coin(amount, denom || this.denom);

                resolve(new Fee(gas.toString(), [coin]));
            }).catch(reject);
        });
    }

    public get(api: string, query?: object): Promise<any> {
        query = query || {};

        return new Promise<any>((resolve, reject) => {
            call(this.url + api, {
                method: 'GET',
                params: query
            })
                .then((res) => resolve(res.data))
                .catch(reject);
        })
    }

    public post(api: string, body?: object): Promise<any> {
        // let bodyStr: string;
        //
        // try {
        //     bodyStr = JSON.stringify(body || {});
        // } catch (e) {
        //     throw e;
        // }

        return new Promise<any>((resolve, reject) => {
            call(this.url + api, {
                method: 'POST',
                data: body,
                headers: {'Content-Type': 'application/json'}
            })
                .then((res) => resolve(res.data))
                .catch(reject);
        })
    }
}

function call(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axios(url, config).catch(e => {
        if (e.isAxiosError && e.response && e.response.data && e.response.data.error)
            throw new Error(e.response.data.error);

        throw e;
    });
}
