"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseVapiService = void 0;
class BaseVapiService {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.$toolCalls = null;
        this.vapiId = null;
        this.setToolCallsInRequestBody(request);
    }
    setToolCallsInRequestBody(request) {
        const toolCalls = request.body.message.toolCalls;
        console.log(toolCalls);
        if (toolCalls === undefined || !toolCalls) {
            return;
        }
        this.$toolCalls = toolCalls;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const finalResponse = yield Promise.all(this.$toolCalls.map((toolCall) => __awaiter(this, void 0, void 0, function* () {
                this.vapiId = toolCall.id;
                let vapiArguments = toolCall.function.arguments;
                const result = yield this.execute(vapiArguments);
                const resultObject = [
                    {
                        toolCallId: this.vapiId,
                        result: result,
                    },
                ];
                const returnToVapi = {
                    results: resultObject,
                };
                return returnToVapi;
            })));
            return finalResponse[0];
        });
    }
}
exports.BaseVapiService = BaseVapiService;
