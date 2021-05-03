import {API, LCD} from "../lcd";
import {Fee, StdTx} from "../message";

export class Transaction extends API {
    constructor(lcd: LCD) {
        super(lcd);
    }

    async broadcast(tx: StdTx, mode: "sync" | "async" | "block" = "sync") {
        const body = {
            tx: tx.getValue(),
            mode
        };

        return this.lcd.post("txs", body);
    }

    async estimateGas(stdTx: StdTx, adj?: number, gasPrice?: number, denom?: string): Promise<Fee> {
        return this.lcd.estimateGas(stdTx, adj, gasPrice, denom);
    }

    async getTransactionByHash(hash: string) {
        return this.lcd.get("txs/" + hash);
    }
}
