/* App.js */
;(function (window) {
  var Divvy = Divvy || {};

  Divvy.App = {
    /**
     * Responsible to store default components
     * @property defaults
     */
    defaults: {
      items: document.querySelectorAll('.locations-button'),
      itemsLength: document.querySelectorAll('.locations-button').length
    },

    /**
     * Responsible to initialize the application
     * @method init
     */
    init: function() {
      this.attachEvents();
    },

    /**
     * Responsible to attach events
     * on locations
     * @method attachEvents
     */
    attachEvents: function() {
      var elItem = this.defaults.items,
          elItemLength = this.defaults.itemsLength,
          that = this,
          i = 0;

      for ( ; i < elItemLength; i++ ) {
        if ( elItem[i].addEventListener ) {
            elItem[i].addEventListener('click', that.showContent, false);
        } else {
            elItem[i].onclick = that.showContent;
        }
      }
    },

    /**
     * Responsible to show the information
     * @method showContent
     */
    showContent: function(e) {
      e.preventDefault();
      var elItem = document.querySelectorAll('.locations-button'),
          elItemLength = elItem.length,
          i = 0;

      for ( ; i < elItemLength; i++ ) {
        elItem[i].classList.remove('active');
      }
      this.classList.toggle('active');
    }

  }

  Divvy.App.init();

})(window);