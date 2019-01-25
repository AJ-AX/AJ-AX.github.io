var editor;
var question;
var answer;

var current_question = 0;

var data = [
    {
        question: "data/question1.txt",
        answer: "data/answer1.txt",
        explanation: "https://hope.simons-rock.edu/~mbarsky/intro18/tutorials/loops/every_nth_character.mp4",
    },
    {
        question: "data/question2.txt",
        answer: "data/answer2.txt",
        explanation: "https://hope.simons-rock.edu/~mbarsky/intro18/tutorials/loops/find_letter_ntimes.mp4"
    },
    {
        question: "data/question3.txt",
        answer: "data/answer3.txt",
        explanation: "https://hope.simons-rock.edu/~mbarsky/intro18/tutorials/loops/collatz_steps.mp4"
    },
    {
        question: "data/question4.txt",
        answer: "data/answer4.txt",
        explanation: "data/extremely-important.mp4"
    },
    {
        question: "data/question5.txt",
        answer: "data/answer5.txt",
        explanation: "data/extremely-important.mp4"
    },
    {
        question: "data/question6.txt",
        answer: "data/answer6.txt",
        explanation: "data/extremely-important.mp4"
    },
    {
        question: "data/question7.txt",
        answer: "data/answer7.txt",
        explanation: "https://hope.simons-rock.edu/~mbarsky/intro18/tutorials/loops/add_underscores.mp4"
    },
    {
        question: "data/question8.txt",
        answer: "data/answer8.txt",
        explanation: "https://hope.simons-rock.edu/~mbarsky/intro18/tutorials/loops/digital_sum.mp4"
    },
    {
        question: "data/question9.txt",
        answer: "data/answer9.txt",
        explanation: "data/extremely-important.mp4"
    },
    {
        question: "data/question10.txt",
        answer: "data/answer10.txt",
        explanation: "data/extremely-important.mp4"
    }
];

var q_data = [];
var a_data = [];

function load_all() {
    for (var sd = 0; sd < data.length; sd++) {
        $.get(data[sd].question, function (data) {
            q_data.push(data);
        }, 'text');

        $.get(data[sd].answer, function (data) {
            a_data.push(data);
        }, 'text');
    }
}

function hide_video() {
    $(editor.getWrapperElement()).show();
    $("#videoHide").hide();
    document.getElementById("videoHide").pause();
    document.getElementById("buttons-div").style.marginTop = "0px";
}

function reset_question() {
    hide_video();
    editor.getDoc().setValue(q_data[current_question]);
}

function load_answer() {
    hide_video();
    editor.getDoc().setValue(a_data[current_question]);
}

function show_video() {
    $(editor.getWrapperElement()).hide();
    //$("#vid-source").attr("src", data[current_question].explanation);
    document.getElementById("videoHide").src = data[current_question].explanation;
    $("#videoHide").show();
    document.getElementById("buttons-div").style.marginTop = "10px";
}


// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
    var prog = editor.getValue();
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead });
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function (mod) {
        console.log('success');
    },
        function (err) {
            console.log(err.toString());
        });
}

$(function () {
    $("#videoHide").hide();
    load_all();
    editor = CodeMirror.fromTextArea(yourcode, {
        mode: "python",
        lineNumbers: true,
        theme: "mbo"
    });
    editor.setSize("100%", "60%");

    $(".navbutton").click(function () {
        current_question = parseInt($(this).attr('id'), 10);
        hide_video();
        reset_question();
    });
});