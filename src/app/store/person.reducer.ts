import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { State } from '@ngrx/store';
import { Person } from '../person';
import * as fromPersonActions from './person.action';

export interface PeopleState extends EntityState<Person> {

}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
    selectId: (p) => p._id
});

export const initalState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(state = initalState, action: fromPersonActions.PersonActions) {
    switch (action.type) {

        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            return peopleAdapter.addOne((<fromPersonActions.PersonNew>action).payload.person, state);

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            return peopleAdapter.updateOne((<fromPersonActions.PersonUpdate>action).payload, state);

        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return peopleAdapter.removeOne((<fromPersonActions.PersonDelete>action).payload.id, state);
        default: return state;
    }
}