import { Popover, Autocomplete, Button, Text, AutocompleteProps, Avatar, Group, rem } from '@mantine/core';
import useFetch from '@/hooks/useFetch';
import { IconUsersPlus } from '@tabler/icons-react';
import { useState } from 'react';

const usersData: Record<string, { image: string; email: string }> = {
  'Emily Johnson': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    email: 'emily92@gmail.com',
  },
  'Ava Rodriguez': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    email: 'ava_rose@gmail.com',
  },
  'Olivia Chen': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    email: 'livvy_globe@gmail.com',
  },
  'Ethan Barnes': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    email: 'ethan_explorer@gmail.com',
  },
  'Mason Taylor': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    email: 'mason_musician@gmail.com',
  },
};



export default function AddFriendsPopover({ handleAddParticipant, exchange }) {
  const [selected, setSelected] = useState(undefined)
  const { data: fetchedUsers } = useFetch('users');
  let formattedFetchedUsers = {};
  for (let i = 0; i < fetchedUsers.length; i++) {
    const user = fetchedUsers[i];
    formattedFetchedUsers[user.username] = {
      image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
      email: user.email,
      username: user.firstname + ' ' + user.lastname,

    }
  }
  console.log('formattedFetchedUsers', formattedFetchedUsers);
  console.log('usersData', usersData);

  function handleChange(value: string) {
    console.log('value', value);
    const userObject = fetchedUsers.find( user => user.username === value)
    setSelected(userObject)
  }
  const notFoundImage = 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png'

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => (
    <Group gap="sm">
      <Avatar src={formattedFetchedUsers[option.value] ? formattedFetchedUsers[option.value].image : notFoundImage} size={36} radius="xl" />
      <div>
        <Text size="sm">{option.value}</Text>
        <Text size="xs" opacity={0.5}>
          {formattedFetchedUsers[option.value] ? formattedFetchedUsers[option.value].username : 'no username found'}
        </Text>
        <Text size="xs" opacity={0.5}>
          {formattedFetchedUsers[option.value] ? formattedFetchedUsers[option.value].email : 'no email found'}
        </Text>
      </div>
    </Group>
  );

  function checkForlanguageMatch(user) {
    let exchangeLanguagesIds = [exchange.learningLanguageId, exchange.teachingLanguageId];
    return exchangeLanguagesIds.includes(user.learningLanguageId) && exchangeLanguagesIds.includes(user.teachingLanguageId)
  }

  function getData() {
    return fetchedUsers.map( user => ({
      value: user.username || 'no username found',
      disabled: !checkForlanguageMatch(user)
    }))
  }

  const icon = <IconUsersPlus style={{ width: rem(16), height: rem(16) }} />;
  const data = getData()
  console.log('data', data);
  
  return (
    <Popover width={400} position="top" withArrow shadow="md" closeOnClickOutside={false}>
      <Popover.Target>
        <Button size="xs" color='yellow'>Add Friends</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Autocomplete
          //  value={selected ? selected.username: ''}
           leftSection={icon}
           renderOption={renderAutocompleteOption}
           maxDropdownHeight={300}
           label="Users"
           placeholder="Search for friends"
           data={data}
           comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
           onChange={handleChange}
        /> 
        {selected && selected.id && <div style={{marginTop: 5}}>
        <Button size="xs" onClick={() => handleAddParticipant(selected)}>Add</Button>
        <Button size="xs" variant="filled" color="red" onClick={() => setSelected(undefined)}>Cancel</Button>
        </div>}
      </Popover.Dropdown>
    </Popover>
  );
}