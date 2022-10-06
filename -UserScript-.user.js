// ==UserScript==
// @name         test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://forum.gamer.com.tw/B.php?*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// ==/UserScript==

(function() {
    'use strict';

    let block = document.querySelectorAll('tr ');

    for(let i = 0; i < block.length; i++){
        block[i].style.cssText = `
            display: flex; 
            background-color: red;
        `;
    }

})();