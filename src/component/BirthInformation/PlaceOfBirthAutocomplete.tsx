import React, { useState } from "react";
import { Autocomplete } from "@mantine/core";
import axios from "axios";
import { Controller, useFormContext } from "react-hook-form";
import { useWindowSize } from "../../windowSize";
import { FormValuesWithSkills } from "../../formTypes";

const PlaceOfBirthAutocomplete: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const windowSize = useWindowSize();

  const handleInputChange = async (inputValue: string) => {
    setValue(inputValue);

    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "576755a3cf2041246aa8f6842f555b311c2e44df";

    try {
      const response = await axios.post(
        url,
        { query: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      setSuggestions(
        response.data.suggestions.map(
          (suggestion: { value: any }) => suggestion.value
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Controller
      name="placeOfBirth"
      control={control}
      defaultValue=""
      rules={{
        required: "Место рождения обязательно для заполнения",
      }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          placeholder="г Москва"
          value={field.value}
          data={suggestions}
          onChange={(newValue) => {
            field.onChange(newValue);
            handleInputChange(newValue);
          }}
          className="place"
          error={errors.placeOfBirth ? errors.placeOfBirth.message : ""}
          size={windowSize < 768 ? "md" : undefined}
          label="Место рождения"
        />
      )}
    />
  );
};

export default PlaceOfBirthAutocomplete;
