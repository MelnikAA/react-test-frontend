export const validateTextField = (value: string) => {
  if (!value) {
    return "Это поле обязательно";
  }
  if (/\d/.test(value)) {
    return "Не должно содержать цифры";
  }
  if (!/^[а-яА-Я]+$/.test(value)) {
    return "Введите только русские буквы";
  }
  return true;
};
