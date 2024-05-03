import { Component } from '@angular/core';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow} from "@angular/material/chips";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatInput, MatSuffix} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";
import {ITask} from "../fake-api/task.model";
import {MatIcon} from "@angular/material/icon";
import {MtTaskService} from "../services/task.service";
import {provideNativeDateAdapter} from "@angular/material/core";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    MatChipGrid,
    MatChipInput,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatInput,
    MatStartDate,
    MatSuffix,
    ReactiveFormsModule,
    MatChipRow,
    MatIcon,
    AsyncPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class MtTaskPageComponent {

  protected taskData: ITask;
  protected performers: string[] = ['i']

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: MtTaskService
  ) {
    activatedRoute.data.pipe(
      tap(({ task }) => {
        console.log(task)
        this.taskData = task.data
        this.changeTaskForm.patchValue({
          name: task.data.name,
          description: task.data.description,
          start: task.data.startDate,
          end: task.data.endDate,
          // priority: task.data.priority
        })
    })
    ).subscribe()
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.performers.push(value);
    }

    event.chipInput!.clear();
  }

  remove(person: string): void {
    const index = this.performers.indexOf(person);

    if (index >= 0) {
      this.performers.splice(index, 1);
    }
  }

  changeTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    description: new FormControl('', ),
  });

  onSubmit(): void {
    this.taskService.postTask({
      name: this.changeTaskForm.value.name ?? '',
      description: this.changeTaskForm.value.description ?? '',
      performers: this.performers,
      startDate: this.changeTaskForm.value.start ?? new Date(),
      endDate: this.changeTaskForm.value.end ?? null,
      priority: 'Низкий'
    });
    // this.dialogRef.close()
  }
}
