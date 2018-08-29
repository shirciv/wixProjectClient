import {Field} from './Field';

export class Form{
    fields : Field[];
    formName:string;
    id:number;
    numOfSub:number;
    
    constructor(fields: Field[], formName: string, numofSub : number){
        this.fields = fields;
        this.formName=formName;
        this.numOfSub=numofSub;
    }
}