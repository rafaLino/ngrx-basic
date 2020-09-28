import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import * as faker from 'faker';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { PersonAll, PersonNew, PersonUpdate, PersonDelete } from './store/person.action';

import * as fromPeopleSelectors from './store/person.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  people$: Observable<Person[]>;

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.dispatch(new PersonAll());
    this.people$ = this.store.select(fromPeopleSelectors.selectAll);
  }

  public add() {
    let person: Person = {
      name: faker.name.findName(),
      age: Math.round(Math.random() * 100),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      _id: new Date().getMilliseconds().toString()
    };

    this.store.dispatch(new PersonNew({ person }));
  }

  public update(p: Person) {
    let person: Person = {
      ...p,
      name: faker.name.findName(),
      age: Math.round(Math.random() * 100),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
    }

    this.store.dispatch(new PersonUpdate({ id: person._id, changes: person }));
  }

  public delete(p: Person) {
    this.store.dispatch(new PersonDelete({ id: p._id }));
  }

}
