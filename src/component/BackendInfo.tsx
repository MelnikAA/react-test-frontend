import React from "react";
import { Checkbox, Group } from "@mantine/core";
import { IBackSkills } from "../formTypes";
import { Controller, useFormContext } from "react-hook-form";
import { useWindowSize } from "../windowSize";
import { CheckboxInfo } from "./CheckboxInfo";

const BackendInfo: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IBackSkills>();

  const windowSize = useWindowSize();
  return (
    <div className="backend-info">
      <CheckboxInfo
        groupName="backendFrameworks"
        groupLabel="Опыт работы с фреймворками"
        checkboxData={[
          { value: "express", label: "Express", className: "check" },
          { value: "springboot", label: "Spring Boot", className: "check" },
          { value: "nest", label: "Nest", className: "check" },
          // Добавьте другие чекбоксы по вашему выбору
        ]}
      />

      <CheckboxInfo
        groupName="database"
        groupLabel="Выберите базы данных"
        checkboxData={[
          { value: "postgresql", label: "PostgreSQL", className: "check" },
          { value: "sqlite", label: "SQLite", className: "check" },
          { value: "mongodb", label: "MongoDB", className: "check" },
          // Добавьте другие чекбоксы по вашему выбору
        ]}
      />
    </div>
  );
};

export default BackendInfo;
