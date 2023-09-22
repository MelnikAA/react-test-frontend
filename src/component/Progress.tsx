import React from 'react';
import { Stepper } from '@mantine/core';

const Progress = () => {
    const [active, setActive] = React.useState(1)
    return (
        <div>
            <Stepper active={active} onStepClick={setActive} orientation="vertical">
      <Stepper.Step label="Step 1" description="Заполните личные данные" />
      <Stepper.Step label="Step 2" description="Прикрепите резюме" />
      <Stepper.Step label="Step 3" description="Расскажите о своем стеке" />
    </Stepper>
        </div>
    );
};

export default Progress;