// useState hook: used to manage state of react app
// you can change the data
import './App.css';
import { useState } from 'react';

// state: data
// uncontrolled {useRef} vs controlled {useState}

// localstorage: ---> getItem and setItem {object}

function App() {

  const data = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [];

// JSON stringify object[array] ---> string (local storage {string})
// JSON parse  string ---> object

  const [list, setList] = useState(data);
  const [newTask,setNewTask] = useState('');
  const [search,setSearch]=useState('');
 


  const addtask = () => {
    
    localStorage.setItem('lists', JSON.stringify([...list, newTask]) )
    setList([...list, newTask])
    setNewTask("")
    
  }
  const deleteTask = (i) => {
    const delList = [...list];
    delList.splice(i, 1);
    setList(delList)
    localStorage.setItem('lists', JSON.stringify( delList))
  }
  const updateTask = (e, i) => {
    const uptask = [...list];
    uptask.splice(i, 1, e.target.value)
    setList(uptask)
    localStorage.setItem('lists', JSON.stringify(uptask))
  }

  const keyEnter = (e) =>{
    
    if(e.key === "Enter"){
    
      addtask()
    }
  }


  return (

    <div className="App">

      <div className="search">
      <input type="text" placeholder='Search task 🚀' onChange={(e)=>{setSearch(e.target.value)}} />
      </div>

      <h1 className="heading">To-do App ⚡</h1>
      <div className="inputs">

        <input type="text" onChange={(e)=>{ setNewTask(e.target.value) }} onKeyDown={keyEnter} value={newTask} />
        <button className="btn" onClick={addtask} >Add task👍</button>

      </div>
      <div className="container">

        {
          list.map((val, i) => {
            if(val.toLowerCase().includes(search.toLowerCase())){
              return ( 
              
              <div className="list" key={i}>
                <input type="text" value={val} onChange={(e) => { updateTask(e, i) }} />
                <span className="icon" onClick={() => { deleteTask(i) }} >❌</span>
              </div>
            )
            }else{
              return ''
            }
            
          })
        }


      </div>
    </div>
  );
}

export default App;
