import { useRef } from 'react';
import React from 'react';
import { Text, Group, Button, createStyles, rem } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { useForm, Controller, SubmitHandler, Control, FieldErrors } from "react-hook-form";
import { FormValuesWithSkills  } from '../formTypes';
import pdf from "../img/pdf-svgrepo-com.svg"


interface ResumeProps {
  control: Control<FormValuesWithSkills >;
  errors: FieldErrors<FormValuesWithSkills>;
}


const Resume: React.FC<ResumeProps> = ({ control, errors }) => {
  
  const openRef = useRef<() => void>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  // Промежуточный обработчик события onDrop
  const handleDropWrapper = (files: FileWithPath[]) => {
    const acceptedFiles = files.filter((fileWithPath) => fileWithPath instanceof File);
    const rejectedFiles = files.filter((fileWithPath) => !(fileWithPath instanceof File));
    
    // Вызываем ваш обработчик handleDrop
    handleDrop(acceptedFiles as File[], rejectedFiles as File[]);
  };

  // Обработчик события загрузки файла
  const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    // Обрабатываем загруженные файлы
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Берем первый загруженный файл (вы можете изменить логику, если нужно обрабатывать несколько файлов)
      setUploadedFile(file);

      // Далее, вы можете выполнить другие действия с загруженным файлом, например, отправить его на сервер
      // или выполнить другую логику, которая вам нужна
    } else if (rejectedFiles.length > 0) {
      // Если есть отклоненные файлы, вы можете предоставить пользователю сообщение об ошибке
      console.error('Rejected files:', rejectedFiles);
    }
  };

  return (
    <div className="wrapper">
   <Controller
  name="resume"
  control={control}
  rules={{
    required: 'Прикрепите резюме',
}}
  render={({ field }) => {
    console.log(field); 
    return (
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          // Обрабатываем загруженные файлы
          if (files.length > 0) {
            const file = files[0];
            field.onChange(file); // Устанавливаем файл в значение поля
          }
        }}
        className="dropzone"
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={1 * 1024 ** 2}
      >
       {field.value  ? ( // Если загружен файл, отображаем его имя и кнопку удаления
          <div style={{ pointerEvents: 'none' }}>
            <img  src={pdf}  className='pdf-img'/>
            <Text ta="center" fw={700} fz="lg" mt="xl" className='file-name'>
            {field.value.name}
            </Text>
          </div>
        ) : (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={rem(50)}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={rem(50)} color="red" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                className='cloud-img'
                  size={rem(50)}
                  color="black"
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>
  
            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Перетащите сюда файл</Dropzone.Accept>
              <Dropzone.Reject>Pdf файл менее 1МБ</Dropzone.Reject>
              
              <Dropzone.Idle>
              {errors.resume ? (
              <p style={{ color: 'red' }}>Загрузите резюме</p>
              ) : (
              <p>Загрузите резюме</p>
              )}
              </Dropzone.Idle>
            </Text>
            <Text className="upload-text" ta="center" fz="sm" mt="xs" c="dimmed">
             Перетащите сюда файл для загрузки. Подходят только <i>.pdf</i> формата размером менее 1МБ.
            </Text>
            <Text  ta="center" fz="sm" mt="xs" c="dimmed">
             Подходят файлы только <i>.pdf</i> формата размером менее 1МБ.
            </Text>
          </div>
        )}
      
      </Dropzone>
    );
  }}
/>
      <Button className='control'variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="md" radius="xl" onClick={() => openRef.current?.()}>
          Выбрать файл
      </Button>
      
     
    </div>
  );
}
export default Resume;