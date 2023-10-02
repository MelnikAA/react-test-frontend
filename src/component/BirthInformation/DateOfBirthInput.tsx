import React from "react";
import { DateInput } from "@mantine/dates";
import { Controller, useFormContext } from "react-hook-form";
import { useWindowSize } from "../../windowSize";
import { FormValuesWithSkills } from "../../formTypes";

const DateOfBirthInput: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const windowSize = useWindowSize();

  return (
    <Controller
      name="dateOfBirth"
      control={control}
      defaultValue=""
      rules={{
        required: "Дата рождения обязательна для заполнения",
        validate: (value) => {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();

          if (age < 18) {
            return "Вы должны быть старше 18 лет";
          }
          return true;
        },
      }}
      render={({ field }) => (
        <DateInput
          value={field.value ? new Date(field.value) : null}
          onChange={(date) => {
            field.onChange(date);
          }}
          valueFormat="YYYY/MM/DD"
          maxDate={new Date()}
          placeholder="YYYY/MM/DD"
          mx="auto"
          className="date"
          error={errors.dateOfBirth ? errors.dateOfBirth.message : ""}
          size={windowSize < 768 ? "md" : undefined}
          label="Дата рождения"
        />
      )}
    />
  );
};

export default DateOfBirthInput;
