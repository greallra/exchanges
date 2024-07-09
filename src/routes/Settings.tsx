import { useAuth } from "../hooks/useAuth";

export default function Settings() {
  const {user} = useAuth()

  return (
    <>
    settings
    </>
  );
}