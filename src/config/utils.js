
//--> time
const timeStamp = () => new Date();
//--> data 
const recipeTypes = {
    cuisine: [
        "Afghan", "African", "Andhra", "Arab", "Asian", "Assamese", "Awadhi", "Bengali Recipes", "Bihari",
        "Chettinad", "Chinese", "Coastal Karnataka", "Continental", "Coorg", "Fusion", "Goan Recipes",
        "Gujarati Recipes", "Haryana", "Himachal", "Hyderabadi", "Indian", "Indo Chinese", "Jharkhand",
        "Karnataka", "Kashmiri", "Kerala Recipes", "Kongunadu", "Konkan", "Korean", "Lucknowi",
        "Maharashtrian Recipes", "Malabar", "Malvani", "Mangalorean", "Middle Eastern", "Mughlai",
        "Nagaland", "Nepalese", "North East India Recipes", "North Indian Recipes", "North Karnataka",
        "Oriya Recipes", "Pakistani", "Parsi Recipes", "Punjabi", "Rajasthani", "Sichuan", "Sindhi",
        "South Indian Recipes", "South Karnataka", "Sri Lankan", "Tamil Nadu", "Thai", "Udupi",
        "Uttar Pradesh", "Uttarakhand-North Kumaon "
    ],
    course: [
        "Appetizer", "Brunch", "Dessert", "Dinner", "Indian Breakfast", "Lunch", "Main Course",
        "North Indian Breakfast", "One Pot Dish", "Side Dish", "Snack", "South Indian Breakfast", "World Breakfast"
    ],
    diet: [
        "Diabetic Friendly", "Eggetarian", "Gluten Free", "High Protein Non Vegetarian",
        "High Protein Vegetarian", "No Onion No Garlic (Sattvic)", "Non Vegeterian", "Vegan", "Vegetarian"
    ]
};


export {
    timeStamp,
    recipeTypes,
};