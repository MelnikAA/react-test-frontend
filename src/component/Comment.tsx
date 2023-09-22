import { Textarea } from '@mantine/core';
import React from 'react';
import { FormValuesWithSkills  } from '../formTypes';
import { Control, Controller } from 'react-hook-form';
import { useWindowSize } from '../windowSize';

interface CommentProps {
    control: Control<FormValuesWithSkills >; 
  }

  const Comment: React.FC<CommentProps> = ({ control }) => {
    const windowSize = useWindowSize();
    return (
        <div>
            <Controller
                name="comment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Textarea
                    {...field}
                        placeholder="Пара слов о себе, ссылки на портфолио, github"
                        className='comment'
                        size={windowSize < 768 ? 'md' : undefined}
                        label={
                            <span>
                            Сопроводительное письмо <span style={{ color: 'gray' }}>(необязательно)</span>
                            </span>
                        }
                    />
                )}
            />    
        </div>
    );
};

export default Comment;