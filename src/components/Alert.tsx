import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface alertProps {
    show: boolean,
    text: string
}

export default function MyAlert(props: alertProps) {
  const icon = <IconInfoCircle />;
  return (
    props.show && <Alert variant="light" color="red" title="Your information has errrors" icon={icon}>
      {props.text}
    </Alert>
  );
}