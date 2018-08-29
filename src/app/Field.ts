export class Field{
    label: string;
    inputName :string;
    type:string;


    constructor(label : string, inputName:string, type: string){
        this.label = label;
        this.inputName=inputName;
        this.type=type;
    }
}