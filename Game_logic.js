const buttons = Array.from(document.getElementsByClassName('selectable'))
const user_results = document.querySelector('#user-results')
const ai_results = document.querySelector('#ai-results')
const won_text = document.querySelector('#won-text')
const the_game = document.querySelector('.game-container')
const display_results = document.querySelector('.winner-container')
const display_score = document.querySelector('#score')
const reset_game = document.querySelector('#reset')

//winning combination criteria
const WINNER_COMBO = [
    {
        'selected': 'rock',
        'beats': 'scissors',
        'icon': '👊'
    },
    {
        'selected': 'paper',
        'beats': 'rock',
        'icon': '👋' 
    },
    {
        'selected': 'scissors',
        'beats': 'paper',
        'icon': '✌️'
    },
]

let PLAYER_SCORE = 0

buttons.forEach( button => {
    button.addEventListener('click', e => {
        switch(e.target.id) {
            case 'rock':
                calculateWinner(WINNER_COMBO[0], ai_selected())
                break;
            case 'paper':
                calculateWinner(WINNER_COMBO[1], ai_selected())
                break;
            case 'scissors':
                calculateWinner(WINNER_COMBO[2], ai_selected())
                break;
        }
    })
})

//Ai functionality
function ai_selected() {
    const randomIndec = Math.floor(Math.random() * WINNER_COMBO.length)
    return WINNER_COMBO[randomIndec]
}

//winner function
function calculateWinner(user, ai) {
    if(user.beats == ai.selected) {
        display_score.innerHTML = PLAYER_SCORE += 1
        updateUI(user, ai, 'you win')
        return
    }
    if(user.selected == ai.selected) {
        display_score.innerHTML = PLAYER_SCORE 
        updateUI(user, ai, 'draw')
        return
    }
    updateUI(user, ai, 'you lose')
}

//updating the UI after winning or losing
function updateUI(user, ai, outcome_text) {
    user_results.innerHTML= user.icon
    user_results.classList.add('${user.selected}')

    ai_results.innerHTML = ai.icon
    ai_results.classList.add('${ai.selected}')
    
    won_text.innerHTML = outcome_text
    the_game.classList.add('hide')
    display_results.classList.remove('hide')
}

reset_game.addEventListener('click', () => {
    the_game.classList.remove('hide')
    display_results.classList.add('hide')
    user_results.className= 'selectable'
    ai_results.className= 'selectable'
})