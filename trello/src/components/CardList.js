import React, { useState } from 'react';

import { useEffect } from 'react';

import Card from './Card'

import AddCard from './AddCard';


const CardList = (props) => {
    
    const board = props.board;
    const [cards, setCards] = useState([]);

    const send = async () =>{
        const response = await fetch(`http://localhost:5000/api/card/board/${board.id}`);
        if(response.ok){
            const data = await response.json();
            setCards(data.cards);
        }
    }

    useEffect(() => {
        send();
     },[]);

       return(<React.Fragment>
       <div className="card mx-2" >
         <div className="list-group-item list-group-item-warning"style={{textAlign: "center"} }  >
         {board?.name}
         </div>
         <ul className="list-group list-group-flush">
        {cards?.map((c)=>{
            return <Card key = {c.id} card = {c} set={setCards}/>
        })}
        </ul>
        </div>
        <AddCard set={setCards} board={board}/>
      </React.Fragment>);
    
    
}

export default CardList