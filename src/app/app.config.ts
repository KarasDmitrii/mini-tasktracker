import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DEFAULT_DIALOG_CONFIG } from "@angular/cdk/dialog";
import { MatDialogRef } from "@angular/material/dialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    {provide: DEFAULT_DIALOG_CONFIG, useValue: {hasBackdrop: false}},
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]

};
