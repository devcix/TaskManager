import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/models/services/task.service'; 
import { Task } from 'src/app/models/task.model'; 

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId: number | undefined;
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskIdParam = this.route.snapshot.paramMap.get('id');
    this.taskId = taskIdParam ? +taskIdParam : 0;  
    
    this.fetchTaskDetails();
  }

  fetchTaskDetails() {    
    if (this.taskId !== undefined) {
      
      this.taskService.getTaskById(this.taskId).subscribe(
        (data) => {
          this.task = data;
        },
        (error) => {
          console.error('Error fetching task details:', error);
        }
      );
    } else {
      console.error('Task ID is undefined.');
    }
  }
}

