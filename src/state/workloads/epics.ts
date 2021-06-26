import { combineEpics, Epic } from 'redux-observable';
import { filter, map, tap, mergeMap, delay, takeUntil, takeWhile} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import { WorkloadService } from '././services';
import { of, timer } from 'rxjs';

const service = new WorkloadService()


type AppEpic = Epic<RootAction, RootAction, RootState>;


const createWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    map(action => action.payload),
    tap((payload) => console.log('Workload submitted', payload)),
    mergeMap(async (payload) => {
      console.log(state$);
      const res = await service.create(payload)
      setTimeout(() => workloadsActions.updateStatus(res), res.complexity*1000);
      return workloadsActions.created(res) 
    }
    ),
    //ignoreElements(),
  )
);

const cancelWorkload: AppEpic = (action$, state$) => {
  return action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    map(action => action.payload),
    mergeMap(async (payload) => {
      const workLoad = await service.cancel(payload);
      return workloadsActions.updateStatus({ id: workLoad.id, status: workLoad.status });
    })
  );
}

const updateStatus: AppEpic = (action$, state$) => {
   return action$.pipe(
    takeUntil(action$.pipe(
      filter(isActionOf(workloadsActions.cancel))
    )),
     filter(isActionOf(workloadsActions.created)),
     map(action => action.payload),
     mergeMap(async (payload) => {
      const delay = (ms:any) => new Promise(res => setTimeout(res, ms));     
      // console.log(1);
      await delay(payload.complexity * 1000);
      // console.log(2);
      const newStateWork = await service.checkStatus({id : payload.id});
        console.log(newStateWork.status);
        return workloadsActions.updateStatus({id : newStateWork.id, status: newStateWork.status});

     }
     
     ))  





   


}





export const epics = combineEpics(
  createWorkload,cancelWorkload,updateStatus

 
);

export default epics;