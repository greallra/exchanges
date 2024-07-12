import { TextInput, Select, Image, Text } from '@mantine/core';

const UserFlag = ({src}) => {
    return (
        <Image
            radius="md"
            h={'20px'}
            src={src}
        />
    )
}

export default UserFlag;