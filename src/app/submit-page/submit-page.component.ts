import { Component, OnInit } from '@angular/core';
import {Field} from '../Field';
import {User} from '../User';
import {Form} from '../form';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {UsersService} from '../users.service';
import {FormsService} from '../forms.service';


@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})

export class SubmitPageComponent implements OnInit {
    fields : Field[];
    formId : number;
    users: User[];

constructor(private route: ActivatedRoute,
                      private FormsService: FormsService,
                      private UsersService: UsersService,
                      private location: Location) {
                     }

  ngOnInit() {
    this.formId= +this.route.snapshot.paramMap.get('id');
    this.getFields();
     }

  getFields(): void{
    this.FormsService.getFields(this.formId).subscribe(fields => this.fields =fields);
  }

  addNewUser():void{
    
    var inputs =[];
    var len = this.fields.length;
    var text = "";
    for (var i=0; i < len; i++) {
      inputs.push((document.getElementById (this.fields[i].label)["value"]));   
    }   
    window.location.href='http://localhost:4200/SubmissionPage/'+this.formId;
    alert("form "+this.formId+" has been subbmitted successfully!");
    var newUser= new User(inputs,this.formId);
    this.UsersService.addNewUser(newUser).subscribe(user =>this.users.push(user));
    this.updateNumOfSub();
    
  }

  updateNumOfSub():void{
    this.FormsService.updateForm(null).subscribe(form => {});
  }

}
