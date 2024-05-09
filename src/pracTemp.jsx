const array = [
    'barcelona',
    'real madrid',
    'man city',
    'dortmund',
    'psg'
  ]
  
  function Test({ Data, details }) {
      return (
          <>
          <h3>{Data.name_of_comp}</h3>
          <ul>
              {Data.names.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <br />
          <h4> details received are {" >>: "} {details.email} {details.pass} </h4>
          </>
      )
  }
  
  export default Test
  