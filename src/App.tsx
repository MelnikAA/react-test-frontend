import React from 'react';
import emoji from "./img/emoji.png"
import { observer } from 'mobx-react';
import DirectionStore from './DirectionStore'; // Убедитесь, что путь правильный
import FrontendInfo from './component/FrontendInfo';
import BackendInfo from './component/BackendInfo';
import FullName from './component/fullName/FullName';
import BirthInformation from './component/birthInformation/BirthInformation';
import  Resume  from './component/Resume';
import Direction from './component/Direction';
import { Button } from '@mantine/core';
import './main.scss';
import { SubmitHandler } from 'react-hook-form';
import Comment from './component/Comment';
import { Title, Text, Card,} from '@mantine/core';
import { IconCandle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import  { FormValuesWithSkills  }  from './formTypes'; 
import { createFormData } from './formDataUtils';
import { sendFormData } from './api';




const App = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormValuesWithSkills>(); // Задайте тип данных формы
  const [opened, { open, close }] = useDisclosure(false);
  const [registrationId, setRegistrationId] = React.useState(null);
  const onSubmit: SubmitHandler<FormValuesWithSkills > = async (data) => {
    const formData = createFormData(data);
  
    try {
      const registrationId = await sendFormData(formData);
      setRegistrationId(registrationId);
      open();
      console.log('Данные успешно отправлены');
    } catch (error) {
      console.error('Ошибка при отправке данных', error);
    }
  };
  

  return (
    <div className="App">
      <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Title order={1} className='title'>Заполните поля перед отправкой резюме</Title>
    <Card className="card" shadow="md" radius="md"  padding="xl" >
   
    <div className="container-form">
      <FullName control={control} errors={errors}/>
      
            <BirthInformation control={control} errors={errors}/>
        </div>
        <Resume control={control} errors={errors} />
      <Comment control={control}/>
    </Card >

    <Card  shadow="md" radius="md"  padding="xl" style={{ overflow: 'visible' }} >
    <Direction control={control} />
    {DirectionStore.selectedDirection === 'frontend' && (
  <FrontendInfo control={control} errors={errors} />
)}
      {DirectionStore.selectedDirection === 'backend' && <BackendInfo control={control} errors={errors}/>}
      
      {DirectionStore.selectedDirection ? <div className='btn'><Button  type="submit" size="md" radius="xl"  variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Отправить</Button></div>: ''}
    </Card>
    </form>
    </div>
    <Modal opened={opened} onClose={close} className='modal' centered>
    <Title order={2} ta="center">ID  вашей регистрации <Text span c="blue" inherit>{registrationId}</Text></Title>
      <img style={{width: '200px'}} src={emoji} className='emoji'/>
    </Modal>
    
    </div>
    
    
  );
}
export default observer(App);