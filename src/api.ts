// api.ts
import axios from 'axios';

export const sendFormData = async (formData: FormData) => {
  try {
    const response = await axios.post('http://localhost:5000/candidate', formData);
    return response.data.id;
  } catch (error) {
    console.error('Ошибка при отправке данных', error);
    alert('Ошибка при отправке данных');
    throw error;
  }
};