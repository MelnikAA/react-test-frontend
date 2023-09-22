// formDataUtils.ts

import { FormValuesWithSkills } from "./formTypes";

export function createFormData(data: FormValuesWithSkills): FormData {
    const formData = new FormData();
  
    formData.append('surname', data.surname);
    formData.append('name', data.name);
    formData.append('patronymic', data.patronymic);
    formData.append('dateOfBirth', data.dateOfBirth);
    formData.append('placeOfBirth', data.placeOfBirth);
    formData.append('comment', data.comment);
    formData.append('direction', data.direction);
  
    formData.append('resume', data.resume);
  
    if (data.direction === 'frontend') {
      formData.append('favoriteMarkupFramework', data.favoriteMarkupFramework);
      // Проверка и преобразование в массив
      const frontendFrameworks = Array.isArray(data.frontendFrameworks)
        ? data.frontendFrameworks
        : [data.frontendFrameworks];
      frontendFrameworks.forEach((item) => {
        formData.append('frontendFrameworks', item);
      });
      formData.append('favoriteSSR', data.favoriteSSR);
      formData.append('favoriteStateManager', data.favoriteStateManager);
    } else if (data.direction === 'backend') {
      // Проверка и преобразование в массив
      const backendFrameworks = Array.isArray(data.backendFrameworks)
        ? data.backendFrameworks
        : [data.backendFrameworks];
      backendFrameworks.forEach((item) => {
        formData.append('backendFrameworks', item);
      });
  
      // Проверка и преобразование в массив
      if (!Array.isArray(data.database)) {
        data.database = [data.database]; // Преобразовываем в массив
      }
  
      data.database.forEach((item) => {
        formData.append('backendDB', item);
      });
    }
  
    return formData;
  }
  