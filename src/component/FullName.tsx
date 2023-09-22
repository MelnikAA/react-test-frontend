import { TextInput } from '@mantine/core';
import React from 'react';
import { Controller, FieldErrors, useController } from 'react-hook-form';
import  { FormValuesWithSkills  }  from '../formTypes'; 
import { Control } from "react-hook-form";
import { useWindowSize } from '../windowSize';

  interface FullNameProps {
    control: Control<FormValuesWithSkills >;
    errors: FieldErrors<FormValuesWithSkills>; // Используйте Control с типом данных формы
  }
  
  const validateTextField = (value: string) => {
    if (!value) {
      return 'Это поле обязательно';
    }
    if (/\d/.test(value)) {
      return 'Не должно содержать цифры';
    }
    if (!/^[а-яА-Я]+$/.test(value)) {
      return 'Введите только русские буквы';
    }
    return true;
  };
  
  const FullName: React.FC<FullNameProps> = ({ control, errors }) => {
    const [surnameValue, setSurnameValue] = React.useState('');
    const [nameValue, setNameValue] = React.useState('');
    const [patronymicValue, setPatronymicValue] = React.useState('');
    const windowSize = useWindowSize();

    return (
      <div className="container-name">
        <Controller
          name="surname"
          control={control}
          defaultValue=""
          rules={{ validate: validateTextField }}
          render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Иванов"
                label="Фамилия"
                className="input-field"
                error={errors.surname ? errors.surname.message : ''}
                size={windowSize < 768 ? 'md' : undefined}
                onBlur={(e) => {
                  setSurnameValue(e.target.value);
                  // Здесь можно добавить дополнительную логику при потере фокуса
                }}
              />
          )}
        />
  
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ validate: validateTextField }}
          render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Иван"
                label="Имя"
                className="input-field"
                error={errors.name ? errors.name.message : ''}
                size={windowSize < 768 ? 'md' : undefined}
                onBlur={(e) => {
                  setNameValue(e.target.value);
                  // Здесь можно добавить дополнительную логику при потере фокуса
                }}
              />
          )}
        />
  
        <Controller
          name="patronymic"
          control={control}
          defaultValue=""
          rules={{ validate: validateTextField }}
          render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Иванович"
                label="Отчество"
                className="input-field"
                error={errors.patronymic ? errors.patronymic.message : ''}
                size={windowSize < 768 ? 'md' : undefined}
                onBlur={(e) => {
                  setPatronymicValue(e.target.value);
                }}
              />
          )}
        />
      </div>
    );
  };
  export default FullName;
  
  