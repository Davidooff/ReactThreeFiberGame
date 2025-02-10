import { Dispatch, SetStateAction } from 'react'
import { ExpStateUpdate } from '../../../classes/game/exp'
import './ExpLvl.css'

interface Props {
  expState: ExpStateUpdate
  updateExpState: Dispatch<SetStateAction<ExpStateUpdate>>
}

function DisplayExp(props: Props) {
  const persents = (props.expState.exp_next_lvl && (props.expState.exp - props.expState.exp_this_lvl) / (props.expState.exp_next_lvl - props.expState.exp_this_lvl) * 100) || 0
  
  return (
    <>
      {!props.expState.exp_next_lvl && <div className='exp-last_lvl'>{props.expState.lvl}</div>}
      {
        props.expState.exp_next_lvl && 
        <div className="exp-wrapper">
          <div className="exp" >
            <h2>{props.expState.lvl}</h2>
            <div className='exp-line' style={{position: 'relative'}}>
              <div className='exp-inner-line' style={{width: persents + "%", transition: "0.5s"}}></div>
              <h3 className='curent-exp' style={{position: "absolute", marginLeft: persents + "%", transition: "0.5s"}}>
                {props.expState.exp} xp
              </h3>
            </div>
            <h2>{props.expState.exp_next_lvl && props.expState.lvl+1}</h2>
          </div>
        </div>
      }

    </>
  )
}




export default DisplayExp