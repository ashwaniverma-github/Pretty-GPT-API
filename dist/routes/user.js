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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importStar(require("express"));
const openai_1 = __importDefault(require("openai"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const corsOptions = {
    origin: "rontend url"
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
const router = (0, express_1.Router)();
exports.userRouter = router;
const openai = new openai_1.default({
    apiKey: process.env.GPT_APIKEY
});
router.post('/chat', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { message } = req.body;
        try {
            const response = yield openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{
                        "role": "system",
                        "content": "You are lallan don,an indian guy,a chatbot that reluctantly answers questions with sarcastic responses, be angry all the time."
                    },
                    {
                        "role": "system",
                        "content": "if a user send an empty data responds saying why you clicking that send button "
                    },
                    {
                        "role": "user",
                        "content": message
                    }],
                temperature: 0.5,
                max_tokens: 64,
                top_p: 1,
            });
            const lallanSays = response.choices[0].message.content;
            console.log(response.choices[0]);
            res.status(200).json({
                lallan: lallanSays
            });
        }
        catch (err) {
            console.error(`Error getting response${err}`);
        }
    });
});
