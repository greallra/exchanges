import { Avatar, Tooltip } from '@mantine/core';
import { getUserInitials } from '@/utils'

export default function AvatarGroup({users, spacesAvailable}) {    
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {users.map((user) => {
            return(<Tooltip label={user.firstname + ' ' + user.lastname} withArrow>
            <Avatar src="image.png" size="sm">{getUserInitials(user)}</Avatar>
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
          <Avatar radius="xl" size="sm">+{spacesAvailable}</Avatar>
        </Tooltip>}
      </Avatar.Group>
    </Tooltip.Group>
  );
}