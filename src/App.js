import React,{useEffect, useState}  from 'react'

const SnakeBoard = () => {
  const [rows, setRows] = useState([]);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }, { x: 1, y: 0 }]);

  useEffect(()=> {
    const width = 10;
    const height = 10;
    let initialRows = [];
    for (let i = 0; i < height; i++) {
      initialRows.push("blank ".repeat(width).trim().split(' '));
    }
    for (let i = 0; i < snake.length; i++) { 
      initialRows[snake[i].y][snake[i].x] ="snake";
    }
    setRows(initialRows)
  }, [snake])

  useEffect(() => {
    const changeDirectionWithKeys = (e) => {
      e.preventDefault();
      const { key } = e;
      // cut tail and push new head
      const [tail, ...newSnake] = snake.length > 1 ? snake : [null, ...snake]  ;
      const head = snake[snake.length-1]
        switch (key) {
        case "ArrowRight":
          newSnake.push({ x: head.x + 1 , y: head.y }); // fix
          break;
        case "ArrowLeft":
          newSnake.push({ x: head.x - 1 , y: head.y }); // fix
          break;
        case "ArrowUp":
          newSnake.push({ x: head.x, y: head.y - 1 }); // fix
          break;
        case "ArrowDown":
          newSnake.push({ x: head.x, y: head.y + 1  }); // fix
          break;
        default:
          break;  
      }
      setSnake(newSnake);
    };

    window.addEventListener("keydown", changeDirectionWithKeys);
    return () => {
      window.removeEventListener("keydown", changeDirectionWithKeys);
    };
  }, [snake]);

  const diplayRows = rows.map((row, index) => (
    <li key={index}>
      {row.map((e, ind) => {
        let cell = null
        switch (e) {
          case "blank":
            cell = <span key={ind}> .|</span>;
            break;
          case "snake":
            cell = <span key={ind}> s|</span>;
            break;
          default:
            break;  
        }
        return cell;
      })}
    </li>
  ));

  return (
    <div>
      <ul>
        {diplayRows}
      </ul>
    </div>
  );
};

export default SnakeBoard;