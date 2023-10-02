import React from "react";
import DateOfBirthInput from "./DateOfBirthInput";
import PlaceOfBirthAutocomplete from "./PlaceOfBirthAutocomplete";

const BirthInformation: React.FC = () => {
  return (
    <div className="birth-container">
      <DateOfBirthInput />
      <PlaceOfBirthAutocomplete />
    </div>
  );
};

export default BirthInformation;
