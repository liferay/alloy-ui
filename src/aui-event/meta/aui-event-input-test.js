function(A) {
    var supportsDOMEvent = A.supportsDOMEvent,
        testFeature = A.Features.test,
        addFeature = A.Features.add;

    if (testFeature('event', 'input') === undefined) {
        addFeature('event', 'input', {
            test: function() {
                return supportsDOMEvent(document.createElement('textarea'), 'input') && (!A.UA.ie || A.UA.ie > 9);
            }
        });
    }

    return !testFeature('event', 'input');
}
