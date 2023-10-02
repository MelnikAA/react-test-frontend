import React from "react";
import emoji from "./img/emoji.png";
import { observer } from "mobx-react";
import DirectionStore from "./DirectionStore"; // Убедитесь, что путь правильный
import FrontendInfo from "./component/FrontendInfo";
import BackendInfo from "./component/BackendInfo";
import FullName from "./component/FullName/FullName";
import BirthInformation from "./component/BirthInformation/BirthInformation";
import Resume from "./component/Resume/Resume";
import Direction from "./component/Direction";
import { Button } from "@mantine/core";
import "./main.scss";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
  useFieldArray,
  FieldValues,
} from "react-hook-form";
import Comment from "./component/Comment";
import { Title, Text, Card } from "@mantine/core";
import { IconCandle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { FormValuesWithSkills } from "./formTypes";
import { createFormData } from "./formDataUtils";
import { sendFormData } from "./api";
import { useWindowSize } from "./windowSize";

const App = () => {
  const methods = useForm<FormValuesWithSkills>(); // useForm внутри FormProvider
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;
  const [opened, { open, close }] = useDisclosure(false);
  const windowSize = useWindowSize();
  const [registrationId, setRegistrationId] = React.useState(null);

  const onSubmit: SubmitHandler<FormValuesWithSkills> = async (data) => {
    console.log(data);
    const formData = createFormData(data);

    try {
      const registrationId = await sendFormData(formData);
      setRegistrationId(registrationId);
      open();
      console.log("Данные успешно отправлены");
      reset();
    } catch (error) {
      console.error("Ошибка при отправке данных", error);
    }
  };

  return (
    <div className="App">
      <FormProvider {...methods}>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Title order={1} className="title">
              Заполните поля перед отправкой резюме
            </Title>
            <Card className="card" shadow="md" radius="md" padding="xl">
              <div className="container-form">
                <FullName />

                <BirthInformation />
              </div>
              <Resume />
              <Comment />
            </Card>

            <Card
              shadow="md"
              radius="md"
              padding="xl"
              style={{ overflow: "visible" }}
            >
              <Direction />
              {DirectionStore.selectedDirection === "frontend" && (
                <FrontendInfo />
              )}
              {DirectionStore.selectedDirection === "backend" && (
                <BackendInfo />
              )}

              {DirectionStore.selectedDirection ? (
                <div className="btn">
                  <Button
                    type="submit"
                    size={windowSize < 560 ? "lg" : "md"}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan" }}
                  >
                    Отправить
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Card>
          </form>
        </div>
        <Modal opened={opened} onClose={close} className="modal" centered>
          <Title order={2} ta="center">
            ID вашей регистрации{" "}
            <Text span c="blue" inherit>
              {registrationId}
            </Text>
          </Title>
          <img style={{ width: "200px" }} src={emoji} className="emoji" />
        </Modal>
      </FormProvider>
    </div>
  );
};
export default observer(App);
