import { Matiere } from "./matiere.model";

export class Cours {
    id!: number;
    title!: string;
    content!: string;
    duration!: number;
    createdDate!: Date;
    videoUrl!: string;
    matiere!: Matiere; 
}
