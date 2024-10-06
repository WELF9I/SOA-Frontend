import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeMatieresComponent } from './liste-matieres/liste-matieres.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { RechercheParMatiereComponent } from './recherche-par-matiere/recherche-par-matiere.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateMatiereComponent } from './update-matiere/update-matiere.component';
import { UpdateCoursComponent } from './update-cours/update-cours.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AddCoursComponent,
    ForbiddenComponent,
    ListeMatieresComponent,
    LoginComponent,
    CoursesComponent,
    RechercheParMatiereComponent,
    RechercheParNomComponent,
    UpdateMatiereComponent,
    UpdateCoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
