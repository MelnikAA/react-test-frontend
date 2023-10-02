import { Controller, useFormContext } from "react-hook-form";
import { FormValuesWithSkills } from "../formTypes";
import { useWindowSize } from "../windowSize";
import { Checkbox, Group } from "@mantine/core";

interface CheckboxInfoProps {
  groupName: "database" | "backendFrameworks" | "frontendFrameworks";
  groupLabel: string;
  checkboxData: { value: string; label: string; className: string }[];
}

export const CheckboxInfo: React.FC<CheckboxInfoProps> = ({
  groupName,
  groupLabel,

  checkboxData,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const windowSize = useWindowSize();
  const inputError =
    errors[groupName as keyof FormValuesWithSkills]?.message || "";

  return (
    <div>
      <Controller
        name={groupName}
        control={control}
        defaultValue={[]}
        rules={{
          required: "Выберите хотя бы один пункт",
        }}
        render={({ field }) => (
          <Checkbox.Group
            value={field.value}
            onChange={(value) => field.onChange(value)}
            label={groupLabel}
            error={inputError}
            size={windowSize < 768 ? "md" : undefined}
            className="l"
          >
            <Group mt="xs">
              {checkboxData.map((checkbox) => (
                <Checkbox
                  key={checkbox.value}
                  value={checkbox.value}
                  label={checkbox.label}
                  className={checkbox.className}
                />
              ))}
            </Group>
          </Checkbox.Group>
        )}
      />
    </div>
  );
};
