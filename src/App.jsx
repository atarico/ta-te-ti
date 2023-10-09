import confetti from "canvas-confetti"
import { useState } from "react"

const TURNOS = {
  X: 'x',
  O: 'o',
}

// eslint-disable-next-line react/prop-types
const Square = ({children, isSelected, updateBoard, index}) =>{

  const className = `square ${ isSelected ? 'is-selected': '' }`

  const handleClick = () =>{
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board, setBoard] = useState(
      Array(9).fill(null)
    )

    const [turn, setTurn] = useState(TURNOS.X)

    //null es que no hay ganador, false es que hay un empate
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) =>{
      // revisamos todas las combinaciones ganadoras para ver si X u O gano
      for (const combo of WINNER_COMBOS){
        const [a, b, c] = combo
        if(
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
          ) {
            return boardToCheck[a]
          }
      }
      // sino hay ganador
      return null
    }


    const resetGame = () =>{
      setBoard(Array(9).fill(null))
      setTurn(TURNOS.X)
      setWinner(null)
    }

    const checkEndGame = (newBoard) =>{

      return newBoard.every((square) => square !== null)

    }




    const updateBoard = (index)=>{

      // no se actualiza la posición si ya tiene algo
      if(board[index] || winner) return

      //actualiza el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)

      // cambia el turno
      const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
      setTurn(newTurn)

      //revisar si hay un ganador
      const newWinner = checkWinner(newBoard)
      if(newWinner){
        setWinner(newWinner) 
        confetti ()
        // La actualización de los estados es async, por ende no bloquea la ejecución del alert()
        // alert(`El ganador es: ${newWinner}`) -> sale antes de la actualización del estado.
        // console.log(winner); -> si quiero ver el winner, me sale null, porque como la actualización del estado es async carga el console.log antes de que se actualice
      }else if (checkEndGame(newBoard)){
        setWinner(false)
      }
    }

  return (
    <main className="board">
      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_, index)=>{
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={ turn === TURNOS.X }>
          {TURNOS.X}
        </Square>

        <Square isSelected={ turn === TURNOS.O }>
          {TURNOS.O}
        </Square>
      </section>

      <section>

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Ganó:'
                  }
                </h2>

                <header className="win">
                  { winner && <Square> { winner } </Square> }
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }

      </section>
    </main>
  )
}

export default App
