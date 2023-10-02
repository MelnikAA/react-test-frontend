import { TextInput } from "@mantine/core";
import React from "react";
import {
  Controller,
  FieldErrors,
  useController,
  useFormContext,
} from "react-hook-form";
import { FormValuesWithSkills } from "../../formTypes";
import { useWindowSize } from "../../windowSize";
import FullNameInput from "./FullNameInput";

const FullName: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const [surnameValue, setSurnameValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");
  const [patronymicValue, setPatronymicValue] = React.useState("");

  return (
    <div className="container-name">
      <FullNameInput inputName="surname" label="Фамилия" placeholder="Иванов" />
      <FullNameInput inputName="name" label="Имя" placeholder="Иван" />
      <FullNameInput
        inputName="patronymic"
        label="Отчество"
        placeholder="Иванович"
      />
    </div>
  );
};
export default FullName;
