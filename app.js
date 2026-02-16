const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta",
        // NEW: Add ingredients array
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale",
            "4 large eggs",
            "100g Pecorino Romano cheese",
            "Black pepper",
            "Salt"
        ],
        // NEW: Add steps array (can include nested steps)
        steps: [
            "Bring a large pot of salted water to boil",
            "Cook spaghetti according to package directions",
            {
                text: "Prepare the sauce",
                substeps: [
                    "Beat eggs in a bowl",
                    "Grate cheese and add to eggs",
                    "Add generous black pepper",
                    "Mix well"
                ]
            },
            "Cook pancetta in a large pan until crispy",
            "Drain pasta, reserve 1 cup pasta water",
            "Add hot pasta to pancetta pan (off heat)",
            "Quickly mix in egg mixture, adding pasta water to create creamy sauce",
            "Serve immediately with extra cheese"
        ]
    },
    // TODO: Update the remaining 7 recipes with ingredients and steps
    // At least 2 recipes should have nested substeps
];
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
            
            <!-- NEW: Toggle Buttons -->
            <div class="card-actions">
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                    📋 Show Steps
                </button>
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                    🥗 Show Ingredients
                </button>
            </div>
            
            <!-- NEW: Ingredients Section (hidden by default) -->
            <div class="ingredients-container" data-recipe-id="${recipe.id}">
                <h4>Ingredients:</h4>
                <ul>
                    ${/* TODO: Generate list items for each ingredient */}
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <!-- NEW: Steps Section (hidden by default) -->
            <div class="steps-container" data-recipe-id="${recipe.id}">
                <h4>Cooking Steps:</h4>
                ${/* TODO: Call createStepsHTML function here */}
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>
    `;
};
// Recursive function to render steps (handles nesting)
const renderSteps = (steps, level = 0) => {
    // Determine the CSS class based on nesting level
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    
    let html = `<ol class="${listClass}">`;
    
    steps.forEach(step => {
        // TODO: Check if step is a string or object
        if (typeof step === 'string') {
            // Simple step - just add as list item
            html += `<li>${step}</li>`;
        } else {
            // Nested step - has text and substeps
            html += `<li>`;
            html += step.text;  // Main step text
            
            // TODO: Recursively call renderSteps for substeps
            if (step.substeps && step.substeps.length > 0) {
                // RECURSIVE CALL - this is the key!
                html += renderSteps(step.substeps, level + 1);
            }
            
            html += `</li>`;
        }
    });
    
    html += `</ol>`;
    return html;
};
// Create complete steps HTML for a recipe
const createStepsHTML = (steps) => {
    // TODO: Check if steps exist
    if (!steps || steps.length === 0) {
        return '<p>No steps available</p>';
    }
    
    // Call the recursive function to generate the nested list
    return renderSteps(steps);
};
// Handle toggle button clicks using event delegation
const handleToggleClick = (event) => {
    // Check if clicked element is a toggle button
    if (!event.target.classList.contains('toggle-btn')) {
        return;  // Not a toggle button, ignore
    }
    
    const button = event.target;
    const recipeId = button.dataset.recipeId;
    const toggleType = button.dataset.toggle;  // "steps" or "ingredients"
    
    // TODO: Find the corresponding container
    const containerClass = toggleType === 'steps' ? 'steps-container' : 'ingredients-container';
    const container = document.querySelector(`.${containerClass}[data-recipe-id="${recipeId}"]`);
    
    // TODO: Toggle visibility
    if (container) {
        container.classList.toggle('visible');
        
        // Update button text
        const isVisible = container.classList.contains('visible');
        if (toggleType === 'steps') {
            button.textContent = isVisible ? '📋 Hide Steps' : '📋 Show Steps';
        } else {
            button.textContent = isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients';
        }
    }
};
const setupEventListeners = () => {
    // From Part 2 - filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // From Part 2 - sort buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSortClick);
    });
    
    // NEW: Event delegation for toggle buttons
    // One listener on parent handles all toggle buttons
    recipeContainer.addEventListener('click', handleToggleClick);
    
    console.log('Event listeners attached!');
};
// Wrap entire app in IIFE for encapsulation
const RecipeApp = (() => {
    
    // ============================================
    // PASTE ALL YOUR EXISTING CODE HERE
    // ============================================
    
    // Your recipes array
    const recipes = [...];
    
    // Your state variables
    let currentFilter = 'all';
    let currentSort = 'none';
    
    // Your DOM references
    const recipeContainer = document.querySelector('#recipe-container');
    // ... etc
    
    // All your functions from Parts 1, 2, and new Part 3 functions
    const renderSteps = (steps, level) => {...};
    const createStepsHTML = (steps) => {...};
    const createRecipeCard = (recipe) => {...};
    const filterByDifficulty = (recipes, difficulty) => {...};
    // ... etc
    
    const handleToggleClick = (event) => {...};
    const handleFilterClick = (event) => {...};
    // ... etc
    
    const setupEventListeners = () => {...};
    const updateDisplay = () => {...};
    
    // ============================================
    // INITIALIZATION FUNCTION
    // ============================================
    const init = () => {
        console.log('RecipeApp initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('RecipeApp ready!');
    };
    
    // ============================================
    // PUBLIC API - What's accessible from outside
    // ============================================
    return {
        init: init,
        // Expose updateDisplay so filter/sort handlers can call it
        updateDisplay: updateDisplay
    };
    
})();  // <-- IIFE is immediately invoked

// ============================================
// START THE APP
// ============================================
RecipeApp.init();
const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    currentFilter = filterType;
    updateActiveButtons();
    
    // Still works because updateDisplay is in the return object
    updateDisplay();
};