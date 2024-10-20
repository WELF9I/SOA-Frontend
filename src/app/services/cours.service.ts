import { Injectable } from '@angular/core';
import { Matiere } from '../model/matiere.model';
import { Cours } from '../model/cours.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const apiURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  
  apiURLCours: string = apiURL + '/cours';
  apiURLMatiere: string = apiURL + '/matieres';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    return new HttpHeaders({"Authorization": jwt});
  }

  // Cours related methods
  listeCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiURLCours, {headers: this.getHeaders()});
  }

  ajouterCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiURLCours, cours, {headers: this.getHeaders()});
  }

  supprimerCours(id: number) {
    const url = `${this.apiURLCours}/${id}`;
    return this.http.delete(url, {headers: this.getHeaders()});
  }

  consulterCours(id: number): Observable<Cours> {
    const url = `${this.apiURLCours}/${id}`;
    return this.http.get<Cours>(url, {headers: this.getHeaders()});
  }

  updateCours(cours: Cours): Observable<Cours> {
    const url = `${this.apiURLCours}/${cours.id}`;
    return this.http.put<Cours>(url, cours, {headers: this.getHeaders()});
  }

  rechercherParMatiere(idMatiere: number): Observable<Cours[]> {
    const url = `${this.apiURLCours}/matiere/${idMatiere}`;
    return this.http.get<Cours[]>(url, {headers: this.getHeaders()});
  }

  // Matiere related methods
  listeMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiURLMatiere, {headers: this.getHeaders()});
  }

  ajouterMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiURLMatiere, matiere, {headers: this.getHeaders()});
  }

  getMatiereById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.apiURLMatiere}/${id}`, {headers: this.getHeaders()});
  }

  updateMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiURLMatiere}/${matiere.id}`, matiere, {headers: this.getHeaders()});
  }

  supprimerMatiere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLMatiere}/${id}`, {headers: this.getHeaders()});
  }

  findMatieresByName(name: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/search/name?name=${name}`, {headers: this.getHeaders()});
  }

  findMatieresByNameContains(name: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/search/nameContains?name=${name}`, {headers: this.getHeaders()});
  }

  sortMatieresByName(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiURLMatiere}/sort`, {headers: this.getHeaders()});
  }
}