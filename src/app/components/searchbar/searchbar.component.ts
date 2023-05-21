import { Component, HostListener } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/state/effects/user.effect';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  faSearch = faSearch;
  logoutopen = false;
  openModal = () => (this.logoutopen = !this.logoutopen);
  constructor(private authService: AuthService) {}
  logout = () => {
    this.authService.logout();
  };
  @HostListener('document:click', ['$event'])
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
