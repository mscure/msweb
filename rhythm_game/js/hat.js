const hat = new Tone.MetalSynth({
    envelope: {
        attack :0.01,
        decay: 0.1,
        relese: 0.3
    }
}).toDestination();

function playhat() {
    hat.triggerAttack("C1"); 
}
