async function findRecipes(client, recipeName, limit) {
    const cursor = client.db("chow_bot").collection("recipes").find({uri_name: recipeName}).limit(limit);
    const recipes = await cursor.toArray();
    return recipes;
}

module.exports = findRecipes;
