import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
	this.onDelete = this.onDelete.bind(this);
	this.onUpdate = this.onUpdate.bind(this);
  }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/post')
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  onDelete(e){
		axios.delete('/api/post/'+ this.state.posts[0]._id)
			.then((result) => { 
				console.log('post deleted');

				axios.get('/api/post')
					.then(res => {
						this.setState({ posts: res.data });
					})
					.catch((error) => {
						console.log('error');
					});
			});
	}
	onUpdate(e){
		window.updateid= this.state.posts[0]._id;
	}
	
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              LIST &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div className="panel-body">
              <div className="controllLink">
                <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Создать</Link></h4>
                <h4><Link to="/stat"><span aria-hidden="true"></span>Статистика</Link></h4>
              </div>
            <div>
                {this.state.posts.map(post =>
                  <div className="article">
                    <div className ="article_date">
                    <div>Recording time: </div>
                    <div>{post.date}</div>
                  </div>
                  <div className ="article_author">
                    <div>Name: </div>
                    <div>{post.name}</div>
                  </div>
                  <div className ="article_author">
                    <div>Phone: </div>
                    <div>{post.phone}</div>
                  </div>
                  <div className ="article_author">
                    <div>Address: </div>
                    <div>{post.address}</div>
                  </div>  
                  <div className ="article_author">
                    <div>Status: </div>
                    <div>{post.status}</div>
                  </div>                                                     
                  <div className ="article_buttons">
                    <div>
                      <button className="btn btn-warning" onClick={this.onUpdate}><Link to="/update">Update<i className="glyphicon glyphicon-edit"></i></Link></button>
                    </div>
                    <div><button className="btn btn-danger" onClick={this.onDelete}>Delete<i className="fa fa-trash-o" aria-hidden="true"></i></button></div>
                  </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
