import React, {useState,useEffect} from 'react'
import blank from './img/blank.png'
import snake from  './img/snake.png'
import './App.css'
export default function App() {
 
  let dim= 10
  
  let initialArr = Array.from( {length:dim}, (element, index, array)  => 
                                Array.from( {length:dim}, (sE,sI,sA)=> 
                                  ({x:index,y:sI})     
  ))

 const[selectedSnake, setSelectedSnake] = useState([{x:0,y:0}, {x:0,y:1}])
 
 selectedSnake.findIndex( item =>{
   //console.log(item)
   return false 
 })

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
  
  useEffect(() => {
         return () => {     
    }
  }, [selectedSnake])

 let html =""
  return (
    <div>
    { getHtml()}
    </div>
  )
}
