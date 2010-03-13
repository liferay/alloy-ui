AUI().use('datatype-date', function(A) {

	A.DataType.Date.Locale['pt-br'] = A.merge(
		A.DataType.Date.Locale['en'], {
			a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],
			A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
			b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],
			B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			c: '%a %d %b %Y %T %Z',
			p: ['AM', 'PM'],
			P: ['am', 'pm'],
			r: '%I:%M:%S %p',
			x: '%d/%m/%y',
			X: '%T'
		}
	);

});