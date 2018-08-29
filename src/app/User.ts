
export class User{
    inputs: string[];
    id:number;
    formid: number;
    
    constructor(inputs:string[], formId: number){
        this.inputs= inputs;
        this.formid= formId;
    }
}