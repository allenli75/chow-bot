/** Find recipe by name */
async function findRecipe(client, recipeName, limit) {
    const cursor = client.db("chow_bot").collection("recipes").find({uri_name: recipeName}).limit(limit);
    const recipes = await cursor.toArray();
    return recipes;
};

/** Find recipes with specified filters */
async function filterRecipes(client, data, limit) {
    const name = data.params.ingredient;
    const category = data.params.category;
    const course = data.params.course;

    // Find all recipes that use an ingredient
    const cursor = client.db("chow_bot").collection("recipes").find({ingredients: {$in: name}});
    let recipes = await cursor.toArray();
    
    // If category specified, filter recipes by category
    if (category.length >= 1) {
        recipes = filterCategory(recipes, category);
    }
    // If course specified, filter recipes by course
    if (course.length >= 1) {
        recipes = filterCourse(recipes, course);
    }

    // Return number of recipes = limit
    recipes = recipes.slice(0, limit);

    const result = {
        intent: data.intent,
        text: data.text,
        recipes: recipes
    }
    return result;
};

/** Filters */

function filterCategory(recipes, categories) {
    filtered = [];
    recipes.forEach((recipe, i) => {
        let valid = false;
        categories.forEach((category, i) => {
            if (recipe.category.includes(category)) {
                valid = true;
            }
        });
        if (valid) {filtered.push(recipe)};
    });
    return filtered
}

function filterCourse(recipes, courses) {
    filtered = [];
    recipes.forEach((recipe, i) => {
        let valid = false
        courses.forEach((course, i) => {
            if (recipe.courses.includes(course)) {
                valid = true;
            }
        });
        if (valid) {filtered.push(recipe)};
    });
    return filtered
}

module.exports = {findRecipe, filterRecipes};
