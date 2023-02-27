
import React, { useState } from 'react';

import { useEffect } from 'react';

import CardList from './CardList'
import AddBoard from './AddBoard'

const Home = () =>{

    const [boards, setBoards] = useState();

    const send = async () =>{
        const response = await fetch('http://localhost:5000/api/board/');
        const data = await response.json();
        setBoards(data.boards);
    }
    
    useEffect(() => {
        send();
     },[]);

    return (
        <div className="container-fluid py-2">
            <div className="d-flex flex-row flex-nowrap">
            {boards?.map((board)=>{
                return (
                <div className="align-self-start text-nowrap" key={board.id}>
                <CardList board={board}/>
               </div>
                );
            })}
            <div className="align-self-start">
            <AddBoard set={setBoards}/>
            </div>
            </div>
        </div>

    );

}

export default Home;