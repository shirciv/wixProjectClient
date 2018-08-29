import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {Field} from '../Field';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {UsersService} from '../users.service';
import {FormsService} from '../forms.service';

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.css']
})
export class SubmissionPageComponent implements OnInit {
  formid: number;
  users: User[] ;
  fields: Field[];
  /* [{id:1, inputs:["shir","civier","0525490777"]}, {id:2, inputs:["doron","einbar","0524281959"]}]
  fields : Field[] = [{label:"first Name", inputName:"name", type:"text"},
  {label:"Last Name", inputName:"name", type:"text"},
  {label:"phone number", inputName:"tel", type:"tel"}];*/
 
  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private FormService: FormsService,
    private location: Location) {
   }

  ngOnInit() {
    this.formid =+this.route.snapshot.paramMap.get('id');
    this.getInputs();
    this.getIdFields();
  }

  getInputs():void{
    //const id = +this.route.snapshot.paramMap.get('id');
    this.usersService.getInputs(this.formid) .subscribe(users => this.users = users);
  }

  getIdFields():void{
    this.FormService.getFields(this.formid).subscribe(fields => this.fields=fields);
  }

}
