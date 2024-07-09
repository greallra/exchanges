import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import useLanguages from '../hooks/useLanguages';
import classes from '../LanguagePicker.module.css';


interface myProps {
  selected: {
    image: string,
    label: string
  },
  setSelected: Function
}


export function LanguagePicker(props: myProps):React.FC {
  const [opened, setOpened] = useState(false);
  const { languages } = useLanguages();

  const items = languages.map((language) => (
    <Menu.Item
      leftSection={<Image src={language.smallFlag} width={18} height={18} />}
      onClick={() => props.setSelected(language)}
      key={language.label}
      disabled={language.disabled}
    >
      {language.label}
    </Menu.Item>
  ));

  // const selectedLanguage =props.selected = props.selected || languages[0]

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}

      width="max-content"
      withinPortal
    >
      {props.selected && <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={props.selected.smallFlag} width={22} height={22} />
            <span className={classes.label}>{props.selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>}
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}