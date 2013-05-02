
var TableViewer = Class.extend({
                               visual : null,
                               construct : function(visual) {
                               this.visual = visual;
                               },
                               refresh : function() {
                               this.visual.options.callbacks.search(this.visual.searchBox.currentQuery, this.visual.searchQuery);
                               }
                               });



$(document).ready(function() {

    $('.nav-tabs a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                    })

});
