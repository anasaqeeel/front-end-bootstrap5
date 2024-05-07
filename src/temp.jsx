const array = [
  'barcelona',
  'real madrid',
  'man city',
  'dortmund',
  'psg'
]

function Test({ names, name_of_comp }) {
    return (
        <>
        <h3>{name_of_comp}</h3>
        <ul>
            {names.map((item)=><li>{item}</li>)}
        </ul>
        </>
    )
}

export default Test
