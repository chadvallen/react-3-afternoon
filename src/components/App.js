import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post.js';

import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("http://practiceapi.devmountain.com/api/posts").then(res => {
      this.setState({ posts: res.data })
    });
  }

  updatePost(id, text) {
    console.log(id, text)
    axios.put(`http://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(res => {
      this.setState({posts: res.data})
    }).catch(error => {
      console.log('update--->', error)
    })
  
  }

  deletePost(id) {
    axios.delete(`http://practiceapi.devmountain.com/api/posts?id=${ id }`).then(res => {
      this.setState({posts: res.data})
    })
  }

  createPost(id) {
    axios.post(`http://practiceapi.devmountain.com/api/posts?id=${ id }`)
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          { 
            posts.map(post => {
            return (
              <div>
                <Post 
                  key={post.id} 
                  id={post.id}
                  text={post.text} 
                  date={post.date} 
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                 />
              </div>
            )
           })  
           
          }
         {console.log(this.state.posts)}
          
        </section>
      </div>
    );
  }
}

export default App;
