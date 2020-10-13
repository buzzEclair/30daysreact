import React, { useContext } from 'react';

import "../Scss/Home.scss";
import { Link } from 'react-router-dom';
import Posts from '../Data/Posts';
import CatNav from '../Components/CatNav';
import BackgroundContext from '../Contexts/BackgroundContext';
import CatContext from '../Contexts/CatContext';
import GetCatContext from '../Contexts/GetCatContext';
import { useEffect } from 'react';
import { useState } from 'react';


const Home = (props) => {

  // Get data - All Posts
  const data = Posts;
  // State finalData - list posts selected
  const [finalData, setFinalData] = useState([{}]);
  // BackgroundContext - State of BackgroundContext
  const {background, setBackground} = useContext(BackgroundContext);
  // CatContext - State of CatContext
  const {setCatValue} = useContext(CatContext);
  // GetCatContext - State of GetCatContext
  const {getCat, setGetCat} = useContext(GetCatContext);
  
  // Function handleOverlay - Change backgroundContext value
  const handleOverlay = () => {
    setBackground({background: '', zIndex: '0'})
    setCatValue(true)
  }

  // Function updateData - Update list of posts by cat
  const updateData = () => {
    if(getCat === 0){
      console.log("ok")
      setFinalData(data)
    }else{
      console.log("lol")
      const array = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].cat.length; j++) {
          if(getCat ===  data[i].cat[j]){
            array.push(data[i])
          }
        }
      }
      setFinalData(array)
    }
  }

  // State Function
  useEffect(() => {
    updateData();
  }, [getCat])

  return ( 
    <>
    <div className="overlay" onClick={handleOverlay} style={background}></div>
    <div className="content">
      <div className="content-header">
        
        <div className="avatar">
          <img src="https://vignette.wikia.nocookie.net/kingdomhearts/images/b/b1/Buzz_Lightyear_KHIII.png/revision/latest/scale-to-width-down/350?cb=20190125014642" alt=""/>
        </div>

        <div className="title">
          <p className="title title-up">30 Days <span>30 Days</span> </p>
          <p className="title title-down">Of React <span>Of React</span></p>
        </div>
        
        <CatNav></CatNav>
        
      </div>
      <div className="content-items">

        {
          finalData.map(post => <>
            <div key={post.id} className="item" id={post.id}>
              <Link to={"/day/" + post.id}>
                <div>
                  <p className="item-techno">{post.techno}</p>
                  <p className="item-date">{post.day}</p>
                  <p className="item-title">{post.title}</p>
                </div>
              </Link>
            </div>
          </>)
        }

      
      </div>
    </div>
    </>
   );
}
 
export default Home;