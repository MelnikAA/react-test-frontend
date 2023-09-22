import React from 'react';
import { observer } from 'mobx-react';
import DirectionStore from '../DirectionStore';
import { Select } from '@mantine/core';
import { FormValuesWithSkills  } from '../formTypes';
import { Control, Controller } from 'react-hook-form';
import { useWindowSize } from '../windowSize';

interface DirectionProps {
  control: Control<FormValuesWithSkills>; // Используйте Control с типом данных формы
}


const Direction: React.FC<DirectionProps> = observer(({control}) => {
  const windowSize = useWindowSize();


  return (
    <div className='select'>
       <Controller
        name="direction" // Укажите имя поля формы, к которому привязываетесь
        control={control} // Передайте объект управления формой
        defaultValue={DirectionStore.selectedDirection || undefined} //
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              if (value === "frontend" || value === "backend") {
                DirectionStore.setDirection(value);
              }
            }}
            label="Направление"
            placeholder="Направление работы"
            size={windowSize < 768 ? 'md' : undefined}
            data={[
          { value: 'frontend', label: 'Фронтенд' },
          { value: 'backend', label: 'Бекенд' },
        ]}
      />
        )}
        />
    </div>
  );
});

export default Direction;