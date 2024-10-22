import { Injectable } from '@angular/core';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  
  apiURLCours: string = apiURL + '/cours';
  apiURLMatiere: string = apiURL + '/matieres';

  constructor(private http: HttpClient) { }

  // Cours related methods
  listeCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiURLCours);
  }

  ajouterCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiURLCours, cours);
  }

  supprimerCours(id: number) {
    const url = `${this.apiURLCours}/${id}`;
    return this.http.delete(url);
  }

  consulterCours(id: number): Observable<Cours> {
    const url = `${this.apiURLCours}/${id}`;
    return this.http.get<Cours>(url);
  }

  updateCours(cours: Cours): Observable<Cours> {
    const url = `${this.apiURLCours}/${cours.id}`;
    return this.http.put<Cours>(url, cours);
  }

  rechercherParMatiere(idMatiere: number): Observable<Cours[]> {
    const url = `${this.apiURLCours}/matiere/${idMatiere}`;
    return this.http.get<Cours[]>(url);
  }

  // Matiere related methods
  listeMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiURLMatiere);
  }

  ajouterMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiURLMatiere, matiere);
  }

  getMatiereById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.apiURLMatiere}/${id}`);
  }

  updateMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiURLMatiere}/${matiere.id}`, matiere);
  }

  supprimerMatiere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLMatiere}/${id}`);
  }

  findMatieresByName(name: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/search/name?name=${name}`);
  }

  findMatieresByNameContains(name: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/search/nameContains?name=${name}`);
  }

  sortMatieresByName(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/sort`);
  }
}