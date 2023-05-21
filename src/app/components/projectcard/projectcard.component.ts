import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss'],
})
export class ProjectcardComponent {
  @Input() projects: any;
}
