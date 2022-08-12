"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const express_1 = __importDefault(require("express"));
const AccountService = __importStar(require("./account.service"));
const ca_class_1 = require("./ca.class");
const sa_class_1 = require("./sa.class");
exports.accountsRouter = express_1.default.Router();
exports.accountsRouter.get("/", async (req, res) => {
    try {
        const accounts = await AccountService.findAll();
        res.status(200).send(accounts);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
exports.accountsRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const account = await AccountService.find(id);
        if (account) {
            return res.status(200).send(account);
        }
        res.status(404).send("Account not found");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.accountsRouter.post("/create", async (req, res) => {
    try {
        let account;
        if (req.body.type == "ca") {
            account = new ca_class_1.Ca(req.body.account_number, req.body.branch);
        }
        else {
            account = new sa_class_1.Sa(req.body.account_number, req.body.branch);
        }
        const newAccount = await AccountService.create(account);
        res.status(201).json(newAccount);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.accountsRouter.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const accountUpdate = req.body;
        const account = await AccountService.find(id);
        if (account) {
            const updatedAccount = await AccountService.update(id, accountUpdate);
            return res.status(200).json(updatedAccount);
        }
        const newAccount = await AccountService.create(accountUpdate);
        res.status(201).json(newAccount);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.accountsRouter.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const account = await AccountService.find(id);
        if (account) {
            await AccountService.remove(id);
            res.sendStatus(204).send("Account deleted");
        }
        res.sendStatus(404).send("Account not found");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
