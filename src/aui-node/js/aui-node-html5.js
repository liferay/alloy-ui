if (A.UA.ie) {
	var HTML5 = A.namespace('HTML5'),
		DOM_create = A.DOM._create;

	if (!HTML5._fragHTML5Shived) {
		console.log('CREATING SHIV');
		HTML5._fragHTML5Shived = AUI.html5shiv(
			document.createDocumentFragment()
		);
	}

	A.mix(
		HTML5,
		{
			IECreateFix: function(frag, content) {
				var shivedFrag = HTML5._fragHTML5Shived;

				shivedFrag.appendChild(frag);

				frag.innerHTML = content;

				shivedFrag.removeChild(frag);

				return frag;
			},

			_doBeforeCreate: function(html, doc, tag) {
				var createdFrag = DOM_create.apply(this, arguments);

				var shivedFrag = HTML5.IECreateFix(createdFrag, html);

				return new A.Do.Halt(null, shivedFrag);
			}
		}
	);

	A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);
}