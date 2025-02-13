import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import './pop-up.css'

export interface PopUpData { 
  id?: number;
  image: string;
  title: string;
  description: string;
}

export interface PropsPopUp {
  newPopUpData: PopUpData | null;
  setNewPopUp: Dispatch<SetStateAction<PopUpData | null>>;
  timeToWait: number;
}

function PopUp(props: PropsPopUp) {
  const [popUpData, setPopUpData] = useState<PopUpData[]>([]);
  console.log("new pop up data ",props.newPopUpData);
  
  useEffect(() => {
    if (props.newPopUpData) {
      setPopUpData([...popUpData, props.newPopUpData])
      setTimeout(() => {
        const id = Date.now()
        const index = popUpData.findIndex((popUp) => popUp.id === id)
        setPopUpData(popUpData.slice(0, index).concat(popUpData.slice(index + 1)))
      }, props.timeToWait)
      props.setNewPopUp(null)
    }
  }, [props.newPopUpData])

  const PopUps = useMemo(() => {
    return (
      <>
        {popUpData.length > 0 && popUpData.map((popUp) => (
          <div key={popUp.id} className='pop-up' style={{position: 'relative'}}> 
            <ExpPopUpWin data={popUp}/> 
            <div className='close' style={{position: 'absolute', right: "10px", top: "10px"}} onClick={() => cleanNewLvlData(popUp.id as number)}>x</div>
          </div>
        ))}
      </>
    )
  }, [popUpData])

  const cleanNewLvlData = (id: number) => {
    setPopUpData(popUpData.filter(popup => popup.id !== id));
  };

  return (
    <div className='pop-up-wrapper'>
      {PopUps}
    </div>
  )
}

interface PropsPopUpWin {
  data: PopUpData 
}

function ExpPopUpWin(props: PropsPopUpWin) {
  return (
    <>
      <img src={props.data.image} alt="ExpUpdate" />
      <div>
        <h2>{props.data.title}</h2>
        <p>{props.data.description}</p>
      </div>
    </>
  )
}

export default PopUp