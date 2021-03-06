import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Update extends Component {

  constructor() {
    super();
    this.state = {
	    id: window.updateid,
      date: new Date(),
      name: '',
      phone: '',
      address: '',
      status: '',
    };
    this.onCancel = this.onCancel.bind(this);
  }
  componentDidMount() {
    const id = window.updateid;
    axios.get('/api/post/'+id)
    .then(res => {
      console.log(res)
      this.setState({ 
        name: res.data.name, 
        date: res.data.date,
        phone: res.data.phone,
        address: res.data.address,
        status: res.data.status,
      });
    })
    .catch((error) => {
      console.log('err',error)
      if(error) {
        this.props.history.push("/");
      }
    });
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onCancel = (e) => {
    this.props.history.push("/");
  }

  onSubmit = (e) => {
    e.preventDefault();
	
    const { id,name, phone, address, status} = this.state;

    axios.put('/api/post/'+id, { name, phone, address, status})
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { date, name, phone, address, status } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Редактирование
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Список</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="name">Phone:</label>
                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="name">Address:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="name">Status:  </label>
                <input type="radio" value="confirmed" onChange={this.onChange} name="status"/> Подтвержден
                <input type="radio" value="canceled" onChange={this.onChange} name="status"/> Отменен
                <input type="radio" value="postponed" onChange={this.onChange} name="status"/> Отложен
              </div>
              <div>
                <button type="submit" class="btn btn-default">Submit</button>
                <button class="btn btn-default" onClick={this.onCancel}>canceled</button>
              </div>                            
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;