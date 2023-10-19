import confetti from "canvas-confetti"
import { useState } from "react"

import { Board } from "./components/Board"
import { Turns } from "./components/Turns"
import { WinnerModal } from "./components/WinnerModal"
import { TURNOS } from "./constants"
import { resetGameToLocalStorages, saveGameToLocalStorage } from "./logic/storage"
import { checkEndGameFrom, checkWinnerFrom } from "./logic/win-end"



function App() {

  const [board, setBoard] = useState( ()=>{
    const boardFromStorage = window.localStorage.getItem("board")

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    
  } )

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNOS.X
  })

    //null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)


  const resetGame = () =>{
      setBoard(Array(9).fill(null))
      setTurn(TURNOS.X)
      setWinner(null)
      resetGameToLocalStorages()
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
      
      // Guardar partida
    saveGameToLocalStorage({
      board: newBoard,
      turn: newTurn
    })

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)


      // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      setWinner(newWinner) 
      confetti ()
      // La actualización de los estados es async, por ende no bloquea la ejecución del alert()
      // alert(`El ganador es: ${newWinner}`) -> sale antes de la actualización del estado.
      // console.log(winner); -> si quiero ver el winner, me sale null, porque como la actualización del estado es async carga el console.log antes de que se actualice
    }else if (checkEndGameFrom(newBoard)){
        setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}>Reset del juego</button>
     
      <Board board={ board } updateBoard={ updateBoard } />
      <Turns turn={ turn }/>
      <WinnerModal winner={ winner } resetGame={ resetGame }/>

      
    </main>
  )
}

export default App
