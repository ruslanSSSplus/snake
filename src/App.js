import './App.css';
import {useDispatch, useSelector} from "react-redux";
import Table from "./Components/Table/Table";
import {useEffect, useState} from "react";
import {changeDirection, createNewBoard, snakeMoving} from './Components/Store/reducers/snakeReducer'



function App() {
    const [moving, setMoving] = useState(0)
    const dispatch = useDispatch()
    const detectKeyDown = (key) => {
        dispatch(changeDirection(key))
    }

    const {board, snake, direction, old_Direction, apple, result} = useSelector((state) => state.snake)



    

      

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    }, [])

    useEffect( () =>  {
         dispatch(createNewBoard())
       
    }, [])
   

    const pushSnakeMoving = () => {

        setMoving(Math.random())
        
    }
    
    const start = () => {
     let  interval = setInterval(() => {
                
            pushSnakeMoving()
        }, 500);
    }
    
           
          
    useEffect(() => {
         dispatch(snakeMoving(snake, direction, old_Direction, apple, result))
    
    }, [moving])

    return (
        <div className="App"  >
            <button onClick={() => start()}>
                Start
            </button>
            <div>
                {result}
            </div>
            {
                <Table board={board} apple={apple}/>
            }

        </div>
    );
}

export default App;
