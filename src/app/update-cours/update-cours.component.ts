import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styles: []
})
export class UpdateCoursComponent implements OnInit {

  currentCours = new Cours();
  matieres!: Matiere[];
  updatedMatiereId!: number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.listeMatieres().subscribe(mats => {
      this.matieres = mats;
      console.log(mats);
    });

    this.coursService.consulterCours(this.activatedRoute.snapshot.params['id']).subscribe(cours => {
      this.currentCours = cours;
      this.updatedMatiereId = this.currentCours.matiere.id; 
    });
  }

  updateCours() {
    // Set the current date and time
    this.currentCours.createdDate = new Date().toISOString();

    this.currentCours.matiere = this.matieres.find(mat => mat.id == this.updatedMatiereId)!;
    
    console.log('Updating cours:', this.currentCours);
    
    this.coursService.updateCours(this.currentCours).subscribe(
      cours => {
        console.log('Course updated successfully:', cours);
        this.router.navigate(['courses']);
      },
      error => {
        console.error('Error updating course:', error);
        // Handle the error appropriately
      }
    );
  }
}