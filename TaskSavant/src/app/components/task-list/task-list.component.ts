import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/models/services/task.service'; 
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editableRow: number | null = null;
  latestTask: number | null = null;

  
  constructor(private taskService: TaskService, private router: Router ) {}
  
  newTaskForm: FormGroup;

  ngOnInit(): void {    
    this.fetchTasks();
    this.newTaskForm= new FormGroup(
      {
        name: new FormControl(null),
        dueDate: new FormControl(null),
        assignedTo: new FormControl(null),
        completed: new FormControl(false),
        description: new FormControl(null)
      }
    )
  }

  fetchTasks() {    
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  viewTask(id: any){
    this.router.navigate(['/task', id]);
  }

  editTask(id: any){
    this.editableRow = id;
  }

  cancelEdit(){
    this.editableRow = null;
  }

  updateTask(){
    console.log('Updating new Task to list', this.newTaskForm);  
    if (this.newTaskForm.valid) {
      const formData = this.newTaskForm.value;
      this.taskService.updateTask(formData).subscribe(
        response => {
          // console.log('Task updaed successfully', response);
          this.fetchTasks();
        },
        error => {
          console.error('Error adding task', error);
        }
      );
    }
    
  }

  addTask(){
    console.log('Adding new Task to list', this.newTaskForm);  
    if (this.newTaskForm.valid) {
      const formData = this.newTaskForm.value;
      this.taskService.addTask(formData).subscribe(
        response => {
          // console.log('Task added successfully', response);
          this.fetchTasks();
        },
        error => {
          console.error('Error adding task', error);
        }
      );
    }
  }


}
