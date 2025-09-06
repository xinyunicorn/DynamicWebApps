// const props = {
//   ingredients: [],
//   fakeProp: 'fakey fakey',
// }
const IngredientList = (props) => {
  // do stuff outside of the return jsx
  // destructuring
  const {ingredients, title} = props

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {ingredients.map((ingred, index) => (
          <li key={index}>{ingred}</li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientList