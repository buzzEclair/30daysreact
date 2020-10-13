import React, { useState, useEffect, useContext } from 'react';
import Categories from '../Data/Categories';
import BackgroundContext from '../Contexts/BackgroundContext';
import CatContext from '../Contexts/CatContext';
import GetCatContext from '../Contexts/GetCatContext';

const CatNav = (props) => {
  
  // Get data - All categories
  const dataCat = Categories;
  // State const cat - number of cat display
  const [cat, setCat] = useState([]);
  // State const catState - if true = more / false = less
  const [catState, setCatState] = useState(true);
  // State const Style
  const [style, setStyle] = useState({});
  // BackgroundContext - State of BackgroundContext
  const {setBackground} = useContext(BackgroundContext);
  // CatContext - State of CatContext
  const {catValue, setCatValue} = useContext(CatContext);
  // CatContext - State of GetCatContext
  const {getCat, setGetCat} = useContext(GetCatContext);
  
  // Function closeCat - Get only first 5 categories
  const closeCat = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
     array.push(dataCat[index])
    }
    setCatState(true);
    setCat(array);
    setStyle({background: '', position: 'absolute', width: '150px'})
    setBackground({background: ''});
    setGetCat(0);
  }

  // Function overlay - Setup overlay before click
  const overlay = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
     array.push(dataCat[index])
    }
    setStyle({background: '', position: 'absolute', width: '150px'})
    setCatState(true)
    setCat(array);
    setCatValue(false)
  }

  // Function openCat - Get all Categories
  const openCat = () => {
    setCatState(false);
    setCat(dataCat);
    setStyle({background: '#252728', position: 'absolute', width: '200px', zIndex: '12'})
    setBackground({background: 'rgb(0, 0, 0, 0.6)', zIndex: "8"})
  }
  // Function set Categories id value
  const handleCategories = (id) => {
    setGetCat(id);
  }
  // Function reset Cat Value
  const resetCat = () => {
    setGetCat(0);
  }

  // Send function
  useEffect(() => {
    closeCat();
  }, [dataCat])

  useEffect(() => {
    overlay();
  }, [catValue])

  return ( <>
  
    <div className="post-search" style={style}>
      <ul>
        <li className="selected" onClick={resetCat}>All Posts</li>
        {
          cat.map(item => <>
            <li key={item.id} onClick={() => handleCategories(item.id)}>{item.name}</li>
          </>)
        }
        {
          (catState) ? <li onClick={openCat}>More</li> : <li className="selected" onClick={closeCat}></li>
        }
        
      </ul>
    </div>
  </> );
}
 
export default CatNav;