import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/state/effects/projects.effect';
import { projects } from 'src/app/state/selectors/projects.selector';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<any | null>;
  constructor(private projectService: ProjectService, private store: Store) {
    this.projects$ = this.store.select(projects);
  }
  fetchProjects = () => this.projectService.fetchProjects();
  ngOnInit() {
    this.fetchProjects();
  }
  projects = [
    { id: 0, title: 'VisitBeniMellal' },
    { id: 1, title: 'VisitFexMeknes' },
    { id: 2, title: 'Tremau' },
    { id: 3, title: 'VisitBeniMellal' },
    { id: 4, title: 'VisitBeniMellal' },
    { id: 5, title: 'VisitBeniMellal' },
  ];
}
