window.addEventListener('DOMContentLoaded', function () {
    "use strict";

    var WELCOME_MSG = "Andrew's mom";

    var textDiv = document.querySelector('.text');
    var inputField = document.querySelector('.inputbox');
    var charboxTemplate = document.querySelector('#charbox-template');
    var defaultTitle = document.querySelector("title").innerText;
    var theBig = document.querySelector("#theBig");

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    function updateFragment(text) {
        renderText(text)
        // Don't spam the browser history & strip query strings.
        // window.location.replace(location.origin + '/#' + encodeURIComponent(text));
        // shareLinkField.value = location.origin + '/' + location.hash;
    }

    function clearChars() {
        theBig.innerHTML = "";
    }

    function renderText(text) {
        // Return a space as typing indicator if text is empty.
        var fontSize = Math.max(6, Math.min(150 / text.length, 30));
        theBig.style.fontSize = fontSize + 'vw'
        clearChars();

        var finalHtml = ""
        text.split(/.*?/u).forEach(function (chr) {


            if (chr.match(/[0-9]/i)) {
                finalHtml = finalHtml + "<span class='number'>" + chr + "</span>"
            } else if (!chr.match(/[a-z]/i)) {
                finalHtml = finalHtml + "<span class='symbol'>" + chr + "</span>"
            } else {
                finalHtml = finalHtml + chr
            }
        });
        console.log("fh:", finalHtml)
        theBig.innerHTML = finalHtml

        // // Don't jump the cursor to the end
        // if (inputField.value !== text) {
        //     inputField.value = text;
        // }
    }

    function onInput(evt) {
        updateFragment(evt.target.value);
    }

    function enterInputMode(evt) {
        renderText(' ');
        inputField.focus();
    }



    inputField.addEventListener('input', onInput, false);
    textDiv.addEventListener('click', enterInputMode, false);
    window.addEventListener('keypress', enterInputMode, false);
    window.addEventListener('hashchange', renderText, false);

    if (!location.hash) {
        updateFragment(WELCOME_MSG);
    }

    renderText();
    initAnalytics();
});
