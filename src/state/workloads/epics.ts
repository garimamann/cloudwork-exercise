import { combineEpics, Epic } from 'redux-observable';
import { filter, map, tap, mergeMap} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import { WorkloadService } from '././services';

const service = new WorkloadService()


type AppEpic = Epic<RootAction, RootAction, RootState>;


const createWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    map(action => action.payload),
    tap((payload) => console.log('Workload submitted', payload)),
    mergeMap(async (payload) => {
      const res = await service.create(payload)
      return workloadsActions.created(res) 
    }
    ),
    //ignoreElements(),
  )
);






export const epics = combineEpics(
  createWorkload,

 
);

export default epics;