import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { userReducer } from './state/reducers/user.reducer';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthService } from './state/effects/user.effect';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SignupformComponent } from './components/signupform/signupform.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ProjectcardComponent } from './components/projectcard/projectcard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectService } from './state/effects/projects.effect';
import { projectsReducer } from './state/reducers/projects.reducer';
import { KanbanboardComponent } from './components/kanbanboard/kanbanboard.component';
import { BoardComponent } from './pages/board/board.component';
import { tasksReducer } from './state/reducers/tasks.reducer';
import { TaskcardComponent } from './components/taskcard/taskcard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TasksService } from './state/effects/tasks.effect';
import { TaskdetailsComponent } from './components/taskdetails/taskdetails.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ToastrModule } from 'ngx-toastr';
import { ProgressComponent } from './pages/progress/progress.component';
import { ModalComponent } from './components/modal/modal.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FiltersComponent } from './components/filters/filters.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    ProjectsComponent,
    DashboardComponent,
    AppComponent,
    LoginformComponent,
    LoginComponent,
    SignupComponent,
    SignupformComponent,
    SidebarComponent,
    SearchbarComponent,
    ProjectcardComponent,
    KanbanboardComponent,
    BoardComponent,
    TaskcardComponent,
    TasksComponent,
    TaskdetailsComponent,
    ProgressComponent,
    ModalComponent,
    FiltersComponent,
  ],
  imports: [
    HttpClientModule,
    KanbanModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5071'],
        disallowedRoutes: [],
      },
    }),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      user: userReducer,
      projects: projectsReducer,
      tasks: tasksReducer,
    }),
    EffectsModule.forRoot([AuthService, ProjectService, TasksService]),
    FontAwesomeModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, ProjectService, TasksService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
