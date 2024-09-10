$(document).ready(function() {
    // Redirect to game.html when Play button is clicked
    $('#playButton').click(function() {
        window.location.href = 'game.html';
    });

    // Back to main page
    $('#backButton').click(function() {
        window.location.href = 'index.html';
    });

    const cells = document.querySelectorAll('[data-cell]');
    const gameStatus = $('#gameStatus');
    const restartButton = $('#restartButton');
    let isPlayerOneTurn = true;
    let gameActive = true;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].innerText === (isPlayerOneTurn ? 'X' : 'O');
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.innerText === 'X' || cell.innerText === 'O');
    }

    function handleClick(e) {
        if (!gameActive) return;
        const cell = e.target;
        if (cell.innerText !== '') return;

        cell.innerText = isPlayerOneTurn ? 'X' : 'O';
        if (checkWin()) {
            gameStatus.text(`Player ${isPlayerOneTurn ? 'One' : 'Two'} Wins!`);
            gameActive = false;
            restartButton.show();
        } else if (checkDraw()) {
            gameStatus.text('It\'s a Draw!');
            gameActive = false;
            restartButton.show();
        } else {
            isPlayerOneTurn = !isPlayerOneTurn;
            gameStatus.text(`Player ${isPlayerOneTurn ? 'One' : 'Two'}'s Turn`);
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    // Restart Game
    restartButton.click(function() {
        cells.forEach(cell => {
            cell.innerText = '';
        });
        isPlayerOneTurn = true;
        gameStatus.text('Player One\'s Turn');
        gameActive = true;
        restartButton.hide();
    });
});
