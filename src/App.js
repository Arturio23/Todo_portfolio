import React , {useState,useEffect} from 'react';
import { Collection } from './components/Collection';
// import { Collection } from './components/Collection';
import './index.scss';


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setColections] = useState([]);

  useEffect(() => {
    setIsLoading(true)

    const cateCategory = categoryId ? `category=${categoryId}` : '';

    fetch(`https://63087aab722029d9ddd0005a.mockapi.io/photo_colections?page=${page}&limit=3&${cateCategory}`)
      .then((res) => res.json())
      .then((json) => {
        setColections(json)
      })
      .catch((err) => {
        console.warn(err);
        alert('Error when it get data from fetch API')
      }).finally(()=> setIsLoading(false))
  }, [categoryId, page])
  

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj,i) => (
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? 'active' : ''}
                key={obj.name}
              >
                {obj.name}
              </li>
            ))
          }
        </ul>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? (<h2>is load1ng....</h2>) : (
            
          collections?.filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          })
            .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
          )
        }
        
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map(( _, i) => (
            <li
              onClick={() => setPage(i+1)}
              className={
              page === (i+1) ? 'active' : ''
            }>
              {i + 1}
            </li>
          ))
}
      </ul>
    </div>
  );
}

export default App;
