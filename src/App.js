import React, {componet} from "react";
import propTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import orderBy from 'iodash/orderBy';

import ErrorMessage from './components/error/Error';
import Loader from './component/Loader';
import * as API from './components/ad/Ad';
import Navbar from './component/welcome/welcome/welcome';
import { render } from "react-dom";

class App extends componet {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      post: []
      endpoint: $ {process.env
        .Endpoint}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_embed
        expand=user&_embedlike
      };
    }
    static propTypes = {
      children: propTypes.node
    };
    render() {
      return (
        <div className="app">
          <Navbar />
          {this.state.loading ? (
            <div className="loading">
              <Loader />
            </div>
          ) : (
             <div className="home">
              <welcome />
             <div>
              <button className="block">
                load more post
              </button>
             </div>
             <div>
              <Ad
                 url="https://ifelse.io/book"
                 imageurl="/static/assets/ads/ria.png">
                  
                 </Ad>
                 <Ad
                     url="https://ifelse.io.book"
                     imageurl="/static/assets/ads/orly.jpg">

                     </Ad>
             </div>
          
        </div>
      )}
    </div>
      );
  }
}

// fetching app data when it mounts
constructor(props) {
  this.getPosts=this.getPosts.bind(this);
}

componetDidMount () {
  this.getPosts();
}
componetDidCatch(err,info) {
  console.error(err);
  console.error(info);
  this.setState(() => ({
    error: err
  }));
}
getPosts() {
  API.fetchPosts(this.state.endpoint)
     .then(res=> {
      return res
         .json()
         .then(posts=> {
          const links=parseLinkHeader(res.headers.get('link'));
          this.setState(() => ({
            posts: orderBy(this.state.posts.concat(posts),
            'date', 'desc'),
            endpoint: links.next.url
          }));
         })
         .catch(err => {
          this.setState(() => ({error: err}));
         });
        });
      }
      render() {
       <button className="block" onClick={this.getPosts}>
         load more posts
       </button>
  
}

// iterating over the post
import post from './comments/post/post';
<welcome>
                <div>
                  {this.state.posts.length && (
                    <div className="posts">
                      {this.state.posts.map(({id}) =>(
                        <post id={id} key={id}
                        user={this.props.user} />
                      ))}
                  
                </div>
                  )}
                  <button className="block" onClick={this.getPosts}>
                    load more post
                  </button>
                  </div>
                  <div>
                    <Ad
                       url="https://ifelse.io.book"
                       imageurl="/static/assets/ads/ria.png"
                        />
                    <Ad
                       url="https://ifelse.io.book"
                       imageurl="/static/assets/ads/orly.jpg"
                       />
  
                  </div>
</welcome>





export default App;
