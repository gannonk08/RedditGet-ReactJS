// Importing dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Input from './Input.jsx';


// constructor for stateful Component

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      subreddit: 'ReactJS'
    };
  }

  changeHeader(e) {
    this.setState({subreddit: e.target.value});
  }
  changeReddit(e) {
    e.preventDefault()
    this.setState({subreddit: e.target.value});
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }


  // creating a promise for AJAX request and then sets the state of the posts components

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  // render components to the page

  render() {
    return (
      <div>
        <h1>{`/r/${this.state.subreddit}`}</h1>
        <div>
          <input type="text" value={this.state.subreddit} onChange={this.changeHeader.bind(this)}></input>
          <button type="button" onClick={this.changeReddit.bind(this)}>Search!</button>
          <h3>Current subreddit: <Input input={this.state.subreddit}/></h3>
        </div>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs"/>,
  document.getElementById('root')
);
