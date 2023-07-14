const DIRECTION = 'SNAKE/DIRECTION';
const CRS = 'SNAKE/CRS';
const UPDATE_BOARD = 'SNAKE/UPDATE_BOARD';
const OLD_DIRECTION = 'SNAKE/OLD_DIRECTION';
const PUT_NEW_APPLE = 'SNAKE/PUT_NEW_APPLE';
const UPDATE_RESULT = 'SNAKE/UPDATE_RESULT';


let initialState = {
   board: [],
    snake: [42,43,44],
    direction: 'ArrowRight', 
    old_Direction: 'ArrowRight',
    intervalMoving: true,
    apple: 12,
    result: 0
}


const snakeReducer = (state = initialState, action) => {

    switch (action.type) {
        case DIRECTION:
            return {...state, direction: action.data}
        case CRS:
            return {...state, snake: action.data}
        case UPDATE_BOARD:
                return {...state, board: action.board}
         case OLD_DIRECTION:
                return {...state, old_Direction: action.data}
        case PUT_NEW_APPLE:
                return {...state, apple: action.data}
        case UPDATE_RESULT:
            return {...state, result: action.data}
        default:
            return state;
    }
}

export const changeDirection = ({ key }) => {
  
    return  (dispatch) => {
    if( key === 'ArrowRight' ||
        key === 'ArrowDown' ||
        key === 'ArrowLeft' ||
        key === 'ArrowUp'
   ) {
   
    dispatch(actions.putDirection(key)) 
    }
    
   }};


   export const snakeMoving = (snake, direction, old_Direction, apple, result) => {

   
    let newBoard = Array(100).fill(111)
    let newSnake = []
    let deletedTail = snake[snake.length -1]
    let newApple = 0
    newBoard[apple] = apple

    console.log(snake.splice(0, 1))
  


    if(direction === 'ArrowRight' && old_Direction === 'ArrowLeft' ) {
       
        direction=old_Direction
    }
    else if(direction === 'ArrowDown' && old_Direction === 'ArrowUp'){
      
        direction=old_Direction
    }
    else if(direction === 'ArrowLeft' && old_Direction === 'ArrowRight'){
     
        direction=old_Direction
    }
    else if(direction === 'ArrowUp' && old_Direction === 'ArrowDown'){
      
        direction=old_Direction
    } 

    if(direction === 'ArrowRight'  ) {
        newSnake = [...snake, snake[snake.length-1]+1]
    }
    else if(direction === 'ArrowDown' ){
        newSnake = [...snake, snake[snake.length-1]+10]
    }
    else if(direction === 'ArrowLeft' ){
        newSnake = [...snake, snake[snake.length-1]-1]
    }
    else if(direction === 'ArrowUp' ){
        newSnake = [...snake, snake[snake.length-1]-10]
    } 




    if(direction === 'ArrowRight' && newSnake[newSnake.length-1]%10 === 0  ) {
        alert('u lose')
        return cleanDataThunkCreater()
    }
    else if(direction === 'ArrowDown' && newSnake[newSnake.length-1] > 99){
        alert('u lose')
        return cleanDataThunkCreater()
    }
    else if(direction === 'ArrowLeft' && newSnake[newSnake.length-2]%10 === 0){
        alert('u lose')
        return cleanDataThunkCreater()
    }
    else if(direction === 'ArrowUp' && newSnake[newSnake.length-1] < 0){
        alert('u lose')
        return cleanDataThunkCreater()
    } 
  

    if(apple === newSnake[newSnake.length-1]){
        newSnake.unshift(deletedTail)     
        newApple = getNewApple(newSnake)
    }
   
    
    if((newSnake.filter(item => {
        return item !== newSnake[newSnake.length-1]
    }).length !== newSnake.length - 1) && newSnake.length > 0 ){
        alert('u lose')
        return cleanDataThunkCreater()
    }

    
    
  
    
    for(let i=0; i<newSnake.length; i++){
        newBoard[newSnake[i]] = 1
    }
    
    return  (dispatch) => {
         if(apple === newSnake[newSnake.length-1]){
            dispatch(actions.putNewApple(newApple))
            dispatch(actions.updateResult(result+1))
         
        }
        dispatch(actions.updateBoard(newBoard))
        dispatch(actions.createNewSnake(newSnake))
        dispatch(actions.putOldDirection(direction))
    }
}


export const getNewApple = (snake) => {
    let apple =  Math.floor(Math.random() * (100 - 0)) + 0 
   
    if(snake.includes(apple)){
      
        apple =  getNewApple(snake)
    }

    return apple
}

export const createNewBoard = () => {

    
    return  (dispatch) => {
        let newBoard = []
        for(let i=0; i<100; i++){
            
            newBoard = [...newBoard, 0]
        }
        dispatch(actions.updateBoard(newBoard))
    }
}

export const cleanDataThunkCreater = () => {
    createNewBoard()
   
    return (dispatch) => {
    dispatch(actions.putNewApple(getNewApple([42,43,44])))
    dispatch(actions.createNewSnake([42,43,44]))
    dispatch(actions.updateResult(0))
    dispatch(actions.putDirection('ArrowRight'))
    dispatch(actions.putOldDirection('ArrowRight'))
    }
}


export const actions = {
    putDirection: (data) => ({
        type: DIRECTION, data,
    }),
    createNewSnake: (data) => ({
        type: CRS, data,
    }),
    updateBoard: (board) =>({
        type: UPDATE_BOARD, board
    }),
    putOldDirection: (data) => ({
        type: OLD_DIRECTION, data,
    }),
    putNewApple: (data) => ({
        type: PUT_NEW_APPLE, data,
    }),
    updateResult: (data) => ({
        type: UPDATE_RESULT, data
    }),
}


export default snakeReducer;