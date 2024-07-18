// React
import { useEffect, useState, } from 'react';
import { Link, useSearchParams, history } from "react-router-dom";
// Hooks
import useFetch from '@/hooks/useFetch';
// import { useAuth } from "@/hooks/useAuth";
import useLanguages from '@/hooks/useLanguages';
// Components
import { Table, Button } from '@mantine/core';
import { IconPhoto, IconTrash, IconArrowRight } from '@tabler/icons-react';

// Utils
import { formatUsersData } from '@/common/utils'
import { updateDoc, getOneDoc, deleteOneDoc } from '@/services/apiCalls'

export default function adminTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("data")
    const { data } = useFetch(param)
    const [reactiveData, setReactiveData] = useState([])
    const { languages } = useLanguages();
    // const { user } = useAuth()

    if (!param) {
      window.location.href = window.location.href + '?data=users'
    }

    useEffect(() => {
      if(languages.length === 0 || data.length === 0){
        return
      }
      if (param === 'users') {
        return setReactiveData(formatUsersData(data, languages))
      }
      setReactiveData(data)
     }, [languages, data])
  
     console.log('reactiveData', reactiveData);
     let keys = reactiveData[0] ? Object.keys(reactiveData[0]): []
     // cols to omit
     const colsToOmit = ['teachingLanguageId', 'learningLanguageId', ]
     keys = keys.filter( key =>  !colsToOmit.includes(key))

     function unfoldObject(obj: object) {
        if (obj.name) {
          return obj.name;
        }
        return 'Unfold me'
     }
     async function handleDeleteDoc(id) {
       await deleteOneDoc(param, id); 
     }

    return (<>
    <h1>{param} List</h1>
   <Table>
      <Table.Thead>
        <Table.Tr>
          {keys.map((tableKey) => <Table.Th key={tableKey}>{tableKey}</Table.Th>)}
          <Table.Th>
          Actions
        </Table.Th>
        </Table.Tr>
      </Table.Thead>
       <Table.Tbody> 
        {reactiveData.map((item,i) => {
          return ( 
          <Table.Tr key={i}>
            {/* {keys.map((tableKey) => <Table.Td key={tableKey}>{JSON.stringify(item[tableKey]).slice(0, 15)}</Table.Td>)} */}
            {keys.map((tableKey) => <Table.Td key={tableKey}>
              {typeof item[tableKey] === 'object' && unfoldObject(item[tableKey])}
              {typeof item[tableKey] === 'string' && item[tableKey]}
            </Table.Td>)}
            <Table.Td><IconTrash onClick={() => handleDeleteDoc(item.id)} size={14} color='red'/></Table.Td>
          </Table.Tr>)
        })}
        </Table.Tbody>
    </Table> 
   
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
    </>)
}