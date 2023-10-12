/* eslint-disable react/prop-types */
import { TURNOS } from "../constants"
import { Square } from "./Square"

export const Turns = ({turn}) => {
  return (
    <section className="turn">
        <Square isSelected={ turn === TURNOS.X }>
          {TURNOS.X}
        </Square>

        <Square isSelected={ turn === TURNOS.O }>
          {TURNOS.O}
        </Square>
      </section>
  )
}
