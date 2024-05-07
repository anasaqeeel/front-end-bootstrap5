import React, { useState } from 'react'
import Test from './temp'
import { isInterfaceType } from 'graphql'

//component
const array=[
  'barcelona',
  'real madrid',
  'man city',
  'dortmund',
  'psg'
]

// '{}' use this to implement js within html
function hello(){
  //using expressions
  const x=' >>: '
  // as this v is local to this fucntional comp here, react does not know abt this
  // so we use useState
  let v=0;
  //use gen prac >>: (x,y) x is the value that is updated , y updated x (func)
  //useState // A STATE HOOK 
  // using this hook we're telling react that this func comp have data or state that change over time

  // each comp has its own states n they are indep to eachother
  var [V,setV]=useState(-1);
  var [data,setData]=useState();

  //using props to dynamically use the comp in multiple
  function show(){
    return(
    <ul className='list-group'>
        {array.map((item,index)=>
        <li onClick={()=>setV(index)} className={V===index? 'list-group-item active':'list-group-item'} key={item}>
          {item}
        </li>
        )
        }
    </ul>
    )
  }
  return (
    // two ways inorder to return more than one components within one func
    // store all in one div
    // use react frag i.e blank tags >> : <> </>
    
    <> 
    <div>{show()}</div>
    <div> here's text from test {x} <Test names={array} name_of_comp={"prop list"}/> </div>
    <h1>{data}</h1>
    <button onClick={()=>setData(data==="sohaib"?"arslan":"sohaib")}>CLICK ME</button>
    </>
  )
}

// def -> when single obj needs to be exported
// named def -> multiple exports but name should be same where imports!
// export {a}
// export {b}

export default hello