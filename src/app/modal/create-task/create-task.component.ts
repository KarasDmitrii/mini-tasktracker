import { Component, Inject } from '@angular/core';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormField, MatInput, MatSuffix } from "@angular/material/input";
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow, MatChipRemove } from "@angular/material/chips";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import {ITask} from "../../fake-api/task.model";
import { MtFakeApiService } from "../../fake-api/fake-api.service";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatChipRemove,
    MatIconModule,
    MatDateRangeInput,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatSuffix,
    MatDateRangePicker
  ],
  providers: [provideNativeDateAdapter(), MtFakeApiService],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  protected performers: string[] = ['i']

  constructor(
    public dialogRef: DialogRef<string>,
    public fakeApiService: MtFakeApiService,
    @Inject(DIALOG_DATA) public data: ITask,
    ) { }

  newTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    description: new FormControl('', ),
  });

  onSubmit(): void {
    this.fakeApiService.postTask({
      name: this.newTaskForm.value.name ?? '',
      description: this.newTaskForm.value.description ?? '',
      performers: this.performers,
      startDate: this.newTaskForm.value.start ?? new Date(),
      endDate: this.newTaskForm.value.end ?? null,
      priority: 'Низкий'
    });
    this.dialogRef.close()
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
}
