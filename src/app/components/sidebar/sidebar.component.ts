import { Component } from '@angular/core';
import { appRoutes } from 'src/app/routes/routes';
import {
  faHome,
  faNoteSticky,
  faCubesStacked,
  faBarsProgress,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  openModal = false;
  currentIcon = (icon: string) => {
    switch (icon) {
      case 'projects':
        return faHome;
      case 'tasks':
        return faNoteSticky;
      case 'board':
        return faCubesStacked;
      case 'progress':
        return faBarsProgress;
      default:
        return faNoteSticky;
    }
  };
  routes = appRoutes
    .filter((route) => route.path === 'dashboard')[0]
    .children?.filter((route) => route.path !== '');
  routers = this.routes?.map((route) => {
    return {
      ...route,
      icon: this.currentIcon(route.path),
    };
  });
  handleModal = () => (this.openModal = !this.openModal);
}
