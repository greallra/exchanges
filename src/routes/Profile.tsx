import { useAuth } from "../hooks/useAuth";
import Counter from '../features/counter/Counter'

interface alertProps {
    show: boolean,
    text: string
}

export default function MyAlert(props: alertProps) {
  const {user} = useAuth()

  return (
    <>
    profile of: {user && user.firstname} {user && user.lastname}
    <Counter />
    </>
  );
}