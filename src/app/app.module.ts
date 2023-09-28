import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'src/store/app.state';
import { TaskEffects } from 'src/store/tasks/effects';
import { TaskEffectsV2 } from 'src/store/tasksV2/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskV2Component } from './task-v2/task-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskV2Component,
    HeaderComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TaskEffects, TaskEffectsV2]),
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
