import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import images from '../assets/images';
import classes from '../LanguagePicker.module.css';


interface myProps {
  languages: Array,
  selected: {
    image: string,
    label: string
  },
  languageOne: boolean,
  setSelected: Function
}


export function LanguagePicker(props: myProps):React.FC {
  const [opened, setOpened] = useState(false);
  console.log('LanguagePicker', props);
  
  const items = props.languages.map((language) => (
    <Menu.Item
      leftSection={<Image src={language.image} width={18} height={18} />}
      onClick={() => props.setSelected(props.languageOne, language)}
      key={language.label}
      disabled={language.disabled}
    >
      {language.label}
    </Menu.Item>
  ));


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
            <Image src={props.selected.image} width={22} height={22} />
            <span className={classes.label}>{props.selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>}
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}