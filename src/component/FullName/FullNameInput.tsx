import { TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import { validateTextField } from "./validate";
import { FormValuesWithSkills } from "../../formTypes";
import { useWindowSize } from "../../windowSize";

interface FullNameProps {
  inputName: "surname" | "name" | "patronymic";
  label: "Фамилия" | "Имя" | "Отчество";
  placeholder: "Иванов" | "Иван" | "Иванович";
}

const FullNameInput: React.FC<FullNameProps> = ({
  inputName,
  label,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const windowSize = useWindowSize();
  const inputError = errors[inputName]?.message || "";
  return (
    <div>
      <Controller
        name={inputName}
        control={control}
        defaultValue=""
        rules={{ validate: validateTextField }}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder={placeholder}
            label={label}
            className="input-field"
            error={inputError}
            size={windowSize < 768 ? "md" : undefined}
          />
        )}
      />
    </div>
  );
};

export default FullNameInput;
