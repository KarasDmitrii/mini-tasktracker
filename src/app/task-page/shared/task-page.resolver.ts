import { ResolveFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { MtTaskService } from "../../services/task.service";
import { catchError, EMPTY, tap } from "rxjs";


export const MtTaskPageResolver: ResolveFn<any> = (route, state) => {
  const taskId = route.paramMap.get('id') ?? '';

  return inject(MtTaskService).getTask(taskId).pipe(
    tap(data => console.log(data)),
      catchError(() => {
        inject(Router).navigate([''], { skipLocationChange: true });

        return EMPTY;
      })
    )
}
