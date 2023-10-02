// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import your AppRoutingModule
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
