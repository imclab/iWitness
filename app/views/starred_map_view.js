IWitness.StarredMapView = Ember.View.extend({
  templateName: 'starred_map_template',
  currentViewBinding: 'IWitness.currentViewController',
  // selectedResultBinding: 'IWitness.starredSetController.selectedResult',

  didInsertElement: function() {
    if (this.getPath('currentView.showingStarredResults') && !this.map) {
      _.defer(function(){
        this.map = new Map(document.getElementById("starred-map"), 40.735955030904755, -73.99026397144165); // OWS Union Sq
      });
    }
  }.observes('currentView.showingStarredResults'),

  numberOfItems: function(){
    var num = this.getPath('IWitness.starredSetController.length');
    return num + " starred item" + (num == 1 ? "" : "s");
  }.property('IWitness.starredSetController.length'),

  numberFlaggedForExport: function(){
    var num = this.getPath('IWitness.starredSetController.length');
    return num + " flagged for export";
  }.property('IWitness.starredSetController.length'),

  showExportText: function() {
    this.$('#export-popover').show();
  },

  hideExportText: function() {
    this.$('#export-popover').hide();
  },

  exportLink: Ember.View.extend({
    tagName:    'a',
    classNames: 'button',
    attributeBindings: ['href'],

    href: function() {
      var results = [];
      $('#rendered-text-results p').each(function(i, result) {
        results.push($(result).text());
      });
      results = results.join("\n");
      results += "\n\nShared via iWitness\n<http://iwitness.adaptivepath.com>";

      return "mailto:yourfriend@example.com?subject=iWitness Starred Results&body="+encodeURIComponent(results);
    }.property('IWitness.starredSetController.content.length', 'IWitness.currentViewController.showingStarredResults'),

    click: function() {
      var exportSize = IWitness.starredSetController.getPath('content.length');
      Analytics.track('starred results', 'exported', 'size of export', exportSize);
    }
  })

  // createMarkerForResult: function() {
  //   var lat = this.getPath('selectedResult.lat');
  //   var lng = this.getPath('selectedResult.lng');
  //   if (this.map) this.map.moveMarkerTo(lat, lng);
  // }.observes('selectedResult')
});
