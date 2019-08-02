$(document).ready(() => {
    $('#title').focus();
    // $('#text').autosize();
    autosize($('#text'));
    window.autosize = window.autosize ? window.autosize : require('autosize');
});