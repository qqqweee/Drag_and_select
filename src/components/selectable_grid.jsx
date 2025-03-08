import React, { useCallback } from 'react'
import { useState } from 'react'
const Selectable_grid = ({ rows = 10, col = 10 }) => {
    const [ismousedown, setismousedown] = useState(false)
    const [selected, setselected] = useState([])

    const handlemouseDown = (boxNumber)=>{
        setismousedown(true)
        setselected([boxNumber])
    }
    const handlemouseEnter = useCallback(
        (boxNumber)=>{
            if(ismousedown){
                const stratbox = selected[0]     // Math.min(selected[0],boxNumber)
                const endbox =   boxNumber       //   Math.max(selected[0],boxNumber)
                const startrow = Math.floor((stratbox-1)/col)
                const startcol = (stratbox-1) % col
                const endrow  = Math.floor((endbox-1)/col)
                const endcol=(endbox-1) % col
                const minrow =  Math.min(startrow,endrow)
                const maxrow = Math.max(startrow,endrow)
                const mincol = Math.min(startcol,endcol)
                const maxcol = Math.max(startcol,endcol)

                const newselected = []

                for(let i = minrow;i<=maxrow;i++){
                    for(let c = mincol;c<=maxcol;c++)
                        newselected.push(i*col+c+1)
                }
                setselected(newselected)
            }
        },[ismousedown]
    )
    const handlemouseUp = ()=>{
        setismousedown(false)
    }
    return (
        <>
            <h1>Selectable grid</h1>
            <div className='grid'
                style={{ "--rows": rows, "--col": col }}
                onMouseUp={ handlemouseUp}
            >
                {[...Array(rows * col)].map((_, i) => (
                    <div className={`boxes ${selected.includes(i+1)?"selected":""} `} key={i}
                        onMouseDown={() => handlemouseDown(i + 1)}
                        onMouseEnter={() => handlemouseEnter(i + 1)}
                    > {i + 1} </div>
                ))}
            </div>
        </>
    )
}

export default Selectable_grid