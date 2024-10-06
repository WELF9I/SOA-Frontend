import { Component, OnInit } from '@angular/core';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-recherche-par-matiere',
  templateUrl: './recherche-par-matiere.component.html',
  styles: []
})
export class RechercheParMatiereComponent implements OnInit {
  IdMatiere!: number;
  matieres!: Matiere[];
  courses!: Cours[];

  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.listeMatieres().subscribe(mats => {
      this.matieres = mats;
      console.log(mats);
    });
  }

  onChange() {
    this.coursService.rechercherParMatiere(this.IdMatiere).subscribe(courses => {
      this.courses = courses;
    });
  }
}
