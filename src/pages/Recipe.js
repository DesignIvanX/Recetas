import React from 'react';
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

export default class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipe: null, isLoading: true }
  }

  async componentDidMount() {
    var recipe = null
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.recipeId)
    } catch(e) {
      recipe = null
    }
    this.setState({ recipe, isLoading: false })
  }
  share = (e) => {
    e.preventDefault()

    if(!Navigator.share) {
      alert("Your browser does not support sharing")
      return 
    }

    const { recipe } = this.state

    Navigator.share({
      title: recipe.name, 
      text: recipe.description, 
      url: document.location.href, 
    }).then(() => alert('contenido compartido'))
    .catch((err) => alert('error al compartir' + err))
  }
  render() {
    const { recipe, isLoading } = this.state

    if( isLoading ) {
      return <div className="message">Cargando...</div>
    }
    else if( recipe === null ) {
      return <div className="message">Hubo un problema :(</div>
    }

    return <div className="Recipe">
      <Helmet>
        <title>{ recipe.name }</title>
      </Helmet>

      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />
      
      <div className="title">
        <button onClick={this.share}>
            Share x
        </button>
        <div className="info">
          <h1>{ recipe.name }</h1>
          <p>{ recipe.origin }</p>
        </div>
        <div>
        </div>
      </div>


      <RecipeIngredients ingredients={ recipe.ingredients } />

      <RecipeInstructions instructions={ recipe.instructions } />

    </div>
  }

}