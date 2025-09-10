import Card from './components/Card'
import RecipeInfo from './components/RecipeInfo'
import IngredientsList from './components/IngredientsList'
import InstructionsList from './components/InstructionsList'
import RecipeImg from './components/RecipeImg'
import './components/RecipeCard.css'

import {RECIPE} from './components/recipe-data'

const App = () => {
  return (
    <div>
      <Card>
        <RecipeImg imgSrc={RECIPE.imgSrc} />
        <div className="card_text">
          <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
          <div className="card_lists">
            <IngredientsList data={RECIPE.ingredients} />
            <InstructionsList data={RECIPE.instructions} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App