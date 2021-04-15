
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const unlistedTokens = document.querySelector('.unlistedtokens')
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
let account;
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })


    console.log(location)
})

ethereumButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }
    //Will Start the metamask extension
    ethereum.request({ method: 'eth_requestAccounts' });
    getAccount();

});

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    showAccount.innerHTML = account;
}

unlistedTokens.addEventListener('click', ()=>{
    fetch('/unlistedtokens?address=' + account).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data;
                messageTwo.textContent = data;
            }
        })
    })
    console.log(tokenbalance(account))
})