//------------------------------------------------GET DATA---------------------------------------------
const allCompany = [
	{
		name: 'backblaze',
		min_price: 7,
		max_price: null,
		min_size: null,
		storage: 0.005,
		transfer: 0.01,
		color: 'red',
	},

	{
		name: 'bunny',
		min_price: 0,
		max_price: 10,
		min_size: null,
		storage: {
			HDD: 0.01,
			SSD: 0.02,
		},
		transfer: 0.01,
		color: 'yellow',
	},

	{
		name: 'scalleway',
		min_price: null,
		max_price: null,
		min_size: 75,
		storage: {
			Multi: 0.06,
			Single: 0.03,
		},
		transfer: 0.02,
		color: 'pink',
	},

	{
		name: 'vultr',
		min_price: 5,
		max_price: null,
		min_size: null,
		storage: 0.01,
		transfer: 0.01,
		color: 'blue',
	}
]

//-----------------------------------------------------DEFINE FUNCTIONS------------------------------------------

function getPrice(company, sizeStorage, sizeTransfer, param) {
	const resultStorage = company.min_size > +sizeStorage ? 0 : +sizeStorage - company.min_size;
	const resultTransfer = company.min_size > +sizeTransfer ? 0 : +sizeTransfer - company.min_size;
	const productStorage = param ? resultStorage * company.storage[param] : resultStorage * company.storage;
	const productTransfer = resultTransfer * company.transfer;
	const resultCalc = +(productStorage + productTransfer).toFixed(2)

	if (company.min_price > resultCalc) {
		return company.min_price;
	}
	if (company.max_price && company.max_price < resultCalc) {
		return company.max_price;
	}
	return resultCalc;
}

function companyPrice(company, param = null) {
	let outStorage = +document.getElementById('storageOut').textContent;
	let outTransfer = +document.getElementById('transferOut').textContent;

	return getPrice(company, outStorage, outTransfer, param);
}

function allPrices(allCompany) {
	const params = document.querySelectorAll('input[type = radio]');
	const prices = allCompany.map(company => {

		const param = Array.from(params).find(param => param.name === company.name && param.checked === true);
		document.querySelector(`.${company.name}-value`).textContent = `${companyPrice(company, param?.value)} $`;
		return { name: company.name, price: companyPrice(company, param?.value), color: company.color }

	})

	return prices;
}

function printPrice(prices) {

	const minRate = Math.min(...prices.map(price => price.price));
	const maxRate = Math.max(...prices.map(price => price.price));
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;

	prices.map(company => {

		const currentCompany = document.querySelector(`.${company.name}`);
		currentCompany.style.backgroundColor = 'gray';

		if (company.price === minRate) {
			currentCompany.style.backgroundColor = company.color;
		}

		if (screenWidth > screenHeight) {
			currentCompany.style.height = '32px';
			currentCompany.style.width = `${(company.price / maxRate) * 200}px`;
		} else {
			currentCompany.style.height = `${(company.price / maxRate) * 200}px`;
			currentCompany.style.width = '32px';
		}
	});
}

function showOffer() {

	const prices = allPrices(allCompany);
	printPrice(prices, allCompany);

}

//-----------------------------------------------------GET START VALUE------------------------------------------


showOffer();
storageOut.textContent = storage.value;
transferOut.textContent = transfer.value;

//-----------------------------------------------------ADD LISTENERS------------------------------------------

window.addEventListener('resize', (event) => {
	showOffer();
})


storage.addEventListener('input', (event) => {
	storageOut.textContent = `${event.target.value}`;
	showOffer();
})

transfer.addEventListener('input', (event) => {
	transferOut.textContent = `${event.target.value}`;
	showOffer();
})

HDD.addEventListener('change', () => showOffer());
SSD.addEventListener('change', () => showOffer());
Multi.addEventListener('change', () => showOffer());
Single.addEventListener('change', () => showOffer());


