import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/state/effects/projects.effect';
import { AuthService } from 'src/app/state/effects/user.effect';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  faSearch = faSearch;
  logoutopen = false;
  searchQuery: string = '';
  openModal = () => (this.logoutopen = !this.logoutopen);
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router
  ) {}
  logout = () => {
    this.authService.logout();
  };
  @HostListener('document:click', ['$event'])
  onSearchChange(): void {
    if (this.searchQuery.length > 0) {
      this.projectService.searchProject(this.searchQuery);

      this.router.navigate(['/dashboard/projects']);
    }
  }
  clickout(event: MouseEvent) {
    if (
      !(document.getElementById('logoutcontainer') as HTMLElement).contains(
        event.target as Node
      )
    ) {
      this.logoutopen = false;
    }
  }
}
