import { useRef } from "react";
import React from "react";
import { Text, Group, Button, createStyles, rem } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import {
  useForm,
  Controller,
  SubmitHandler,
  Control,
  FieldErrors,
  useFormContext,
} from "react-hook-form";
import { FormValuesWithSkills } from "../../formTypes";
import pdf from "../img/pdf-svgrepo-com.svg";
import { ResumeDropzone } from "./ResumeDropzone";

const Resume: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValuesWithSkills>();
  const openRef = useRef<() => void>(null);

  return (
    <div className="wrapper">
      <Controller
        name="resume"
        control={control}
        rules={{
          required: "Прикрепите резюме",
        }}
        render={({ field }) => (
          <ResumeDropzone
            field={field}
            errors={errors.resume ? { resume: errors.resume.message } : {}}
            openRef={openRef}
          />
        )}
      />
      <Button
        className="control"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Выбрать файл
      </Button>
    </div>
  );
};

export default Resume;
