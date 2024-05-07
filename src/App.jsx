import React from 'react'

//component

function hello(){
  return (
    // two ways inorder to return more than one components within one func
    // store all in one div
    // use react frag i.e blank tags >> : <> </>
    <> 
    <div>
    <h1 className="heading"> Hello! this is writen in REACT!!</h1>
    <h1 className="heading"> cool right?</h1>
    </div>
    </>
  )
}

// def -> when single obj needs to be exported
// named def -> multiple exports but name should be same where imports!
// export {a}
// export {b}

export default hello