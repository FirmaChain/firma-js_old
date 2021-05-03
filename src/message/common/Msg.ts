import {sortObject} from "../../utils";

export class Sortable {
    public sort() {
        return sortObject(this);
    }

    public printJSON(): string {
        return JSON.stringify(this.sort());
    }
}

export class Msg extends Sortable {
    type: string;
    value: object;

    constructor() {
        super();

        this.type = '';
        this.value = {};
    }

    public getType() {
        return this.type;
    }

    public getValue() {
        return this.value;
    }

    public getSortedValue() {
        return sortObject(this.value);
    }
}
