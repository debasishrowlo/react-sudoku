import { useState, MouseEvent } from "react"
import classnames from "classnames"

const App = () => {
  const [grid, setGrid] = useState([
    6, 8, 7, 0, 0, 4, 9, 1, 0,
    9, 1, 3, 0, 0, 0, 0, 0, 0,
    2, 5, 4, 7, 0, 0, 0, 0, 0,
    0, 4, 5, 0, 9, 0, 0, 0, 1,
    0, 0, 6, 1, 0, 5, 0, 4, 0,
    0, 0, 0, 0, 0, 0, 2, 0, 0,
    4, 0, 0, 5, 6, 0, 0, 3, 0,
    0, 0, 2, 4, 7, 3, 0, 9, 0,
    5, 0, 8, 9, 2, 1, 7, 0, 4,
  ])
  const [solution, setSolution] = useState<{ [key:number]: number[] }>({})
  const [activeCell, setActiveCell] = useState<number|null>(null)

  const changeNumber = (num:number) => {
    if (activeCell === null) { return }

    const nums = solution[activeCell]

    if (solution[activeCell]) {
      const numIndex = nums.findIndex(n => n === num)

      if (numIndex === -1) {
        setSolution({
          ...solution,
          [activeCell]: [...nums, num],
        })
      } else {
        const remainingNums = [
          ...nums.slice(0, numIndex),
          ...nums.slice(numIndex + 1)
        ]

        if (remainingNums.length === 0) {
          const { [activeCell]: activeCellKey, ...restSolutions } = solution
          setSolution({ ...restSolutions })
        } else {
          setSolution({
            ...solution,
            [activeCell]: [...remainingNums],
          })
        }
      }
    } else {
      setSolution({
        ...solution,
        [activeCell]: [num],
      })
    }
  }

  const selectCell = (cellIndex:number) => {
    if (grid[cellIndex] !== 0) {
      return
    }

    setActiveCell(cellIndex)
  }
    
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center">
        <div className="flex flex-wrap w-[500px]">
          {grid.map((sga, i) => {
            const isHint = sga !== 0  
            const isActive = activeCell === i
            const cellsPerRow = 9

            let value = sga
            let solutions:number[] = []
            if (solution[i]) {
              solutions = solution[i]
            }
            if (solutions.length === 1) {
              value = solutions[0]
            }

            const isEmpty = value === 0 // TODO: Refactor this to use empty string

            const hasSingleValue = isHint || solutions.length === 1

            return (
              <button
                type="button"
                className={classnames("border border-white aspect-square", {
                  "bg-white text-indigo-950": isActive,
                  "text-white": !isActive,
                  "bg-white/10": isHint,
                })}
                style={{ width: `${100 / cellsPerRow}%`}}
                onClick={() => selectCell(i)}
                key={i}
              >
                {hasSingleValue ? (
                  <span className={classnames("text-20", { "opacity-0": isEmpty })}>
                    {value}
                  </span>
                ) : (
                  <div className="flex flex-wrap">
                    {Array.from(Array(9).keys()).map(key => {
                      const value = key + 1
                      const isSelected = solutions.includes(value)

                      return (
                        <div className={classnames("text-12 w-1/3", {
                          "opacity-0": !isSelected,
                        })}>
                          {value}
                        </div>
                      )
                    })}
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <div className="ml-4">
          {Array.from(Array(10).keys()).map((key) => {
            if (key === 0) {
              return null
            }

            let solutions:number[] = []
            if (solution[activeCell]) {
              solutions = solution[activeCell]
            }

            const isSelected = solutions.includes(key)

            return (
              <button 
                type="button" 
                className={classnames("w-[50px] mt-1.5 block first:mt-0 border border-white rounded aspect-square", {
                  "bg-white text-indigo-950 ": isSelected,
                  "text-white": !isSelected,
                })}
                onClick={() => changeNumber(key)}
                key={key}
              >
                <span 
                  className={classnames({ "opacity-0": key === 0 })}
                >
                  {key}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App