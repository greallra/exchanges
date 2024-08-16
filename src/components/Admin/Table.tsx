// React
import { useEffect, useState, } from 'react';
import { Link, useSearchParams, history } from "react-router-dom";
// Hooks
import useFetch from '@/hooks/useFetch';
// import { useAuth } from "@/hooks/useAuth";
import useLanguages from '@/hooks/useLanguages';
// Components
import { Table, Button, Select } from '@mantine/core';
import { IconPhoto, IconTrash, IconArrowRight } from '@tabler/icons-react';

// Utils
import { formatUsersData } from '@/common/utils'
import { deleteOneDoc } from '@/services/apiCalls'

export default function adminTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("data")
    const { data } = useFetch(param)
    const [reactiveData, setReactiveData] = useState([])
    const [filters, setFilters] = useState({})
    const [learningLanguageSelected, setLearningLanguageSelected] = useState({})
    const { languages } = useLanguages();
    // const { user } = useAuth()

    if (!param) {
      window.location.href = window.location.href + '?data=users'
    }
    function isEmpty(obj) {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
    
      return true;
    }
    function compare( a, b ) {
      if ( a.email < b.email ){
        return -1;
      }
      if ( a.email > b.email ){
        return 1;
      }
      return 0;
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

     let keys = reactiveData[0] ? Object.keys(reactiveData[0]): []
     // cols to omit
     const colsToOmit = ['teachingLanguageId', 'learningLanguageId', ]
     keys = keys.filter( key =>  !colsToOmit.includes(key))

     function unfoldObject(obj: object) {
      try {
        if (obj.name) {
          return obj.name;
        }
        return 'Unfold me'
      } catch (error) {
        console.log(obj);
        
         return `Error unfolding ${JSON.stringify(obj, null, 2)}`
      }
 
     }
     async function handleDeleteDoc(id) {
       await deleteOneDoc(param, id); 
     }

     useEffect(() => {
        if(!isEmpty(filters)) {
          let filteredData = []
          if(filters.teachingLanguageId) {
            filteredData = data.filter((item) => item.teachingLanguageId === filters.teachingLanguageId)
            setReactiveData(formatUsersData(filteredData, languages))
          }
          if(filters.learningLanguageId) {
            filteredData = filteredData.filter((item) => item.learningLanguageId === filters.learningLanguageId)
            setReactiveData(formatUsersData(filteredData, languages))
          }
      
        } else {
          setReactiveData(formatUsersData(data, languages))
        }
     }, [filters])

     function filterChange(filterProperty, val) {
      setFilters(prevState => ({
          ...prevState,
          [filterProperty]: val
      }));
      
     }

    reactiveData.sort(compare)

    return (<>
    <h1>{param} List</h1>
    <div className="flex-ac">
    <h6>Choose Page</h6>
    <Button.Group>
      <Button 
          variant={param === 'users' ? 'primary' : 'default'} 
          onClick={() => { setSearchParams({ data: 'users' }); window.location.reload() }}>users
      </Button>
      <Button 
            variant={param === 'exchanges' ? 'primary' : 'default'} 
          onClick={() => { setSearchParams({ data: 'exchanges' }); window.location.reload() }}>exchanges
      </Button>
      <Button 
          variant={param === 'languages' ? 'primary' : 'default'} 
          onClick={() => { setSearchParams({ data: 'languages' }); window.location.reload() }}>languages
      </Button>
    </Button.Group>
    </div>
    <div className="flex-sb">
      <div>
        <h6>teachingLanguageId</h6>
        <Button.Group>
          {languages.map((lang) => {
            return <Button 
              variant={lang.id === filters.teachingLanguageId ? 'primary' : 'default'} 
              onClick={() => filterChange('teachingLanguageId' , lang.id)}>{lang.name}
              </Button>
          })}
        </Button.Group>
      </div>
      <div>
      <h6>learningLanguageId</h6>
        <Button.Group>
          {languages.map((lang) => {
            return <Button 
              variant={lang.id === filters.learningLanguageId ? 'primary' : 'default'} 
              onClick={() => filterChange('learningLanguageId' , lang.id)}>{lang.name}
              </Button>
          })}
        </Button.Group>
      </div>
    </div>
    <Button onClick={ () => setFilters({})}>Rmove filters</Button>
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
              {typeof item[tableKey] === 'number' && item[tableKey]}
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