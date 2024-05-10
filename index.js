document.addEventListener("DOMContentLoaded", () => {
    const restartBtn = document.getElementById("restartBtn");
    const boxes = document.querySelectorAll(".box");
    const winnerAlert = document.getElementById("winnerAlert");
    const winingPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    console.log(boxes);

    var x_Player = "X";
    var o_Player = "O";
    var table = Array(9).fill(null);
    var currentPlayer = x_Player;
    var gameOver = false;

    restartBtn.addEventListener('click', (e) => {
        e.preventDefault;

        gameOver = false;
        table = Array(9).fill(null);
        boxes.forEach((box => {
            box.innerHTML = '';
            winnerAlert.innerHTML = '';
            box.classList.remove("winner-box");
        }))
    })

    boxes.forEach((box) => box.addEventListener('click', (e) => {
        e.preventDefault;
        let boxIndex = parseInt(e.target.dataset.index);

        if (table[boxIndex] == null) {
            if (gameOver == false) {
                if (currentPlayer == x_Player) {
                    table[boxIndex] = x_Player;
                    box.innerText = x_Player;
                    currentPlayer = o_Player;
                } else {
                    table[boxIndex] = o_Player;
                    box.innerText = o_Player;
                    currentPlayer = x_Player;
                }
                checkWinner();
            }
        }
    }));

    function checkWinner() {
        for (let i = 0; i < winingPatterns.length; i++) {
            let [a, b, c] = winingPatterns[i];

            if (table[a] && table[a] == table[b] && table[a] == table[c]) {/* 
                alert(`Ganó ${table[a]}.`); */
                winnerAlert.innerHTML = `<span>${table[a]}</span> has won!`;
                gameOver = true;

                winingPatterns[i].forEach((box) => {
                    boxes[box].classList.add("winner-box");
                })
            }
        }

        if (isDraw()) {
            winnerAlert.innerHTML = `It's a draw!`;
            gameOver = true;
        }
    }

    function isDraw() {
        let filledBoxes = 0;

        table.forEach((box) => {
            if (box !== null) {
                filledBoxes++;
            }
        })

        return (filledBoxes == 9) ? true : false;
    }

});
