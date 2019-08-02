// import data from './dataset'
// let data = import("./dataset.js")

let secret;
let guess;
let count = 0;

$(window).on("load", () => {
    $("input[type='text']").hide();
    $("#am").hide();
    $('.game').hide();

    $('.wrapper').append("<div class='player'><input type='button' class='btn' value='Single Player' onClick='single()'><input type='button' class='btn' value='Multi Player' onCLick='multi()'></div>");

});

function single() {

    let n = Math.floor(Math.random() * 600);
    secret = data.words[n];
    console.log(secret);
    $('.player').hide("slow");
    $('#am').show("slow");
    $("input[type='text']").show("slow");
}

function multi() {
    $('.player').hide("slow");
    $('.game').show("slow");
}


$("input[type='password']").keypress(function (event) {
    if (event.which === 13) {

        secret = $(this).val().toLowerCase();
        $('.game').hide("slow");
        $("input[type='text']").show("slow");
        $("#am").show("slow");
        if (secret.length > 4 || secret.length < 4) {
            alert("Enter a 4 letter word");
            $(this).val("");
            return;
        }
        console.log(secret);
    }
});

$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {

        guess = $(this).val().toLowerCase();
        $(this).val("");
        if (guess.length > 4 || guess.length < 4) {
            alert("Enter a 4 letter word");
            $(this).val("");
            return;
        }
        console.log(guess);
        moo();
    }
});

function moo() {

    if (count != 10) {
        let cows = 0;
        let bulls = 0;
        let se = secret.split("");
        let gu = guess.split("");
        console.log(se);
        console.log(gu);

        //check if the Strings are same
        if (secret.localeCompare(guess) === 0) {
            $('h3').text("Congo you got it right!!");
            $('h3').append("<h2 class='gameOver'>GAME OVER :)</h2>");
            $('.gameOver').append("<input type='button' value='Play again' class='btn' onClick='document.location.reload(true)'>")
            return;
        }

        count++;

        //count the number of bulls
        for (let i = 0; i < 4; i++) {
            if (secret.charAt(i) === guess.charAt(i)) {
                bulls++;
                se[i] = '!';
                gu[i] = '#';
            }
        }

        //count the number of cows
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (se[i] === gu[j]) {
                    cows++;
                    se[i] = '!';
                    gu[j] = '#';
                }
            }
        }

        //print word and number of cows and bulls
        $('ol').append("<li class='name'><span name='wrd'>" + guess + "</span><span class='cows'>Cows : " + cows + "</span><span class='bulls'>Bulls : " + bulls + "</span></li>");

    }

    if (count === 10) {

        $('.game').show("slow");
        $('.game').append("<h2 class='gameOver'>GAME OVER <i class='far fa-dizzy'></i></h2>").fadeIn("slow");
        $('.game').append("<h2 class='ans'>The word is : " + secret + "</h2>").fadeIn("slow");
        $('.game').append("<input type='button' value='Play again' class='btn' onClick='document.location.reload(true)'>").fadeIn("slow");

    }

    return;
}