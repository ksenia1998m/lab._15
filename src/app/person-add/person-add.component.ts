import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from "../shared/models/person.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonsService} from "../shared/services/persons.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  id: number;
  addForm: FormGroup;
  disabled_form = false;
  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private personsServise: PersonsService) {
    this.activatedRouter.params.subscribe(param => {
       this.id = param.id;
    });
  }

  public mask = ['+', 7, '(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  ngOnInit() {
    let editPerson = this.personsServise.get_person_by_id(this.id);
    if (isNullOrUndefined(editPerson)) editPerson = {firstname: "", lastname: "", phone: ""};
    this.addForm = new FormGroup( {
      firstname: new FormControl({value: editPerson.firstname, disabled: this.disabled_form}, [Validators.required]),
      lastname: new FormControl({value: editPerson.lastname, disabled: this.disabled_form}, [Validators.required]),
      phone: new FormControl({value: editPerson.phone, disabled: this.disabled_form}, [Validators.required])
    })
  }

  onSave() {
    if (this.id) {
      let person = new Person (this.addForm.value.firstname, this.addForm.value.lastname, this.addForm.value.phone, this.id);
      this.personsServise.onEditPerson(person);
    }
    else {
      let person = new Person (this.addForm.value.firstname, this.addForm.value.lastname, this.addForm.value.phone);
      this.personsServise.onAddPerson(person);
    }
    this.router.navigate([`/`]); 

  }
}
