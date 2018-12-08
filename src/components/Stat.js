import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './stat.css'
class Stat extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
          };
    } 
    componentWillMount() {
        axios.get('/api/post/statistic')
        .then(res => {
            this.setState({ posts: res.data })
        })
        .catch((error) => {
            console.log('error',error)
        });
    }


    render() {
        let newpost = this.state.posts;
        let statpost = [];
        let uniqStr=[]
        var uniq=false;
        function UniqArr (arr,str) {
            var count = 0;
            for (let i = 0; i < arr.length; i++) {
                arr[i] = str;
                count++;
            }
            if (count>1) return false;
            if (count === 1) return true;
        }
        var k=0;
        if (newpost.length > 0) {
            for (var i = 0; i < newpost.length; i++) {

                var str = ''+newpost[i].date;
                var newstr = str.substring(0, 10);
                if ((statpost.length>0)&&(UniqArr(uniqStr,newstr))) {
                    continue;
                }else {
                    var item = {
                        date: '',
                        confirmed: 0,
                        canceled: 0,
                        postponed: 0
                    }
                    if (newpost[i].status === 'confirmed') item.confirmed=1;
                    if (newpost[i].status === 'canceled') item.canceled=1;
                    if (newpost[i].status === 'postponed') item.postponed=1;
                    item.date = newstr;
                    statpost[k]=item;
                    uniqStr[k]=newstr
                    for (var j = i+1; j < newpost.length; j++){
                        var strj = ''+newpost[i].date;
                        var newstrj = strj.substring(0, 10);
                        if (newstr = newstrj) {
                            if (newpost[j].status === 'confirmed') statpost[k].confirmed++;
                            if (newpost[j].status === 'canceled') statpost[k].canceled++;
                            if (newpost[j].status === 'postponed') statpost[k].postponed++;
    
                        }
                    }
    
                }
                k++
            }
        }
        return( 
            <div className="staticContainer">
                <div className="staticTitle">
                    <p>Дата</p>
                    <p>Подтвержден</p>
                    <p>Отменен</p>
                    <p>Отложен</p>
                </div>
                {statpost.map(post =>
                    <div className="staticData">
                        <p>
                            {post.date}
                        </p>
                        <p>
                            {post.confirmed}({(post.confirmed*100/(post.confirmed+post.canceled+post.postponed)).toFixed(2)}%)
                        </p>
                        <p>
                            {post.canceled}({(post.canceled*100/(post.confirmed+post.canceled+post.postponed)).toFixed(2)}%)
                        </p>
                        <p>
                            {post.postponed}({(post.postponed*100/(post.confirmed+post.canceled+post.postponed)).toFixed(2)}%)
                        </p>
                    </div>
                )}
            </div>
        )
    }   
}
export default Stat;