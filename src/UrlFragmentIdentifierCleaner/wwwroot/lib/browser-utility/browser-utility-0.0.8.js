/*
 * BrowserUtility JavaScript library v0.0.8
 * (c) Łukasz Dąbrowski (https://github.com/lukaszdabrowskicom/BrowserUtility)
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
(function (window) {
    'use strict';
    var _currentBrowser = navigator.userAgent;

    var _mobileBrowserRegex = /mobile/i;

    var _chromeRegex = /chrome/i;
    var _firefoxRegex = /firefox/i;
    var _operaRegex = /opera|opr/i;
    var _safariRegex = /safari/i;
    var _ucRegex = /ucbrowser/i;
    var _edgeRegex = /edge/i;
    var _msieEq11Regex = /rv:11\.0/i;
    var _msieLt11Regex = /msie\s\d+\.\d+/i;


    var _isMobile = _mobileBrowserRegex.test(_currentBrowser);

    var _isChrome = _chromeRegex.test(_currentBrowser);
    var _isFirefox = _firefoxRegex.test(_currentBrowser);
    var _isOpera = _operaRegex.test(_currentBrowser);
    var _isSafari = _safariRegex.test(_currentBrowser);
    var _isbrowsuc = _ucRegex.test(_currentBrowser);
    var _isMicrosoftEdge = _edgeRegex.test(_currentBrowser);
    var _isIE11 = _msieEq11Regex.test(_currentBrowser);
    var _isIELowThen11 = _msieLt11Regex.test(_currentBrowser)

    var _isIE = _isIE11 || _isIELowThen11;

    var _versionOfIE = _isIE ? _isIE11 ? _currentBrowser.match(_msieEq11Regex)[0] : _isIELowThen11 ? _currentBrowser.match(_msieLt11Regex)[0] : -1 : -1;
    if (_isIE) {
        if (_isIE11) {
            _versionOfIE = parseInt(_versionOfIE.substr(3).trim()); //IE 11
        }
        else {
            _versionOfIE = parseInt(_versionOfIE.substr(4).trim()); // < IE 11
        }
    }

    // of all _implementationDetails props only one is set to true, plus 'isMobile' is set to true if run under mobile browser
    var _implementationDetails = {
        notSupportedBrowserMessage: 'This library version does not support current browser yet',
        isMobile: _isMobile,
        chrome: _isChrome && _isSafari && !_isFirefox && !_isOpera && !_isMicrosoftEdge,
        firefox: _isFirefox && !_isChrome,
        opera: _isOpera && (_isChrome || _isOpera),
        safari: _isSafari && !_isChrome,
        uc: _isMobile && _isbrowsuc,
        microsoftEdge: _isMicrosoftEdge && (_isChrome || _isMicrosoftEdge),
        ie: _isIE && !_isChrome,

        removeUrlFragment: function() {
            setTimeout(removeUrlFragmentInternal, 1);
        },
        redirectToMobileVersion: function () {
            redirectToMobileVersionInternal();
        },
        createRedirectionToDesktopVersion: function () {
           return createRedirectionToDesktopVersionInternal();
        },
    }
    if (_isIE) {
        _implementationDetails.ieVersion = _versionOfIE
    }

    function removeUrlFragmentInternal() {
        window.history.pushState("#", "", window.location.href.substring(0, window.location.href.length - window.location.hash.length));
    }

    function redirectToMobileVersionInternal() {
        var mobileIndex = -1;

        mobileIndex = location.protocol.length;
        mobileIndex += 2;

        var mobileUrl = location.href.substring(0, mobileIndex) + "m." + location.href.substring(mobileIndex);
        location.href = mobileUrl;
    }

    function createRedirectionToDesktopVersionInternal() {
        var mobileIndex = -1;

        mobileIndex = location.protocol.length;
        mobileIndex += 2;

        var mobileUrl = location.href.substring(0, mobileIndex) + location.href.substring(mobileIndex + 2);
        return mobileUrl;
    }

    //public api
    window.activeBrowser = window.activeBrowser || {};

    window.activeBrowser.browserUtility = window.activeBrowser.browserUtility || _implementationDetails;
})(window);
