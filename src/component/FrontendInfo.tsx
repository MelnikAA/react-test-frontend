import React from 'react';
import { Checkbox, Group, TextInput } from '@mantine/core';
import { IFrontSkills } from '../formTypes';
import { observer } from 'mobx-react-lite';
import { FormValuesWithSkills } from '../formTypes';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useWindowSize } from '../windowSize';

interface FrontendProps {
    control: Control<FormValuesWithSkills >;
    errors: FieldErrors<IFrontSkills>; 
  }
  

const FrontendInfo: React.FC<FrontendProps> = ({ control, errors  }) => {
    const windowSize = useWindowSize();
    return (
        <div className='frontend-label'>
      <Controller
        name="frontendFrameworks" // Укажите путь к полю в данных формы
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
            className='l'
            error={errors.frontendFrameworks ? errors.frontendFrameworks.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
          >
            <Group mt="xs">
              <Checkbox value="react" label="React" className='check'/>
              <Checkbox value="svelte" label="Svelte" className='check'/>
              <Checkbox value="ng" label="Angular" className='check'/>
              <Checkbox value="vue" label="Vue" className='check'/>
            </Group>
          </Checkbox.Group>
        )}
      />

    <Controller
        name="favoriteMarkupFramework" // Укажите путь к полю в данных формы
        control={control}
        defaultValue=""
        rules={{
            required: 'Это поле обязательно',
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый фреймворк для верстки"
            placeholder='Next'
            error={errors.favoriteMarkupFramework ? errors.favoriteMarkupFramework.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            className='fav'
          />
        )}
      />

<Controller
        name="favoriteStateManager" // Укажите путь к полю в данных формы
        control={control}
        defaultValue=""
        rules={{
            required: 'Это поле обязательно',
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый state-менеджер"
            placeholder='MobX'
            error={errors.favoriteStateManager ? errors.favoriteStateManager.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            className='fav'
          />
        )}
      />

<Controller
        name="favoriteSSR" // Укажите путь к полю в данных формы
        control={control}
        defaultValue=""
        rules={{
            required: 'Это поле обязательно',
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый SSR-фрейворк"
            placeholder='Bootstrap'
            error={errors.favoriteSSR ? errors.favoriteSSR.message : ''}
            size={windowSize < 768 ? 'md' : undefined}
            className='fav'
          />
        )}
      />
      
        </div>
    );

};

export default FrontendInfo;