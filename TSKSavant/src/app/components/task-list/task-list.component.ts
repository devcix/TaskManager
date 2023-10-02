import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editableRow: any = null;

  constructor(private taskService: TaskService) {}
  
  newTaskForm: FormGroup | undefined;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })

    
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

  cancelEditTask(){}
  cancelEditNewTask(){}
  doAddTask(){}
  doEditTask(){}
  doDeleteTask(){}
  doUpdateTask(){}

}
