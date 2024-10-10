import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeMatieresComponent } from './liste-matieres/liste-matieres.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { RechercheParMatiereComponent } from './recherche-par-matiere/recherche-par-matiere.component';
import { UpdateMatiereComponent } from './update-matiere/update-matiere.component';
import { UpdateCoursComponent } from './update-cours/update-cours.component';
import { FormsModule } from '@angular/forms';
import { RechercheParTitleComponent } from './recherche-par-title/recherche-par-title.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddCoursComponent,
    ForbiddenComponent,
    ListeMatieresComponent,
    LoginComponent,
    CoursesComponent,
    RechercheParMatiereComponent,
    UpdateMatiereComponent,
    UpdateCoursComponent,
    RechercheParTitleComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
