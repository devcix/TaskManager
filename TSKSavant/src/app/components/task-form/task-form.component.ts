import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task!: Task;
  @Output() updateTask: EventEmitter<Task> = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      dateDue: [null, Validators.required],
      assignedTo: [''],
      completed: [false],
      description: ['']
    });
  }

  ngOnChanges(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = { ...this.task, ...this.taskForm.value };
      this.updateTask.emit(updatedTask);
    }
  }
}
