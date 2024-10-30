const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd';

// Store cryptocurrency prices
let cryptoPrices = {};

// Fetch real-time prices from CoinGecko
async function fetchPrices() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cryptoPrices = {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      BNB: data.binancecoin.usd,
    };
    displayPrices();
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

// Display the fetched prices on the page
function displayPrices() {
  document.getElementById('btcPrice').textContent = `$${cryptoPrices.BTC}`;
  document.getElementById('ethPrice').textContent = `$${cryptoPrices.ETH}`;
  document.getElementById('bnbPrice').textContent = `$${cryptoPrices.BNB}`;
}

// Convert the entered amount between two cryptocurrencies
function convertCrypto() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCrypto = document.getElementById('fromCrypto').value;
  const toCrypto = document.getElementById('toCrypto').value;

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const fromPrice = cryptoPrices[fromCrypto];
  const toPrice = cryptoPrices[toCrypto];
  const convertedAmount = (amount * fromPrice) / toPrice;

  document.getElementById('result').textContent = 
    `Converted Amount: ${convertedAmount.toFixed(6)} ${toCrypto}`;
}

// Fetch prices when the page loads
fetchPrices();
