import { useAuth } from "@/hooks/useAuth";
import { Button } from '@mantine/core';
import Counter from '@/features/counter/Counter'
import { notifications } from '@mantine/notifications';
import { deleteOneDoc } from '@/services/apiCalls'
import { auth } from '@/firebaseConfig'

export default function Settings() {
  const {user} = useAuth()

  function handleDeleteUser() {
    const userFB = auth.currentUser; 
    console.log(userFB);
    userFB.delete().then(() => {
          console.log('auth deleted success');     
          deleteOneDoc('users', user.id)
          .then(() => {
            console.log('user collection deleted success');
            notifications.show({ color: 'green', title: 'Success', message: 'Account deleted', })
          })
      }).catch((error) => {
        notifications.show({ color: 'red', title: 'Error', message: 'Please Log out, log back in and try again', })
        console.log('error', error);
      });
  }

  return (
    <>
    settings
    <Counter />
    <Button onClick={handleDeleteUser}>Delete My Account</Button>
    </>
  );
}