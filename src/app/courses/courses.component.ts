import { Component, OnInit } from '@angular/core';
import { Cours } from '../model/cours.model';
import { AuthService } from '../services/auth.service';
import { CoursService } from '../services/cours.service';
import { switchMap } from 'rxjs/operators';
import { Image } from "../model/image.model";
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
        this.courses = coursList;
        this.courses.forEach((cours) => {
          if (cours.image && cours.image.idImage) {
            this.coursService
              .loadImage(cours.image.idImage)
              .subscribe({
                next: (img: Image) => {
                  cours.imageStr = 'data:' + img.type + ';base64,' + img.image;
                },
                error: (err) => {
                  console.error(`Error loading image for course ${cours.id}:`, err);
                  cours.imageStr = ''; // Set a default empty string or placeholder
                }
              });
          } else {
            cours.imageStr = ''; // Set a default empty string or placeholder for courses without images
          }
        });
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