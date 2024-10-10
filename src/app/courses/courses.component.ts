import { Component, OnInit } from '@angular/core';
import { Cours } from '../model/cours.model';
import { AuthService } from '../services/auth.service';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {

    courses?: Cours[];

  constructor(private coursService: CoursService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerCours();
  }

  chargerCours(){
    this.coursService.listeCours().subscribe(coursList => {
      console.log(coursList);
      this.courses = coursList;
    });
  }

  supprimerCours(c: Cours) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.coursService.supprimerCours(c.id).subscribe(() => {
        console.log("Cours supprimé");
        this.chargerCours();
      });
    }
  }
}
