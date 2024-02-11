import React from 'react';
import './Cards.css';
import { CardsData } from '../../Data/Data';
import Card from '../Card/Card';

function Cards({ complaintData }) {
    const updatedCardsData = CardsData.map((card, index) => ({
        ...card,
        value: complaintData[index] || '0',
    }));

    return (
        <div className='Cards'>
            {updatedCardsData.map((card, id) => (
                <div className="parentContainer" key={id}>
                    <Card
                        title={card.title}
                        color={card.color}
                        value={card.value}
                        png={card.png}
                    />
                </div>
            ))}
        </div>
    );
}

export default Cards;
