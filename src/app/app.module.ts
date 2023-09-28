import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskV2Component } from './task-v2/task-v2.component';
import { HeaderComponent } from './header/header.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { reducers } from 'src/store/app.state';
import { TaskEffects } from 'src/store/tasks/effects';
import { TaskEffectsV2 } from 'src/store/tasksV2/effects';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskV2Component,
    HeaderComponent,
    TaskDetailsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TaskEffects, TaskEffectsV2]),
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSlideToggleModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
