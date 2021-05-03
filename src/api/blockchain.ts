import {API, LCD} from "../lcd";

export class Blockchain extends API {
    constructor(lcd: LCD) {
        super(lcd);
    }

    async getNodeInfo() {
        return this.lcd.get("node_info");
    }

    async getLatestBlock() {
        return this.lcd.get("blocks/latest");
    }

    async getBlockNumber(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getLatestBlock().then((latest) => resolve(+latest.block.header.height)).catch(reject);
        });
    }

    async getBlock(height: number) {
        return this.lcd.get("blocks/" + height);
    }

    async getLatestValidatorSets() {
        return this.lcd.get("validatorsets/latest");
    }

    async getValidatorSets(height: number) {
        return this.lcd.get("validatorsets/" + height);
    }
}
