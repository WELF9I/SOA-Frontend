import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';
import { Image } from "../model/image.model";

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html'
})
export class AddCoursComponent implements OnInit {

  newCours = new Cours();
  matieres!: Matiere[];
  newIdMatiere!: number;
  uploadedImage!: File;
  imagePath: any;

  constructor(private coursService: CoursService,
              private router: Router) { }

  ngOnInit(): void {
    this.coursService.listeMatieres().subscribe(mats => {
      this.matieres = mats;
      console.log(mats);
    });
  }

  addCours() { 
    this.newCours.createdDate = new Date().toISOString();

    this.coursService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => { 
            this.newCours.image = img; 
            this.newCours.matiere = this.matieres.find(m => m.id == this.newIdMatiere)!;

            this.coursService
                .ajouterCours(this.newCours)
                .subscribe(() => { 
                    this.router.navigate(['courses']); 
                }); 
        }); 
}

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}