import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/models/services/task.service'; 
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTaskId: number = null;
  editableRow: number | null = null;
  latestTask: number | null = null;
  selectedTask: Task;
  newTaskForm: FormGroup;
  updateFormGroup: FormGroup;
  
  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder ) {    
    this.updateFormGroup, this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      dueDate: [null, Validators.required],
      assignedTo: [''],
      completed: [false],
      description: ['']
      }
    )
  }
    

  ngOnInit(): void {    
    this.fetchTasks();
    // this.newTaskForm= new FormGroup(
    //   {
    //     name: new FormControl(null),
    //     dueDate: new FormControl(null),
    //     assignedTo: new FormControl(null),
    //     completed: new FormControl(false),
    //     description: new FormControl(null)
    //   }
    // )

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

  onTaskClick(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(task => {
      this.selectedTask = task;
    })
  }

  viewTask(id: any){
    this.router.navigate(['/task', id]);
  }

  editTask(id: any){
    this.editableRow = id;
    let taskData = null;
    this.taskService.getTaskById(id).subscribe(resp => {  
      taskData = resp;
      console.log(taskData);

      this.updateFormGroup = new FormGroup(
        {
          name: new FormControl(taskData.name),
          dueDate: new FormControl(taskData.dueDate),
          assignedTo: new FormControl(taskData.assignedTo),
          completed: new FormControl(taskData.completed),
          description: new FormControl(taskData.description)
        }
      )
      console.log(this.updateFormGroup)
    },
    error => {
      console.log("Error fetching task data ", error);
    });
  }

  cancelEdit(){
    this.editableRow = null;
  }

  updateTask(id: any){
    console.log('Updaing Task ', this.updateFormGroup);  
    if (this.updateFormGroup.valid) {
      const formData = this.updateFormGroup.value;
      this.taskService.updateTask(id, formData).subscribe(
        response => {
          // console.log('Task updated successfully', response);
          setTimeout(()=>{this.router.navigate(['task/', id])}, 1000);
        },
        error => {
          console.error('Error adding task', error);
        }
      );
    }
  }

  deleteTask(id:any){
    if(confirm("All deletions are perminant, proceed?")){
      this.taskService.deleteTask(id).subscribe(
        response => {
          // console.log('Task added successfully', response);
          this.fetchTasks();
        },
        error => {
          console.error('Error deleting task', error);
        }
      );
    } else {
      alert("Deletion Canceled!!!");
    }
    
  }

  addTask(){
    console.log('Adding new Task to list', this.newTaskForm);  
    if (this.newTaskForm.valid) {
      const formData = this.newTaskForm.value;
      console.log(formData);
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

  completeTask(id:any){
    console.log("Completing Task ", id);
  }

}
