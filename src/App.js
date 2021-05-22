import React, {useState,useEffect} from 'react'
import blank from './img/blank.png'
import snake from  './img/snake.png'
import './App.css'
export default function App() {
 
  const dim= 10
  
  let initialArr = Array.from( {length:dim}, (element, index, array)  => 
                                Array.from( {length:dim}, (sE,sI,sA)=> 
                                  ({x:index,y:sI})     
  ))

 const[selectedSnake, setSelectedSnake] = useState([{x:0,y:0}, {x:0,y:1},{x:0,y:2}])
 
 const getHtml = () => {    
   return initialArr.map( (rootItem) =>{
     // console.log(rootItem)

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
  
 const logKey = (e)=>{
   switch(e.keyCode){
     case 38:
          let newSelectedSnake = selectedSnake;
          newSelectedSnake.shift()
          newSelectedSnake.push({x:0,y:3})
          setSelectedSnake(newSelectedSnake)          
          break;     // up
     case 39:     // right 
     case 40:     // down 
     case 37:     // left 
     default:
       break;

   }
 }
  useEffect(() => {
         // set the events on window 

         window.addEventListener("keydown", (e)=>logKey(e), false);

         return () => {
          window.removeEventListener("keydown",(e)=> logKey(e), false);
    }
  }, [])

 let html =""
  return (
    <div>
    { getHtml()}
    </div>
  )
}
