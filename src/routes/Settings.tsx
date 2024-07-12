import { useAuth } from "../hooks/useAuth";
import Counter from '../features/counter/Counter'

export default function Settings() {
  const {user} = useAuth()

  return (
    <>
    settings
    <Counter />
    </>
  );
}