import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../task/task-type';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  standalone: false
})
export class TaskDetailsComponent implements OnInit {
  task: ITask = {
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    enabled: true,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Access the task ID from the route parameters
    this.route.params.subscribe((params) => {
      const taskId = +params['id']; // '+' is used to convert the parameter to a number if it's a string

      // Now, you have the taskId and can use it to fetch the corresponding task data
      // For example, you can call a service to retrieve the task data
      // this.fetchTaskData(taskId);

      // this.task = tasks.find((task) => task.id === taskId);
    });
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }
}
