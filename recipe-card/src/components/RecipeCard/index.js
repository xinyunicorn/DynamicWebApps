import './styles.css'
import {RECIPE} from './recipe-data'
// import CHICKEN_IMG from '../../assets/pancake.jpg'
import IngredientList from './IngredientList'

const RecipeCard = () => {
  return (
    <div className="card">
      <img src={RECIPE.imgSrc} alt="pancakes" className="recipe_img" />
      <IngredientList ingredients={RECIPE.ingredients} title="Ingredients" />
      <div>
        <h2>Instructions</h2>
        <ol>
          {RECIPE.instructions.map((ingred, index) => (
            <li key={index}>{ingred}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
export default RecipeCard