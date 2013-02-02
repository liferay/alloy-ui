function (A) {
    var supportsDOMEvent  = A.supportsDOMEvent,
        testFeature = A.Features.test,
        addFeature = A.Features.add;

    if (testFeature('event', 'input') === undefined) {
        addFeature('event', 'input', {
            test: function() {
                return supportsDOMEvent(document.createElement('textarea'), 'input');
            }
        });
    }

    return !testFeature('event', 'input');
}
