import { useAuth } from "@/hooks/useAuth";
// import Users from './Users'
import Table from "@/components/Admin/Table"


export default function index() {
  const {user} = useAuth()

  return (
    <>
    make this reuseable
    <Table />
    {/* <Users /> */}
    </>
  );
}