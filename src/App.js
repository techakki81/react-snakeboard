import React, {useState,useEffect} from 'react'
import blank from './img/blank.png'
import snake from  './img/snake.png'
import './App.css'
export default function App() {
 
  const dim= 20
  
  let initialArr = Array.from( {length:dim}, (element, index, array)  => 
                                Array.from( {length:dim}, (sE,sI,sA)=> 
                                  ({x:index,y:sI})     
  ))
 
  console.log(initialArr)
  
 const[selectedSnake, setSelectedSnake] = useState([{x:0,y:0}, {x:0,y:1},{x:0,y:2}])
 
 const getHtml = () => {    
   return initialArr.map( (rootItem) =>{
      return (<div>
       {
          rootItem.map( ({x,y}) => {  
                      
              return (
                selectedSnake.findIndex( 
                  // show that sX and sY wont work because its destructuring 
                  (selItem) => {                     
                   return selItem.x ===x && selItem.y ===y
                  }
               ) !==-1
               )? <img src={snake}></img>:<img src={blank}></img>
                
            } 
            )
       }
      </div>)

    })
    

 }
  
 const moveSnake = (e)=>{
     
   switch(e.keyCode){
     case 38: //up
      setSelectedSnake((selectedSnake)=> { 
        const lastEle = selectedSnake[selectedSnake.length-1]   
        if(lastEle.x !== 0 ){ 
          let newSnake = [...selectedSnake]
          newSnake.shift() 
          newSnake.push({x:lastEle.x-1,y:lastEle.y})            
          return newSnake
          }
          else{
               return  selectedSnake
          }
    })         
          break;     
     case 39:     // right 
     // cant go right   
     setSelectedSnake((selectedSnake)=>{
      const lastEle = selectedSnake[selectedSnake.length-1]      
      if(lastEle.y !== dim-1 ){ 
        let newSnake = JSON.parse(JSON.stringify(selectedSnake));
        newSnake.shift() 
        newSnake.push({x:lastEle.x,y:lastEle.y+1})             
        return newSnake 
        }
        else{
          return selectedSnake
        }
     }
     )
     
      break;       
 
      case 40:     // down
      setSelectedSnake((selectedSnake)=> { 
       const lastEle = selectedSnake[selectedSnake.length-1]   
          if(lastEle.x !== dim-1 ){ 
            let newSnake = [...selectedSnake]
            newSnake.shift() 
            newSnake.push({x:lastEle.x+1,y:lastEle.y})            
            return newSnake
            }
            else{
            return  selectedSnake
         }
    })

      break;       
  
     case 37:     // left 
     setSelectedSnake((selectedSnake)=>{
      const lastEle = selectedSnake[selectedSnake.length-1]      
      if(lastEle.y !== 0 ){ 
        let newSnake = JSON.parse(JSON.stringify(selectedSnake));
        newSnake.shift() 
        newSnake.push({x:lastEle.x,y:lastEle.y-1})             
        return newSnake 
        }
        else{
          return selectedSnake
        }
     }
     )
      break;
     default:
       break;

   }
 }
  useEffect(() => {
         // set the events on window 
         window.addEventListener("keydown", (e)=>moveSnake(e), false);
         return () => {
          window.removeEventListener("keydown",(e)=> moveSnake(e), false);
       }
  }, [])
 
  return (
    <div>
    { getHtml()}
    </div>
  )
}
