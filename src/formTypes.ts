
export interface FormValues {
    surname: string;
    name: string;
    patronymic: string;
    dateOfBirth: string;
    placeOfBirth: string;
    resume: File;
    comment:string;
    direction: 'frontend' | 'backend' | '';
    
    
  }
  

  export type FormValuesWithSkills =
  | (FormValues & { direction: 'frontend' } & IFrontSkills)
  | (FormValues & { direction: 'backend' } & IBackSkills);


  export interface IBackSkills {
    backendFrameworks: string[];
    database: string[];
}

export interface IFrontSkills {
  frontendFrameworks: string[];
  favoriteMarkupFramework: string;
  favoriteSSR: string;
  favoriteStateManager: string;
}