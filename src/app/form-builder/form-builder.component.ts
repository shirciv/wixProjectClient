import { Component, OnInit } from '@angular/core';
import {Field} from '../Field';
import {Form} from '../Form';
import {FormsService} from '../forms.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  forms: Form[];
  fields : Field[] =[] ;
  /* =[{label:"first Name", inputName:"name", type:"text"},
                      {label:"Last Name", inputName:"name", type:"text"},
                      {label:"phone number", inputName:"tel", type:"tel"}];*/
  constructor(private formService : FormsService) { }

  ngOnInit() {
  }

  addField(Label:string , InputName: string, Type: string):void {
    if(Label!="" || InputName!=""){
      Label = Label.trim();  //cleans white spaces
      InputName= InputName.trim();
      Type=Type.trim();
      this.fields.push({label: Label, inputName:InputName, type:Type});
    }
    else
      alert("ERROR : empty fields!")
  }

 addNewForm(name: string):void{
    name=name.trim();
    if(!name) return ;
    var newForm= new Form(this.fields, name, 0);
    this.formService.addNewForm(newForm).subscribe(form =>this.forms.push(form));
    window.location.href='http://localhost:4200/Forms';
    alert("form"+name+"has been created successfully!")
    this.fields=[];
  }

}
