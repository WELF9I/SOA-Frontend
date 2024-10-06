import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Matiere } from '../model/matiere.model';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styles: [
  ]
})
export class UpdateMatiereComponent implements OnInit {

  @Input()
  matiere!: Matiere;

  @Input()
  ajout!: boolean;

  @Output() 
  matiereUpdated = new EventEmitter<Matiere>();

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateMatiere", this.matiere);
  }

  saveMatiere() {
    this.matiereUpdated.emit(this.matiere);
  }

}
