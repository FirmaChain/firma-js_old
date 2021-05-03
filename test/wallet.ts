import {Wallet} from "../src";

describe('wallet', () => {
    describe('generateMnemonic', () => {
        it('generate random mnemonic', () => {
            const mnemonic = Wallet.generateMnemonic();
            expect(mnemonic).toBeDefined();
            expect(mnemonic.split(' ')).toHaveLength(24);
        })
    })
});