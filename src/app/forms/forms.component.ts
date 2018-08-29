import { Component, OnInit } from '@angular/core';
import {Form} from '../form';
import {Field} from '../Field';
import {FormsService} from '../forms.service';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {

  forms: Form[] ;
  //=[{id:1 , formName: "job", numofSub:2, linkSubmit:"api.bvfd", linkSubmission:"fdsdfsd", fields:[]},
    //              {id:2 , formName: "blabla", numofSub:2, linkSubmit:"api.bvfd", linkSubmission:"fdsdfsd", fields:[]}  ];

constructor(private formService : FormsService) {}

  getForms() :void{
    this.formService.getForms().subscribe(forms => this.forms=forms);
  }
  ngOnInit() {
    this.getForms();
  }

  /*add(name: string) : void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }*/

}
