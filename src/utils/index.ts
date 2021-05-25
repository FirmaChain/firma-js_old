import {AccAddress} from "../type";
import {bech32} from "bech32";
import {ADDRESS_PREFIX} from "../const";

export const sortObject = (msg: any): any => {
    if (msg === null)
        return null;
    if (typeof msg !== 'object')
        return msg;
    if (Array.isArray(msg))
        return msg.map(sortObject);

    const sortedKeys: string[] = Object.keys(msg).sort();
    const result: { [key: string]: any } = {};

    sortedKeys.forEach((key: string) => {
        result[key] = sortObject(msg[key]);
    });

    return result;
};

export const isValidAccAddress = (accAddress: AccAddress): boolean => {
    if (!accAddress)
        return false;

    try {
        return bech32.decode(accAddress).prefix === ADDRESS_PREFIX;
    } catch (e) {
        return false;
    }
}
