import React, { Component } from 'react';
import "./recipepages.css";


const Example1 = () => {
  return (
    <div>
      <div className="recipe-card">
        <link rel="stylesheet" href="https://use.typekit.net/fak4lpj.css"></link>
        <img
          src={require("./icons/chow.png")}
          alt="logo"
          height="97.5"
          width="88.5"
          className="pic"
        />
        <div className="title">
          <p> LEMON GARLIC SHRIMP PASTA </p>
        </div>
        <div className="info">
          <p> servings: 4 | time: 25 min </p>
        </div>
        <div className="content">
          <p> INGREDIENTS </p>
            <ul className = "ingredients">
              <li>1 lb. shrimp, shelled and deveined</li>
              <li>8 oz. linguine or pasta of choice</li>
              <li>3-4 cups water</li>
              <li>1/2 cup parmesan cheese</li>
              <li>2 cups spinach</li>
              <li>1/2 lemon</li>
              <li>2 cloves garlic, minced</li>
              <li>2 tbsp. butter</li>
              <li>1/2 tsp. red pepper flakes</li>
              <li>Salt and pepper to taste</li>
              <li>Oregano to taste</li>
            </ul>
          <p> DIRECTIONS </p>
            <ol className = "directions">
              <li>In a pot, cook pasta in salted water according to the package directions</li>
              <li>In a separate pan, melt 1 tbsp. butter on medium and warm the garlic
                and red pepper flakes</li>
              <li>Add shrimp to the pan and sautee until slightly opaque but not fully cooked through, 1-2 minutes</li>
              <li>Drain the pasta, making sure to reserve 1/4 cup of the pasta water</li>
              <li>Add pasta and remaining 1 tbsp. butter to the pan and heat through, 2 minutes</li>
              <li>Add spinach to the pan and allow it to wilt, 1-2 minutes</li>
              <li>Add salt, pepper, oregano, and the juice and zest of 1/2 lemon</li>
              <li>Remove the pan from the heat and add parmesan cheese, stirring to incorporate</li>
              <li>Check for seasoning and serve!</li>
            </ol>
        </div>
      </div>
    </div>
  );
};

const Example2 = () => {
  return (
    <div className="beans">Woohoo</div>
  );
};

export {Example1, Example2};
