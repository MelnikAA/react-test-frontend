import React from 'react';
import { DateInput } from '@mantine/dates';
import { Autocomplete } from '@mantine/core';
import axios from 'axios';

import { FormValuesWithSkills  } from '../../formTypes';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useWindowSize } from '../../windowSize';

interface BirthProps {
    control: Control<FormValuesWithSkills >;
    errors: FieldErrors<FormValuesWithSkills>; // Используйте Control с типом данных формы
  }
 
const BirthInformation: React.FC<BirthProps> = ({ control, errors }) => {
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const handleInputChange = async (inputValue: string) => {
    setValue(inputValue);

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "576755a3cf2041246aa8f6842f555b311c2e44df";
    console.log(inputValue)
    try {
      const response = await axios.post(url, { query: inputValue }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${token}`
        }
      });
      
      setSuggestions(response.data.suggestions.map((suggestion: { value: any; }) => suggestion.value));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const windowSize = useWindowSize();
  

    return (
        <div className='birth-container'>
 <Controller
      name="dateOfBirth"
      control={control}
      defaultValue=""
      rules={{
        required: 'Дата рождения обязательна для заполнения',
        validate: (value) => {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();

          if (age < 18) {
            return 'Вы должны быть старше 18 лет';
          }
          return true;
        },
      }}
      render={({ field }) => (
          <DateInput
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date);
            }}
            valueFormat="YYYY/MM/DD"
            maxDate={new Date()}
            placeholder="YYYY/MM/DD"
            mx="auto"
            className="date"
            error={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            label="Дата рождения"
            
          />
      )}
    />

<Controller
      name="placeOfBirth"
      control={control}
      defaultValue=""
      rules={{
        required: 'Место рождения обязательно для заполнения',
      }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          placeholder="г Москва"
          value={field.value}
          data={suggestions} 
          onChange={(newValue) => {
            field.onChange(newValue); 
            handleInputChange(newValue); 
          }}
          className='place'
          error={errors.placeOfBirth ? errors.placeOfBirth.message : ''}
          size={windowSize < 768 ? 'md' : undefined}
          label="Место рождения"
        />
      )}
    />


      </div>

      
    );
};

export default BirthInformation;