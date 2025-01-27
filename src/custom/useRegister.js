import { useState } from "react"

const useRegister=(i)=>{
    const [teacher,setTeacher]=useState(i)
    const formHandler=(e)=>{
  const {name,value}=e.target;
   setTeacher((preVal)=>({ 

   
    ...preVal,[name]:value
    }))
    }
    return {formHandler,teacher}
}
export default useRegister;