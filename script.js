const quotes = [
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "inspiration"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "inspiration"
    },
    {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
        category: "inspiration"
    },
    {
        text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        author: "James Cameron",
        category: "inspiration"
    },
    {
        text: "The universe is under no obligation to make sense to you.",
        author: "Neil deGrasse Tyson",
        category: "science"
    },
    {
        text: "In science, we must be interested in things, not in persons.",
        author: "Marie Curie",
        category: "science"
    },
    {
        text: "Science is organized knowledge. Wisdom is organized life.",
        author: "Immanuel Kant",
        category: "science"
    },
    {
        text: "The good thing about science is that it's true whether or not you believe in it.",
        author: "Neil deGrasse Tyson",
        category: "science"
    },
    {
        text: "I have not failed. I've just found 10,000 ways that won't work.",
        author: "Thomas A. Edison",
        category: "science"
    },
    {
        text: "I'm not superstitious, but I am a little stitious.",
        author: "Michael Scott",
        category: "humor"
    },
    {
        text: "Never put off till tomorrow what you can do the day after tomorrow just as well.",
        author: "Mark Twain",
        category: "humor"
    },
    {
        text: "I'm sick of following my dreams, man. I'm just going to ask where they're going and hook up with them later.",
        author: "Mitch Hedberg",
        category: "humor"
    },
    {
        text: "Reality continues to ruin my life.",
        author: "Bill Watterson",
        category: "humor"
    },
    {
        text: "The unexamined life is not worth living.",
        author: "Socrates",
        category: "philosophy"
    },
    {
        text: "Happiness is not an ideal of reason, but of imagination.",
        author: "Immanuel Kant",
        category: "philosophy"
    },
    {
        text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
        author: "Jean-Paul Sartre",
        category: "philosophy"
    },
    {
        text: "The only thing I know is that I know nothing.",
        author: "Socrates",
        category: "philosophy"
    },
    {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
        category: "philosophy"
    }
];


const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const categorySelect = document.getElementById('category-select');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const randomBtn = document.getElementById('random-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const fontDecreaseBtn = document.getElementById('font-decrease-btn');
const fontIncreaseBtn = document.getElementById('font-increase-btn');


let currentQuoteIndex = 0;
let filteredQuotes = [...quotes];
let fontSize = 1.2; 


function init() {
    
    loadPreferences();
    
    
    updateFilteredQuotes();
    displayCurrentQuote();
    
    
    categorySelect.addEventListener('change', handleCategoryChange);
    prevBtn.addEventListener('click', showPreviousQuote);
    nextBtn.addEventListener('click', showNextQuote);
    randomBtn.addEventListener('click', showRandomQuote);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    fontDecreaseBtn.addEventListener('click', decreaseFontSize);
    fontIncreaseBtn.addEventListener('click', increaseFontSize);
}


function savePreferences() {
    const preferences = {
        darkMode: darkModeToggle.checked,
        fontSize: fontSize,
        category: categorySelect.value
    };
    localStorage.setItem('quoteGeneratorPrefs', JSON.stringify(preferences));
}


function loadPreferences() {
    const savedPrefs = localStorage.getItem('quoteGeneratorPrefs');
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        
        
        darkModeToggle.checked = prefs.darkMode;
        if (prefs.darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        
        fontSize = prefs.fontSize;
        document.documentElement.style.setProperty('--font-size', `${fontSize}rem`);
        
       
        if (prefs.category) {
            categorySelect.value = prefs.category;
        }
    }
}


function updateFilteredQuotes() {
    const selectedCategory = categorySelect.value;
    if (selectedCategory === 'all') {
        filteredQuotes = [...quotes];
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    
    if (currentQuoteIndex >= filteredQuotes.length) {
        currentQuoteIndex = 0;
    }
}


function displayCurrentQuote() {
    if (filteredQuotes.length === 0) {
        quoteTextElement.textContent = "No quotes found in this category.";
        quoteAuthorElement.textContent = "";
        return;
    }
    
    const quote = filteredQuotes[currentQuoteIndex];
    quoteTextElement.textContent = `"${quote.text}"`;
    quoteAuthorElement.textContent = `- ${quote.author}`;
}


function handleCategoryChange() {
    updateFilteredQuotes();
    displayCurrentQuote();
    savePreferences();
}

function showPreviousQuote() {
    if (filteredQuotes.length === 0) return;
    
    currentQuoteIndex--;
    if (currentQuoteIndex < 0) {
        currentQuoteIndex = filteredQuotes.length - 1;
    }
    displayCurrentQuote();
}

function showNextQuote() {
    if (filteredQuotes.length === 0) return;
    
    currentQuoteIndex++;
    if (currentQuoteIndex >= filteredQuotes.length) {
        currentQuoteIndex = 0;
    }
    displayCurrentQuote();
}

function showRandomQuote() {
    if (filteredQuotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuoteIndex = randomIndex;
    displayCurrentQuote();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    savePreferences();
}

function increaseFontSize() {
    if (fontSize < 2.0) {
        fontSize += 0.1;
        document.documentElement.style.setProperty('--font-size', `${fontSize.toFixed(1)}rem`);
        savePreferences();
    }
}

function decreaseFontSize() {
    if (fontSize > 0.8) {
        fontSize -= 0.1;
        document.documentElement.style.setProperty('--font-size', `${fontSize.toFixed(1)}rem`);
        savePreferences();
    }
}


init();