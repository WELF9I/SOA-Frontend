import { Component, OnInit } from '@angular/core';
import { Cours } from '../model/cours.model';
import { AuthService } from '../services/auth.service';
import { CoursService } from '../services/cours.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses?: Cours[];

  constructor(
    private coursService: CoursService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.chargerCours();
  }

  chargerCours() {
    this.authService.ensureAuthenticatedRequest().pipe(
      switchMap(() => this.coursService.listeCours())
    ).subscribe({
      next: (coursList) => {
        console.log(coursList);
        this.courses = coursList;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        if (error.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  supprimerCours(c: Cours) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.authService.ensureAuthenticatedRequest().pipe(
        switchMap(() => this.coursService.supprimerCours(c.id))
      ).subscribe({
        next: () => {
          console.log("Cours supprimé");
          this.chargerCours();
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          if (error.status === 401) {
            this.authService.logout();
          }
        }
      });
    }
  }
}