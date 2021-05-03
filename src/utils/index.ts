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
