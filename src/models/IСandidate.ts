import { IBackSkills } from "./IBackSkills";
import { IFrontSkills } from "./IFrontSkills";

export interface IСandidate<T extends 'frontend' | 'backend'> {
    surname: string;
    name: string;
    patronymic: string;
    dateOfBirth: string;
    placeOfBirth: string;
    resume: File;
    comment:string;
    direction: T;
    frontendSkills: T extends 'frontend' ? IFrontSkills : undefined;
    backendSkills: T extends 'backend' ? IBackSkills : undefined;
}

