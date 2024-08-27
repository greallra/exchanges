import { useAuth } from "@/hooks/useAuth";
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { esDeleteDoc } from 'exchanges-shared'
import { auth, db as FIREBASE_DB } from '@/firebaseConfig'
import { useStore } from '@/store/store'

export default function Settings() {
  const {user} = useAuth()
  const count = useStore((state) => state.count)
  const inc = useStore((state) => state.inc)

  function handleDeleteUser() {
    const userFB = auth.currentUser; 
    console.log(userFB);
    userFB.delete().then(() => {
          console.log('auth deleted success');     
          esDeleteDoc(FIREBASE_DB, 'users', user.id)
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
    <div className="flex">
      <div> {count}</div>
      <button onClick={inc}>Inc</button>
    </div>
   
    <Button onClick={handleDeleteUser}>Delete My Account</Button>
    </>
  );
}