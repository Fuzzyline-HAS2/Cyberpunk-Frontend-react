import React, { Component } from 'react';
import axios from "axios";

class Iotglove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            iotglove: [],
            iotglove_info: [],
            group1:[],
            group2:[],
            group3:[],
            group4:[],
            group1_info:[],
            group2_info:[],
            group3_info:[],
            group4_info:[]
        };
    }
    async componentDidMount() {
        setInterval(async () => {
            let data = await axios.get('/api/DB_iotglove');
            if (data.data.length !== 0) {
                data = data.data
                console.log(data)
            }
        }, 1000);
    }

    /**
    * @brief 리렌더링을 위한 함수
    */
    async refresh() {
        await axios.get('/api/iotglove_refresh_request');
    }

    render(){
        return (
            <>
            <h1>ss</h1>
            <button onClick={this.refresh} style={{ position: 'absolute', top: '40px', left: '450px' }}>새로고침</button>
            </>
        )
    }
}
export default Iotglove;