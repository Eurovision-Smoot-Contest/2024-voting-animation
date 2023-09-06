const delay = ms => new Promise(res => setTimeout(res, ms));

function animateJuryScreen() {
    // Country points
    (async () => {
        for (let i = 0; i < 10; i++) {
            const element = $(`#fjs-cp-${i}`);
            element.css("width", "32px");
            element.css("height", `${i !== 9 ? 32 : 25}px`);
        }
        await delay(750);
        for (let i = 9; i >= 0; i--) {
            const element = $(`#fjs-cp-${i}`).children();
            element.css("transform", "translateX(0)");
            await delay(25);
        }
    })();
    (async () => {
        for (let i = 8; i >= 0; i--) {
            const element = $(`#fjs-p-${i}`);
            element.css("width", "460px");
            await delay(250);
        }
    })();
}

function animate10PointsToFullScoreboard() {
    $("#fjs-hosts-screen").css("width", "0");
    $("#fjs-hosts-screen").css("border", "solid #030352 0");
}

const toDo = [animateJuryScreen, animate10PointsToFullScoreboard];
let index = 0;
$(document).on("keypress", e => {
    if (e.which === 32) { // SPACE BAR
        if (index < toDo.length) {
            toDo[index]();
            index ++;
        }
    }
});