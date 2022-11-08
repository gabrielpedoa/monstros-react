//import { Component } from 'react';  /* Para criação de Class Component */
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';
import { useState, useEffect } from 'react';


const App = () => {
  const [monsters, setMonsters] = useState([])
  const [title, setTitle] = useState('')
  const [searchField, setSearchField] = useState('') // [value, setValue]
  const [filteredMonsters, setFilteredMonsters] = useState([])

  console.log('render')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));

  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    setFilteredMonsters(newFilteredMonsters)
  },[monsters, searchField])
  
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value
    setTitle(searchFieldString)
  }

  return (
    <div className='App'>
      <h1 className='app-title'>{title}</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder={'search monster'}
        className={'monster-search-box'} />
        <br />
        <SearchBox
        onChangeHandler={onTitleChange}
        placeholder={'set title'}
        className={'type-search-box'} />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}


// class App extends Component {

//   constructor() {
//     super();

//     this.state = {   /* "React, haverá um objeto de estado para esse componente e o valor inicial é esse"  /  state = object */
//       monsters: [],                            /*maniupulação de objetos no array, utilizando method .map()*/
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {                                       /* executei o constructor, inicializei e passei um valor para o meu estado.. agora renderizarei inicialmente esse componente, no momento em que ele é renderizado faz a montagem através do componentdidmount */
//             return { monsters: users }
//           },
//         ))
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase()
//     this.setState(
//       () => {
//         return { searchField }
//       })
//   }

//   render() {

//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (                      /* definição do que será apresentado na UI   */
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder={'search monster'}
//           className={'monster-search-box'} />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
