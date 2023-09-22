import React from 'react';
import { Checkbox, Group } from '@mantine/core';
import { IBackSkills } from '../formTypes';
import { observer } from 'mobx-react-lite';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValuesWithSkills } from '../formTypes';
import { useWindowSize } from '../windowSize';

interface BackendProps {
    control: Control<FormValuesWithSkills >; 
    errors: FieldErrors<IBackSkills>;// Используйте Control с типом данных формы
  }

const BackendInfo: React.FC<BackendProps> = ({ control, errors }) => {
    const windowSize = useWindowSize();
    return (
        <div className='backend-info'>
    <Controller
        name="backendFrameworks" // Укажите путь к полю в данных формы
        control={control}
        defaultValue={[]} 
        rules={{
            required: 'Выберите хотя бы один пункт',
        }}
        render={({ field }) => (
          <Checkbox.Group
            value={field.value}
            onChange={(value) => field.onChange(value)}
            label="Опыт работы с фреймворками"
            error={errors.backendFrameworks ? errors.backendFrameworks.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            className='l'
          >
            <Group mt="xs">
              <Checkbox value="express" label="Express" className='check'/>
              <Checkbox value="springboot" label="Spring Boot" className='check'/>
              <Checkbox value="nest" label="Nest" className='check'/>
             
            </Group>
          </Checkbox.Group>
        )}
      />

<Controller
        name="database" // Укажите путь к полю в данных формы
        control={control}
        defaultValue={[]}
        rules={{
            required: 'Выберите хотя бы один пункт',
        }} 
        render={({ field }) => (
          <Checkbox.Group
            value={field.value}
            onChange={(value) => field.onChange(value)}
            label="Опыт работы с базами данных"
            error={errors.database ? errors.database.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            className='l'
          >
            <Group mt="xs">
              <Checkbox value="postgresql" label="PostgreSQL" className='check'/>
              <Checkbox value="sqlite" label="SQLite" className='check'/>
              <Checkbox value="mongodb" label="MongoDB" className='check'/>
             
            </Group>
          </Checkbox.Group>
        )}
      />
        </div>
    );
};

export default BackendInfo;