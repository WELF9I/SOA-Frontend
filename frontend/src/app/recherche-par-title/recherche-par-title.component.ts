import { Component, OnInit } from '@angular/core';
import { Cours } from '../model/cours.model';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-recherche-par-title',
  templateUrl: './recherche-par-title.component.html',
  styles: []
})
export class RechercheParTitleComponent implements OnInit {

  title!: string;
  courses!: Cours[];
  allCourses!: Cours[];
  searchTerm!: string;
  
  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.listeCours().subscribe(courses => {
      console.log(courses);
      this.courses = courses;
      this.allCourses = courses; 
    });
  }

  rechercherCours() {
    this.coursService.rechercherParTitre(this.title).subscribe(courses => {
      console.log(courses);
      this.courses = courses;
    });
  }

  onKeyUp(filterText: string) {
    this.courses = this.allCourses.filter(item =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }

}
