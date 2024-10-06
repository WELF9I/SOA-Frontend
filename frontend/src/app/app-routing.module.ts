import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursComponent } from './add-cours/add-cours.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeMatieresComponent } from './liste-matieres/liste-matieres.component';
import { LoginComponent } from './login/login.component';
import { CoursGuard } from './guards/cours.guard'; 
import { CoursesComponent } from './courses/courses.component';
import { RechercheParMatiereComponent } from './recherche-par-matiere/recherche-par-matiere.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateCoursComponent } from './update-cours/update-cours.component';
import { UpdateMatiereComponent } from './update-matiere/update-matiere.component';

const routes: Routes = [
  {path: "courses", component: CoursesComponent},
  {path: "add-cours", component: AddCoursComponent, canActivate: [CoursGuard]},
  {path: "updateCours/:id", component: UpdateCoursComponent},
  {path: "rechercheParMatiere", component: RechercheParMatiereComponent},
  {path: "rechercheParNom", component: RechercheParNomComponent},
  {path: "listeMatieres", component: ListeMatieresComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "", redirectTo: "courses", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }