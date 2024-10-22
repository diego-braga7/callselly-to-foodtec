import {  Request, Response } from "express";
export abstract class BaseVapiService {

    protected $toolCalls: any = null;

    constructor(protected request: Request,protected response: Response){
        this.setToolCallsInRequestBody(request);
    }

    private setToolCallsInRequestBody(request: Request){
        const toolCalls: string[] | undefined = request.body.message.toolCalls;
        console.log(toolCalls);

        if (toolCalls === undefined || !toolCalls) {
            return;
        }
        this.$toolCalls = toolCalls;
    }


    public async handle() {
        const finalResponse = await Promise.all(
            this.$toolCalls.map(async (toolCall: any) => {
                let id = toolCall.id;
                let vapiArguments = toolCall.function.arguments;
    
                const result = await this.execute(vapiArguments);
                const resultObject = [
                    {
                        toolCallId: id,
                        result: result,
                    },
                ];
                const returnToVapi = {
                    results: resultObject,
                };
    
                return returnToVapi;
            })
        );
    
        return finalResponse[0];  
    }
    
     abstract execute(vapiArguments: any) : Promise<any>;
}