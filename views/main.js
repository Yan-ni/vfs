const form = document.querySelector('form');

form.addEventListener('submit', e => {
	e.preventDefault();
	let dateInput = document.querySelector('#datedepot').value;

	if(!dateInput.length)
		return;
	
	hideResult();

	dateInput = dateInput.split('-').reverse();
	dateInput[2] = dateInput[2].slice(2);
	dateInput = dateInput.join('');

	toggleLoading();

	fetch(`/api/${dateInput}`)
	.then(res => {
		toggleLoading();
		return res.json();
	})
	.then(res => {
		showResult(res.dossiersRestants);
	});
});

function toggleLoading()
{
	const formButton = document.querySelector('form button');

	formButton.disabled = !formButton.disabled;

	const loading = document.querySelector('.loading');

	loading.style.display = loading.style.display === 'flex' ? 'none' : 'flex';
}

function showResult(result)
{
	const resultat = document.querySelector('.resultat-recherche');

	resultat.style.display = 'block';

	const textarea = document.querySelector('textarea');

	textarea.value = result;

	const total = document.querySelector('#total');

	total.innerText = result.split('\n').length-1;

	const copyButton = document.querySelector('#copyButton');

	copyButton.addEventListener('click', () => {
		const textarea = document.querySelector('textarea');

		textarea.focus();
		textarea.select();

		document.execCommand('copy');
	});
}

function hideResult()
{
	const resultat = document.querySelector('.resultat-recherche');

	resultat.style.display = 'none';
}