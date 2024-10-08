import { Injectable } from '@angular/core';
import { Cours } from '../model/cours.model';
import { Matiere } from '../model/matiere.model'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  apiURL: string = 'http://localhost:8080/api/cours';
  apiURLMatiere: string = 'http://localhost:8080/api/matieres';

  constructor(private http: HttpClient) {}

  listeCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiURL);
  }

  ajouterCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiURL, cours, httpOptions);
  }

  supprimerCours(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterCours(id: number): Observable<Cours> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Cours>(url);
  }

  updateCours(cours: Cours): Observable<Cours> {
    const url = `${this.apiURL}/${cours.id}`;
    return this.http.put<Cours>(url, cours, httpOptions);
  }

  listeMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiURLMatiere);
  }

  rechercherParMatiere(idMatiere: number): Observable<Cours[]> {
    const url = `${this.apiURL}/matiere/${idMatiere}`;
    return this.http.get<Cours[]>(url);
  }

  // Note: These methods are not present in your current backend controllers
  // You may need to add them to your backend or remove them from here
  rechercherParTitre(titre: string): Observable<Cours[]> {
    // This endpoint doesn't exist in your current backendid
    const url = `${this.apiURL}/coursByTitre/${titre}`;
    return this.http.get<Cours[]>(url);
  }

  ajouterMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiURLMatiere, matiere, httpOptions);
  }

  // Additional methods based on your MatiereRESTController
  getMatiereById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.apiURLMatiere}/${id}`);
  }

  updateMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiURLMatiere}/${matiere.id}`, matiere, httpOptions);
  }

  deleteMatiereById(id: number): Observable<void> {
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