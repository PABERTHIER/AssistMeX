# AssistMeX

[![CICD](https://github.com/PABERTHIER/AssistMeX/actions/workflows/build.yml/badge.svg)](https://github.com/PABERTHIER/AssistMeX/actions/workflows/build.yml)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
The actual version is now 18.0.3.

## What is it ?

This is a small project, created to learn how to use Angular 16/17 from scratch.
This project covers all basics concepts of Angular.
More in depth, this is a task management application.
You can add, edit, update, delete and hide tasks.
Each task is displayed in the home page, they can be moved and placed anywhere (`'@angular/cdk/drag-drop'`).
By using the routing, it is possible to navigate into the content of each task and then go back to the home.

The switch button in the footer will change the version of the store archictecture used in the application.
To make my own opinion about which is the best architecture to use, I've implemented both to highlight the strength for each:

- The V1 is about the optimized way by using an adapter: [ngrx](https://ngrx.io/guide/entity/adapter).
- The V2 is about the basic way.

The entry point of data is a json file, that is read at the startup of the application, there is, at the moment, no mechanism to save the new tasks in a database.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
