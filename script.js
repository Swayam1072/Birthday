/* =========================================================
   BIRTHDAY WEBSITE - COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. FLOATING HEARTS
   ========================================================= */

const heartsContainer =
    document.getElementById("hearts-container");


function createFloatingHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";


    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "✨",
        "🌸"
    ];


    heart.innerHTML =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            15 +
            Math.random() * 25
        ) + "px";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 7
        ) + "s";


    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/*
   Create floating hearts continuously.
*/

setInterval(
    createFloatingHeart,
    700
);



/* =========================================================
   2. BACKGROUND HEARTS START
   ========================================================= */

for (let i = 0; i < 5; i++) {

    setTimeout(
        createFloatingHeart,
        i * 300
    );

}



/* =========================================================
   3. MUSIC PLAYER
   ========================================================= */

const music =
    document.getElementById("birthdayMusic");


const musicBtn =
    document.getElementById("musicBtn");


let musicPlaying = false;


function toggleMusic() {

    if (!music) {
        return;
    }


    if (musicPlaying) {

        music.pause();

        musicPlaying = false;


        if (musicBtn) {

            musicBtn.innerHTML = "🎵";

        }

    }

    else {

        music.play()

            .then(() => {

                musicPlaying = true;


                if (musicBtn) {

                    musicBtn.innerHTML = "🔊";

                }

            })

            .catch(() => {

                alert(
                    "Please add birthday.mp3 inside the music folder."
                );

            });

    }

}



/* =========================================================
   4. START SURPRISE
   ========================================================= */

function startSurprise() {

    createConfetti();


    const gameSection =
        document.getElementById("game");


    if (gameSection) {

        gameSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



/* =========================================================
   5. PHOTO PUZZLE
   ========================================================= */


/*
   Puzzle positions:

       0 | 1 | 2
       ---------
       3 | 4 | 5
       ---------
       6 | 7 | 8
*/


let puzzlePieces = [

    0, 1, 2,
    3, 4, 5,
    6, 7, 8

];


let selectedPiece = null;


let puzzleMoves = 0;


const puzzleBoard =
    document.getElementById("photoPuzzle");



/* =========================================================
   CREATE PHOTO PUZZLE
   ========================================================= */

function createPhotoPuzzle() {

    if (!puzzleBoard) {
        return;
    }


    puzzleBoard.innerHTML = "";


    puzzlePieces.forEach(
        (
            pieceNumber,
            currentPosition
        ) => {


            const piece =
                document.createElement("div");


            piece.className =
                "photo-piece";


            piece.dataset.original =
                pieceNumber;


            /*
                Find original row and column.
            */

            const originalRow =
                Math.floor(
                    pieceNumber / 3
                );


            const originalColumn =
                pieceNumber % 3;


            /*
                YOUR JPEG PUZZLE PHOTO

                Make sure this file exists:

                images/puzzle-photo.jpeg
            */

            piece.style.backgroundImage =
                "url('images/puzzle-photo.jpeg')";


            /*
                The original image is divided
                into a 3 x 3 grid.
            */

            piece.style.backgroundSize =
                "300% 300%";


            /*
                Show the correct part of the image.
            */

            piece.style.backgroundPosition =
                `${originalColumn * 50}% ${originalRow * 50}%`;


            /*
                Clicking a puzzle piece.
            */

            piece.addEventListener(
                "click",
                function () {

                    selectPhotoPiece(
                        currentPosition
                    );

                }
            );


            puzzleBoard.appendChild(
                piece
            );

        }
    );


    updateCorrectPieces();

}



/* =========================================================
   SELECT PUZZLE PIECE
   ========================================================= */

function selectPhotoPiece(position) {


    /*
        First click.
    */

    if (
        selectedPiece === null
    ) {


        selectedPiece =
            position;


        const pieces =
            document.querySelectorAll(
                ".photo-piece"
            );


        if (pieces[position]) {

            pieces[position]
                .classList
                .add("selected");

        }


        return;

    }



    /*
        Click the same piece again.
    */

    if (
        selectedPiece === position
    ) {

        selectedPiece = null;

        createPhotoPuzzle();

        return;

    }



    /*
        Swap the pieces.
    */

    const temp =
        puzzlePieces[
            selectedPiece
        ];


    puzzlePieces[
        selectedPiece
    ] =
        puzzlePieces[position];


    puzzlePieces[position] =
        temp;


    puzzleMoves++;


    selectedPiece = null;



    /*
        Update moves counter.
    */

    const movesElement =
        document.getElementById(
            "puzzleMoves"
        );


    if (movesElement) {

        movesElement.innerText =
            "Moves: " +
            puzzleMoves;

    }



    createPhotoPuzzle();


    checkPhotoPuzzle();

}



/* =========================================================
   CHECK PHOTO PUZZLE
   ========================================================= */

function checkPhotoPuzzle() {


    const solved =
        puzzlePieces.every(
            (
                piece,
                index
            ) => {

                return piece === index;

            }
        );


    if (!solved) {

        return;

    }



    if (puzzleBoard) {

        puzzleBoard
            .classList
            .add("solved");

    }



    const message =
        document.getElementById(
            "photoPuzzleMessage"
        );


    if (message) {

        message.innerHTML =

            `🎉 You did it! ❤️<br>
            You found all the pieces...
            just like you found a special
            place in my heart. 💕`;

    }



    createConfetti();



    setTimeout(() => {

        showFinalPuzzleMessage();

    }, 1800);

}



/* =========================================================
   MARK CORRECT PIECES
   ========================================================= */

function updateCorrectPieces() {


    const pieces =
        document.querySelectorAll(
            ".photo-piece"
        );


    pieces.forEach(
        (
            piece,
            position
        ) => {


            const original =
                Number(
                    piece.dataset.original
                );


            if (
                original === position
            ) {

                piece.classList.add(
                    "correct"
                );

            }

        }
    );

}



/* =========================================================
   SHUFFLE PHOTO PUZZLE
   ========================================================= */

function shufflePhotoPuzzle() {


    selectedPiece = null;

    puzzleMoves = 0;



    /*
        Fisher-Yates shuffle.
    */

    for (
        let i =
            puzzlePieces.length - 1;

        i > 0;

        i--
    ) {


        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temp =
            puzzlePieces[i];


        puzzlePieces[i] =
            puzzlePieces[
                randomIndex
            ];


        puzzlePieces[
            randomIndex
        ] =
            temp;

    }



    /*
        Don't allow an already-solved
        puzzle after shuffling.
    */

    if (
        puzzlePieces.every(
            (
                piece,
                index
            ) => {

                return piece === index;

            }
        )
    ) {

        shufflePhotoPuzzle();

        return;

    }



    const movesElement =
        document.getElementById(
            "puzzleMoves"
        );


    if (movesElement) {

        movesElement.innerText =
            "Moves: 0";

    }



    const message =
        document.getElementById(
            "photoPuzzleMessage"
        );


    if (message) {

        message.innerText =
            "Arrange the pieces to reveal our special memory ❤️";

    }



    if (puzzleBoard) {

        puzzleBoard
            .classList
            .remove("solved");

    }



    createPhotoPuzzle();

}



/* =========================================================
   PUZZLE HINT
   ========================================================= */

function showPuzzleHint() {


    const pieces =
        document.querySelectorAll(
            ".photo-piece"
        );


    let wrongPieces = [];


    pieces.forEach(
        (
            piece,
            position
        ) => {


            const original =
                Number(
                    piece.dataset.original
                );


            if (
                original !== position
            ) {

                wrongPieces.push(
                    piece
                );

            }

        }
    );


    if (
        wrongPieces.length === 0
    ) {

        return;

    }



    const randomPiece =
        wrongPieces[
            Math.floor(
                Math.random() *
                wrongPieces.length
            )
        ];


    randomPiece
        .classList
        .add("hint");


    setTimeout(() => {

        randomPiece
            .classList
            .remove("hint");

    }, 1000);

}



/* =========================================================
   FINAL PUZZLE MESSAGE
   ========================================================= */

function showFinalPuzzleMessage() {


    const message =
        document.getElementById(
            "photoPuzzleMessage"
        );


    if (message) {

        message.innerHTML =

            `❤️ This picture is beautiful,
            but the memory behind it is even
            more special.
            <br><br>
            Now keep scrolling...
            your final surprise is waiting
            for you. 🎁`;

    }



    setTimeout(() => {


        const finalSection =
            document.getElementById(
                "final"
            );


        if (finalSection) {

            finalSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }, 3500);

}



/* =========================================================
   INITIALIZE PUZZLE
   ========================================================= */

if (puzzleBoard) {

    createPhotoPuzzle();

    shufflePhotoPuzzle();

}



/* =========================================================
   6. CATCH MY HEARTS GAME
   ========================================================= */

let score = 0;

let gameRunning = false;



function startHeartGame() {


    score = 0;

    gameRunning = true;



    const scoreElement =
        document.getElementById(
            "score"
        );


    if (scoreElement) {

        scoreElement.innerText =
            score;

    }



    const button =
        document.querySelector(
            ".start-game"
        );


    if (button) {

        button.style.display =
            "none";

    }



    /*
        Start creating hearts.
    */

    spawnHeart();

}



/* =========================================================
   SPAWN HEART
   ========================================================= */

function spawnHeart() {


    if (!gameRunning) {

        return;

    }



    const area =
        document.getElementById(
            "heartGame"
        );


    if (!area) {

        return;

    }



    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "game-heart";


    const heartTypes = [

        "❤️",
        "💗",
        "💖",
        "💕",
        "💘"

    ];


    heart.innerHTML =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];



    const maxX =
        Math.max(
            20,
            area.clientWidth - 60
        );


    const maxY =
        Math.max(
            100,
            area.clientHeight - 80
        );



    heart.style.left =
        Math.random() *
        maxX +
        "px";


    heart.style.top =
        (
            70 +
            Math.random() *
            (
                maxY - 70
            )
        ) +
        "px";



    heart.addEventListener(
        "click",
        function () {


            score++;


            const scoreElement =
                document.getElementById(
                    "score"
                );


            if (scoreElement) {

                scoreElement.innerText =
                    score;

            }



            heart.remove();



            if (
                score >= 10
            ) {


                gameRunning =
                    false;


                const button =
                    document.querySelector(
                        ".start-game"
                    );


                if (button) {

                    button.style.display =
                        "block";

                    button.innerText =
                        "🎉 You Won!";

                }



                createConfetti();


                setTimeout(() => {

                    alert(
                        "You caught all my hearts! ❤️"
                    );

                }, 200);


                return;

            }



            spawnHeart();

        }
    );



    area.appendChild(
        heart
    );



    /*
        Remove heart if not clicked.
    */

    setTimeout(() => {


        if (
            heart.parentElement
        ) {


            heart.remove();



            if (gameRunning) {

                spawnHeart();

            }

        }

    }, 1800);

}



/* =========================================================
   7. FINAL GIFT
   ========================================================= */

function openGift() {


    const modal =
        document.getElementById(
            "loveModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }



    createConfetti();



    /*
        Extra floating hearts.
    */

    for (
        let i = 0;
        i < 30;
        i++
    ) {


        setTimeout(
            createFloatingHeart,
            i * 80
        );

    }

}



/* =========================================================
   8. CLOSE FINAL GIFT
   ========================================================= */

function closeModal() {


    const modal =
        document.getElementById(
            "loveModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}



/* =========================================================
   9. CONFETTI
   ========================================================= */

function createConfetti() {


    const emojis = [

        "🎉",
        "💖",
        "💕",
        "✨",
        "🎊",
        "❤️",
        "🌸",
        "💗"

    ];



    for (
        let i = 0;
        i < 35;
        i++
    ) {


        const confetti =
            document.createElement(
                "div"
            );


        confetti.innerHTML =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() *
            100 +
            "%";


        confetti.style.top =
            "-30px";


        confetti.style.fontSize =
            (
                15 +
                Math.random() * 25
            ) +
            "px";


        confetti.style.zIndex =
            "3000";


        confetti.style.pointerEvents =
            "none";


        document.body.appendChild(
            confetti
        );



        const duration =
            2000 +
            Math.random() * 3000;



        confetti.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720}deg)`,

                    opacity: 0
                }

            ],

            {

                duration:
                    duration,

                easing:
                    "ease-out"

            }

        );



        setTimeout(() => {

            confetti.remove();

        }, duration);

    }

}



/* =========================================================
   10. NEW VIDEO GALLERY
   ========================================================= */


/*
   Featured video:

   videos/birthday-memory.mp4
*/


const memoryVideo =
    document.getElementById(
        "memoryVideo"
    );


const videoPlayButton =
    document.getElementById(
        "videoPlayButton"
    );


const videoOverlay =
    document.getElementById(
        "videoOverlay"
    );



/* =========================================================
   TOGGLE VIDEO PLAY / PAUSE
   ========================================================= */

function toggleMemoryVideo() {


    if (!memoryVideo) {

        return;

    }



    if (
        memoryVideo.paused
    ) {


        memoryVideo.play()

            .then(() => {


                if (videoPlayButton) {

                    videoPlayButton.innerHTML =
                        "❚❚";

                }

            })

            .catch(() => {

                console.log(
                    "Video could not be played."
                );

            });

    }

    else {


        memoryVideo.pause();


        if (videoPlayButton) {

            videoPlayButton.innerHTML =
                "▶";

        }

    }

}



/* =========================================================
   VIDEO PLAY EVENT
   ========================================================= */

if (memoryVideo) {


    memoryVideo.addEventListener(
        "play",
        function () {


            if (videoPlayButton) {

                videoPlayButton.innerHTML =
                    "❚❚";

            }

        }
    );



    memoryVideo.addEventListener(
        "pause",
        function () {


            if (videoPlayButton) {

                videoPlayButton.innerHTML =
                    "▶";

            }

        }
    );



    memoryVideo.addEventListener(
        "ended",
        function () {


            if (videoPlayButton) {

                videoPlayButton.innerHTML =
                    "▶";

            }

        }
    );

}



/* =========================================================
   11. FULLSCREEN VIDEO
   ========================================================= */

function openVideoFullscreen(event) {


    /*
        Prevent the gallery card from
        receiving the same click.
    */

    if (event) {

        event.stopPropagation();

    }



    if (!memoryVideo) {

        return;

    }



    if (
        memoryVideo.requestFullscreen
    ) {


        memoryVideo.requestFullscreen();

    }

    else if (
        memoryVideo.webkitRequestFullscreen
    ) {


        memoryVideo.webkitRequestFullscreen();

    }

}



/* =========================================================
   12. PHOTO LIGHTBOX
   ========================================================= */

function openPhoto(
    imagePath,
    caption
) {


    const lightbox =
        document.getElementById(
            "photoLightbox"
        );


    const image =
        document.getElementById(
            "lightboxImage"
        );


    const captionElement =
        document.getElementById(
            "lightboxCaption"
        );


    if (
        !lightbox ||
        !image ||
        !captionElement
    ) {

        return;

    }



    image.src =
        imagePath;


    image.alt =
        caption;


    captionElement.innerText =
        caption;


    lightbox.classList.add(
        "show"
    );


    /*
        Stop page scrolling while
        lightbox is open.
    */

    document.body.style.overflow =
        "hidden";

}



/* =========================================================
   13. CLOSE PHOTO LIGHTBOX
   ========================================================= */

function closePhoto() {


    const lightbox =
        document.getElementById(
            "photoLightbox"
        );


    if (!lightbox) {

        return;

    }



    lightbox.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}



/* =========================================================
   14. ESC KEY CLOSES LIGHTBOX
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key === "Escape"
        ) {


            closePhoto();


            closeModal();

        }

    }
);



/* =========================================================
   15. CLICK OUTSIDE PHOTO TO CLOSE
   ========================================================= */

const photoLightbox =
    document.getElementById(
        "photoLightbox"
    );


if (photoLightbox) {


    photoLightbox.addEventListener(
        "click",
        function (event) {


            if (
                event.target ===
                photoLightbox
            ) {


                closePhoto();

            }

        }
    );

}



/* =========================================================
   16. CLICK OUTSIDE FINAL MODAL
   ========================================================= */

const loveModal =
    document.getElementById(
        "loveModal"
    );


if (loveModal) {


    loveModal.addEventListener(
        "click",
        function (event) {


            if (
                event.target ===
                loveModal
            ) {


                closeModal();

            }

        }
    );

}



/* =========================================================
   17. PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
            Make sure puzzle is ready.
        */

        if (puzzleBoard) {

            createPhotoPuzzle();

            shufflePhotoPuzzle();

        }


        /*
            Start a few floating hearts.
        */

        for (
            let i = 0;
            i < 5;
            i++
        ) {


            setTimeout(
                createFloatingHeart,
                i * 400
            );

        }

    }
);