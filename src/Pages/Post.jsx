import React, { useEffect } from 'react';

import "../Scss/Post.scss";
import { Link } from 'react-router-dom';
import Posts from '../Data/Posts';
import { useState } from 'react';
import { BsArrowLeft } from "react-icons/bs";
const Post = (props) => {

  const id = parseInt(props.match.params.id);
  const data = Posts;
  const [post, setPost] = useState({});

  const fetchData = (id) => {
    for (let i = 0; i < data.length; i++) {
     if(i === id){
        setPost(data[i])
     }
    
    }
  }

  const handleMove = (event) => {
    const btn = document.getElementsByClassName('btn-back');
    const offsetLeft = document.getElementsByClassName('content')[0].offsetLeft;
    const offsetWidth = document.getElementsByClassName('content')[0].offsetWidth;
    if(event.pageX >= offsetLeft + 50 && event.pageX <= offsetLeft + offsetWidth - 50){
      btn[0].style.left = (event.pageX - offsetLeft - 70)+'px';
    }
  }

  useEffect(() => {
    fetchData(id)
  }, [id])

  return ( <>
    <div onMouseMove={event => handleMove(event)} className="content content-post">
      <Link to="/"><button className="btn-back"><BsArrowLeft /> Back</button></Link>
      <div className="post-title">
        <p>{post.title}</p>
      </div>
      <div className="post-description">
        <p>{post.description}</p>
      </div>
      {
        post.codesandbox ?
        <iframe
        src={post.url+"?fontsize=14&hidenavigation=1&theme=dark&view=preview"}
        style={{width:'100%', height:'900px', border:0, borderRadius: '4px', overflow:'hidden'}}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe> :
      <div className="content-btn">

        <a className="button-demo" href={post.url}>Go to demo</a>
      </div>
       
      }
    </div>
  </> );
}
 
export default Post;