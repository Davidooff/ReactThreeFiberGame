import { Dispatch, SetStateAction, useEffect } from 'react'
import { ExpStateUpdate } from '../../../classes/game/exp'
import { ExpDataItem } from '../../../data/exp'

interface Props {
  expState: ExpStateUpdate
  updateExpState: Dispatch<SetStateAction<ExpStateUpdate>>
}

function DisplayExp(props: Props) {
  useEffect(() => {
    if (props.expState.new_lvl_data) {
      setTimeout(() => {
        cleanNewLvlData()
      }, 5000)
    }
  }, [props.expState])

  let cleanNewLvlData = () => {
    props.updateExpState({
      exp: props.expState.exp,
      lvl: props.expState.lvl,
      exp_next_lvl: props.expState.exp_next_lvl,
      new_lvl_data: undefined
    })
  }

  return (
    <>
      {!props.expState.exp_next_lvl && <div className='exp-last_lvl'>{props.expState.lvl}</div>}
      {
        props.expState.exp_next_lvl && 
        <div className="exp" style={{position: 'relative'}}>
          <h2>{props.expState.lvl}</h2>
          <div className='exp-line'>
            <div className='exp-inner-line' style={{width: props.expState.exp / props.expState.exp_next_lvl + "%", transition: "0.5s"}}></div>
          </div>
          <h2>{props.expState.exp_next_lvl && props.expState.lvl+1}</h2>
          <h3 style={{position: "absolute", left: props.expState.exp / props.expState.exp_next_lvl + "%"}}>
            {props.expState.exp} xp
          </h3>
        </div>
      }
      {props.expState.new_lvl_data && 
        <div style={{position: 'relative'}}> 
          <ExpPopUpWin newLvlData={props.expState.new_lvl_data}/> 
          <div className='close' style={{position: 'absolute'}} onClick={cleanNewLvlData}>x</div>
        </div>
      }
    </>
  )
}

interface PropsPopUp {
  newLvlData: ExpDataItem 
}

function ExpPopUpWin(props: PropsPopUp) {
  return (
    <>
      <img src={props.newLvlData.image} alt="ExpUpdate" />
      <div>
        <h2>{props.newLvlData.name}</h2>
        <p>{props.newLvlData.description}</p>
      </div>
    </>
  )
}


export default DisplayExp