import React from "react";
import { Checkbox, Group, TextInput } from "@mantine/core";
import { IFrontSkills } from "../formTypes";

import { Controller, useFormContext } from "react-hook-form";
import { useWindowSize } from "../windowSize";
import { CheckboxInfo } from "./CheckboxInfo";

const FrontendInfo: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFrontSkills>();

  const windowSize = useWindowSize();
  return (
    <div className="frontend-label">
      <CheckboxInfo
        groupName="frontendFrameworks"
        groupLabel="Опыт работы с фреймворками"
        checkboxData={[
          { value: "react", label: "React", className: "check" },
          { value: "svelte", label: "Svelte", className: "check" },
          { value: "ng", label: "Angular", className: "check" },
          { value: "vue", label: "Vue", className: "check" },
          // Добавьте другие чекбоксы по вашему выбору
        ]}
      />

      <Controller
        name="favoriteMarkupFramework"
        control={control}
        defaultValue=""
        rules={{
          required: "Это поле обязательно",
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый фреймворк для верстки"
            placeholder="Next"
            error={
              errors.favoriteMarkupFramework
                ? errors.favoriteMarkupFramework.message
                : ""
            }
            size={windowSize < 768 ? "md" : undefined}
            className="fav"
          />
        )}
      />

      <Controller
        name="favoriteStateManager"
        control={control}
        defaultValue=""
        rules={{
          required: "Это поле обязательно",
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый state-менеджер"
            placeholder="MobX"
            error={
              errors.favoriteStateManager
                ? errors.favoriteStateManager.message
                : ""
            }
            size={windowSize < 768 ? "md" : undefined}
            className="fav"
          />
        )}
      />

      <Controller
        name="favoriteSSR"
        control={control}
        defaultValue=""
        rules={{
          required: "Это поле обязательно",
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChange={field.onChange}
            label="Любимый SSR-фрейворк"
            placeholder="Bootstrap"
            error={errors.favoriteSSR ? errors.favoriteSSR.message : ""}
            size={windowSize < 768 ? "md" : undefined}
            className="fav"
          />
        )}
      />
    </div>
  );
};

export default FrontendInfo;
