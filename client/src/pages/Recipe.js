import React, {useEffect, useState} from 'react';

import './Recipe.css';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import {
  Link, useParams,
} from 'react-router-dom';

const Recipe = () => {
  const name = useParams().name;
  const [recipe, setRecipe] = useState({
    ingredients_text: [],
    steps: []
  });

  useEffect(() => {
    const uri = "/api/recipe?name=" + name;
    fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => setRecipe(data));
  }, []);

  const ingredients = recipe.ingredients_text.map((ingredient, i) => <li key={i}>{ingredient}</li>);
  const steps = recipe.steps.map((step, i) => <li key={i}>{step}</li>);

  return(
      <>
        {recipe.name ?
          <div className="recipe-card">
            <Link to="/">
              <img
                src={require("../assets/logo.png")}
                height="80"
                alt="logo"
                className="logo"
              />
            </Link>
            <div className="recipe-heading">
              <div className="recipe-heading-row">
                <h1 className="name">
                  {recipe.name}
                </h1>
              </div>
              <div className="recipe-heading-row">
                <div className="cook-time">
                  <AlarmRoundedIcon className="heading-icon"/>
                  <h3>{recipe.cook_time}</h3>
                </div>
                <div className="separator">
                  <h3>|</h3>
                </div>
                <div className="servings">
                  <RestaurantRoundedIcon className="heading-icon"/>
                  <h3>{recipe.servings + " servings"}</h3>
                </div>
              </div>
            </div>
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              {ingredients}
            </div>
            <div className="recipe-steps">
              <h2>Directions</h2>
              <ol>{steps}</ol>
            </div>
          </div>
        : null }
      </>
      
  );
};

export default Recipe;