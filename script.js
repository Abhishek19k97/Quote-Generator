// Selecting element where the data will be inserted
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Start loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Finish loading
const Complete = () => {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;        
    }
}

// Async function for fetching Quotes from a Rest API
const getQuotes = async () => {
    loading();
    const proxiURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try {
        const response = await fetch(proxiURL + apiURL);
        const data = await response.json();
        // if author name is blank then show "Unknown"
        if (data.quoteAuthor === '') {
            quoteText.innerText = 'unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        // if Quote length is greater than 100 then change font style
        if (data.quoteText.length > 100 ) {
            quoteText.classList.add('long-quote');                      
        } else {
            quoteText.classList.remove('long-quote');                      
        }
        quoteText.innerText = data.quoteText;    
        Complete();
    } catch (error) {
        console.log(error, 'whoops! no Quote found');
    }
}

// on load a new quote
getQuotes();

// Tweet Function 
const tweetQuote = ()=>{
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Responding to click event
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuotes);