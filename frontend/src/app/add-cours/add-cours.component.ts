import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html'
})
export class AddCoursComponent implements OnInit {

  newCours = new Cours();
  matieres!: Matiere[];
  newIdMatiere!: number;
  newMatiere!: Matiere;
  
  constructor(private coursService: CoursService,
              private router: Router) { }

  ngOnInit(): void {
    this.coursService.listeMatieres().subscribe(mats => {
      this.matieres = mats;  
      console.log(mats);
    });
  }

  addCours() {
    this.newCours.matiere = this.matieres.find(mat => mat.id == this.newIdMatiere)!;
  
    this.coursService.ajouterCours(this.newCours).subscribe(cours => {
      console.log(cours);
      this.router.navigate(['courses']);
    });
  }
}
