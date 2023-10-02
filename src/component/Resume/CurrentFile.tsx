import { Text } from "@mantine/core";
import pdf from "../../img/pdf-svgrepo-com.svg";

interface CurrentFileProps {
  field: {
    value: File | null;
  };
}

export const CurrentFile: React.FC<CurrentFileProps> = ({ field }) => {
  return (
    <div style={{ pointerEvents: "none" }}>
      <img src={pdf} className="pdf-img" alt="PDF" />
      <Text ta="center" fw={700} fz="lg" mt="xl" className="file-name">
        {field.value?.name}
      </Text>
    </div>
  );
};
