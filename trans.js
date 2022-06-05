var match;
var chords =
    ["C","C#","D","D#","E","F","F#","G","G#","A","Bb","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
var chordRegex = /A#|C#|D#|F#|G#|Ab|Bb|Db|Eb|Gb|A|B|C|D|E|F|G/g;

$('#transposeUp').click(function() {
    $('pre').each(function() {
        var currentChord = $(this).html();
        var output = "";
        var parts = currentChord.split(chordRegex);
        var index = 0;
        while (match = chordRegex.exec(currentChord))
        {
            var chordIndex = chords.indexOf(match[0]);
            output += parts[index++] + chords[chordIndex+1];
        }
        output += parts[index];
        $(this).html(output);
    });
});

$('#transposeDown').click(function() {
    $('pre').each(function() {
        var currentChord = $(this).html();
        var output = "";
        var parts = currentChord.split(chordRegex);
        var index = 0;
        while (match = chordRegex.exec(currentChord))
        {
            var chordIndex = chords.indexOf(match[0],1);
            output += parts[index++] + chords[chordIndex-1];
        }
        output += parts[index];
        $(this).html(output);
    });
});
