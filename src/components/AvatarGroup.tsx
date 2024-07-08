import { Avatar, Tooltip } from '@mantine/core';

export default function Demo({users, spacesAvailable}) {
    console.log('users', users);
    
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {users.map((user) => {
            return(<Tooltip label={user.firstname + ' ' + user.lastname} withArrow>
            <Avatar src="image.png" radius="xl">{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</Avatar>
            </Tooltip>)
        })}
        {spacesAvailable > 0 && <Tooltip
          withArrow
          label={
            <>
              <div>Click to Join</div>
            </>
          }
        >
          <Avatar radius="xl">+{spacesAvailable}</Avatar>
        </Tooltip>}
      </Avatar.Group>
    </Tooltip.Group>
  );
}