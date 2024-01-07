import React from 'react'
import './Cards.css'
import { CardsData } from '../../Data/Data'
import Card from '../Card/Card'

function Cards() {
  return (
    <div className='Cards'>
    {CardsData.map((card,id)=>{
        return(
            <div className="parentContainer">
                <Card
                  title={card.title}
                  color={card.color}
                  value={card.value}
                  png={card.png}
                />
            </div>
        )
    })}
    </div>
  )
}

export default Cards