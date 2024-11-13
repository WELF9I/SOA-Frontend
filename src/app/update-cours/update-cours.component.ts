import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';
import { Image } from "../model/image.model";

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styles: []
})
export class UpdateCoursComponent implements OnInit {
  currentCours = new Cours();
  matieres!: Matiere[];
  updatedMatiereId!: number;
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private coursService: CoursService
  ) { }

  ngOnInit(): void {
    this.coursService.listeMatieres().subscribe(mats => {
      this.matieres = mats;
      console.log(mats);
    });

    this.coursService.consulterCours(this.activatedRoute.snapshot.params['id'])
      .subscribe(cours => { 
        this.currentCours = cours; 
        this.updatedMatiereId = cours.matiere.id; 
        
        if (this.currentCours.image && this.currentCours.image.idImage) {
          this.coursService.loadImage(this.currentCours.image.idImage)
            .subscribe((img: Image) => { 
              this.myImage = 'data:' + img.type + ';base64,' + img.image; 
            });
        }     
      });
  }

  updateCours() {
    this.currentCours.matiere = this.matieres.find(m => m.id == this.updatedMatiereId)!;
    
    if (this.isImageUpdated) {
      this.coursService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, this.currentCours.id)
        .subscribe(updatedCours => {
          this.router.navigate(['courses']);
        });
    } else {
      this.coursService.updateCours(this.currentCours)
        .subscribe(() => {
          this.router.navigate(['courses']);
        });
    }
  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { 
        this.myImage = reader.result as string;
      }
    }
  }
}