import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './projects.html',
  styleUrls: ['./projects.less']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get('/api/project')
      .subscribe((data: any) => this.projects = data.list);
  }

}
