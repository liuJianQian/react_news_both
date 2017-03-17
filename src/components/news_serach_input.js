import React, {Component} from 'react';
import {Link} from 'react-router'
import axios from 'axios'
import {
    AutoComplete,
    // Input,
    Icon } from 'antd';

/*function onSelect(value){
    console.log('onSelect', value);
}*/
export default class SerachInput extends Component{

    state = {
        dataSource: [],
    }


    /*handleChange = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                    value,
                    value + value,
                    value + value + value,
                ],
        });
    }*/

    

    // 搜索 --> 选中 option，或 input 的 value 变化时，调用此函数
    handleChange = (value) => {
        let dataSource = (value ? this.searchResult(value) : [])
            .map(item => {
                return <Option key={item.category}  text={item.category}>
                    <Link to={`/news_detail/${item.uniquekey}`}>
                        {item.query}
                    </Link>
                </Option>
            })
        this.setState({dataSource})
        console.log('输入值：' + value)
    }



    // 搜索 --> 匹配结果集
    searchResult = (query) => {
        const {type} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=200`
        axios.get(url)
            .then(response => {
                const titleArr = response.data.map((ele, idx) => {
                    return {
                        uniquekey: ele.uniquekey,
                        query: ele.title,
                        category: `${query}${idx}`
                    }
                })
                this.setState({titleArr})
            })
        console.log('返回结果')
        // 返回结果集-->对象数组
        return this.state.titleArr.filter(item => {
            console.log(item)
            return item.query.indexOf(query)> - 1
        })
    }



    render(){
        const { dataSource } = this.state;

        return(
            <div style={{ width: 250 }}>
                <AutoComplete
                    className="global-search"
                    size="large"
                    style={{ width: '100%' }}
                    dataSource={dataSource} // 自动完成的数据源
                    onChange={this.handleChange}    // input的value变化时，调用
                    placeholder="搜索"
                    optionLabelProp="text"
                >
                    {/*<Input suffix={<Icon type="search" className="certain-category-icon" />} />*/}
                </AutoComplete>
            </div>
        )
    }
}