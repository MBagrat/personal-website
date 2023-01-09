;(function () {
  <!--@formatter:off-->
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#252e39"
      },
      "button": {
        "background": "#4B7E85"
      }
    },
    "theme": "edgeless",
    "position": "bottom-right",
    "type": "opt-in",
    "content": {
      "message": "Our website uses cookies to improve your browsing experience. By using our site, you agree to our use of cookies.",
      "dismiss": "Decline",
      "allow": "I'm happy with this",
      "link": "Find out how we use cookies.",
      "href": "https://mbagrat.com/terms"
    },
    onInitialise: function (status) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type === 'opt-in' && didConsent) {
        // enable cookies
        loadGAonConsent();
      }
      if (type === 'opt-out' && !didConsent) {
        // disable cookies
      }
    },
    onStatusChange: function(status, chosenBefore) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type === 'opt-in' && didConsent) {
        // enable cookies
        loadGAonConsent();
      }
      if (type === 'opt-out' && !didConsent) {
        // disable cookies
      }
    },
    onRevokeChoice: function() {
      var type = this.options.type;
      if (type === 'opt-in') {
        // disable cookies
      }
      if (type === 'opt-out') {
        // enable cookies
        loadGAonConsent();
      }
    }
  });
  <!--@formatter:on-->
})();
