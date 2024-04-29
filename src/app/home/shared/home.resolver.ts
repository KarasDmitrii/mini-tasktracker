import { MtFakeApiService } from "../../fake-api/fake-api.service";
import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import {tap} from "rxjs";


export const MtHomeResolver: ResolveFn<any> = () => {
  // return inject(MtFakeApiService).getTasks().pipe(
  //   tap((data) => {
  //     console.log(data)
  //     return data
  //   })
  // ).subscribe()
  return inject(MtFakeApiService).getTasks()
}
