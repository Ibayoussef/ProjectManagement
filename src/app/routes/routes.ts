import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { TasksComponent } from '../pages/tasks/tasks.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BoardComponent } from '../pages/board/board.component';
type PathMatch = 'full' | 'prefix' | undefined;
export const appRoutes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full' as PathMatch,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/projects', pathMatch: 'full' as PathMatch },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'board', component: BoardComponent },
      { path: 'progress', component: TasksComponent },
    ],
    canActivate: [AuthGuard],
  },
];
