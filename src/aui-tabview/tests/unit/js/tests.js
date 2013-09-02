YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI TabView Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-tabview'),
        myTabView,
        myOtherTabView;

    myTabView = new Y.TabView({
        srcNode: '#myTab'
    }).render();

    myOtherTabView = new Y.TabView({
        children: [
            {
                content: '<br><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dicta aspernatur beatae fuga neque cupiditate laudantium itaque pariatur deleniti tenetur modi voluptatem animi sunt eligendi nisi corporis expedita quaerat facilis.</p>',
                label: 'Tab #1'
            },
            {
                content: '<br><p>Doloremque beatae rem voluptate nulla perspiciatis atque laudantium nihil impedit molestiae fuga veritatis quibusdam nam maiores aliquid. Deserunt dolorum quas temporibus enim ex nihil nemo perspiciatis. Nisi deserunt rem id pariatur in nostrum?</p>',
                disabled : true,
                label: 'Tab #2'
            },
            {
                content: '<br><p>Aliquid ipsum asperiores alias temporibus autem impedit soluta ut id iure explicabo veritatis consectetur debitis eaque recusandae odit quas nobis maxime saepe. Incidunt amet obcaecati. Ducimus soluta unde repellat laboriosam fuga modi rem itaque!</p>',
                label: 'Tab #3'
            }
        ],
        srcNode: '#myOtherTab'
    }).render();

    //--------------------------------------------------------------------------
    // Test Case for invalid fields
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Tabview Tests',

        /*
         * @tests AUI-976
         */
        'verify active tab instantiated from markup': function() {
            var activeTab = myTabView.getActiveTab(),
                tabs = myTabView.getTabs();

            Y.Assert.areEqual(1, tabs.indexOf(activeTab), 'The active tab should be the second one.');
        },

        /*
         * @tests AUI-976
         */
        'verify disabled tab instantiated from markup': function() {
            var disabledTabs = [],
                tabs = myTabView.getTabs();

            tabs.each(function(node) {
                if (node.hasClass('disabled')) {
                    disabledTabs.push(node);
                }
            });

            Y.Assert.areEqual(1, disabledTabs.length, 'Only one tab marked as disabled is expected.');
            Y.Assert.areEqual(2, tabs.indexOf(disabledTabs[0]), 'The disabled tab should be the third one.');
        },

        /*
         * @tests AUI-976
         */
        'verify active tab instantiated from script': function() {
            var activeTab = myOtherTabView.getActiveTab(),
                tabs = myOtherTabView.getTabs();

            Y.Assert.areEqual(0, tabs.indexOf(activeTab), 'The active tab should be the first one.');
        },

        /*
         * @tests AUI-976
         */
        'verify disabled tab instantiated from script': function() {
            var disabledTabs = [],
                tabs = myOtherTabView.getTabs();

            tabs.each(function(node) {
                if (node.hasClass('disabled')) {
                    disabledTabs.push(node);
                }
            });

            Y.Assert.areEqual(1, disabledTabs.length, 'Only one tab marked as disabled is expected.');
            Y.Assert.areEqual(1, tabs.indexOf(disabledTabs[0]), 'The disabled tab should be the second one.');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-tabview' ] });