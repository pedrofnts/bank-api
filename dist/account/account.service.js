"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const ca_class_1 = require("./ca.class");
const sa_class_1 = require("./sa.class");
let accounts = {
    1: new ca_class_1.Ca("01", "02"),
    2: new sa_class_1.Sa("02", "01"),
};
const findAll = async () => Object.values(accounts);
exports.findAll = findAll;
const find = async (id) => accounts[id];
exports.find = find;
const create = async (newAccount) => {
    const id = new Date().valueOf();
    accounts[id] = newAccount;
    return accounts[id];
};
exports.create = create;
const update = async (id, accountUpdate) => {
    const account = await (0, exports.find)(id);
    if (!account) {
        return null;
    }
    accounts[id] = accountUpdate;
    return accounts[id];
};
exports.update = update;
const remove = async (id) => {
    const account = await (0, exports.find)(id);
    if (!account) {
        return null;
    }
    delete accounts[id];
};
exports.remove = remove;
