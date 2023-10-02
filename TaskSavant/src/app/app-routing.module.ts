// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
