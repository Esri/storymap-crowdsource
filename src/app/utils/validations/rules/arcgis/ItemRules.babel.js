import Validator from 'lib/validatorjs/dist/validator';

Validator.register('arcgisItemName',(val) => {
	return !val.match(/[<>]/gi);
});

Validator.register('arcgisServiceNameFormat',(val) => {
	return val.match(/^[a-zA-Z0-9_]*$/gi);
});
