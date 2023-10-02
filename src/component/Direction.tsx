import React from "react";
import { observer } from "mobx-react";
import DirectionStore from "../DirectionStore";
import { Select } from "@mantine/core";
import { FormValuesWithSkills } from "../formTypes";
import { Controller, useFormContext } from "react-hook-form";
import { useWindowSize } from "../windowSize";

const Direction: React.FC = observer(() => {
  const windowSize = useWindowSize();
  const { control } = useFormContext<FormValuesWithSkills>();

  return (
    <div className="select">
      <Controller
        name="direction"
        control={control}
        defaultValue={DirectionStore.selectedDirection || undefined} //
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              if (value === "frontend" || value === "backend") {
                DirectionStore.setDirection(value);
              }
            }}
            label="Направление"
            placeholder="Направление работы"
            size={windowSize < 768 ? "md" : undefined}
            data={[
              { value: "frontend", label: "Фронтенд" },
              { value: "backend", label: "Бекенд" },
            ]}
          />
        )}
      />
    </div>
  );
});

export default Direction;
