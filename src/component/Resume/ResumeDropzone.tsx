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
import { CurrentFile } from "./CurrentFile";

interface ResumeDropzoneProps {
  field: {
    value: File | null;
    onChange: (file: File | null) => void;
  };
  errors: {
    resume?: string;
  };
  openRef: React.RefObject<() => void>;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  field,
  errors,
  openRef,
}) => {
  return (
    <Dropzone
      openRef={openRef}
      onDrop={(files) => {
        if (files.length > 0) {
          const file = files[0];
          field.onChange(file);
        }
      }}
      className="dropzone"
      radius="md"
      accept={[MIME_TYPES.pdf]}
      maxSize={1 * 1024 ** 2}
    >
      {field.value ? (
        <CurrentFile field={field} />
      ) : (
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={rem(50)} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={rem(50)} color="red" stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                className="cloud-img"
                size={rem(50)}
                color="black"
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Перетащите сюда файл</Dropzone.Accept>
            <Dropzone.Reject>Pdf файл менее 1МБ</Dropzone.Reject>

            <Dropzone.Idle>
              {errors.resume ? (
                <p style={{ color: "red" }}>Загрузите резюме</p>
              ) : (
                <p>Загрузите резюме</p>
              )}
            </Dropzone.Idle>
          </Text>
          <Text className="upload-text" ta="center" fz="sm" mt="xs" c="dimmed">
            Перетащите сюда файл для загрузки. Подходят только <i>.pdf</i>{" "}
            формата размером менее 1МБ.
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Подходят файлы только <i>.pdf</i> формата размером менее 1МБ.
          </Text>
        </div>
      )}
    </Dropzone>
  );
};
