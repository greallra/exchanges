import { useAuth } from "../../hooks/useAuth";
import Users from './Users'


export default function index() {
  const {user} = useAuth()

  return (
    <>
    make this reuseable
    <Users />
    </>
  );
}