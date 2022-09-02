import React from "react";
import Note from "./Note";
import refreshBtn from '../Icons/refresh.svg';
import submitBtn from '../Icons/submit.svg';

class Crud extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data : [],
      text : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.postData = this.postData.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    fetch(process.env.REACT_APP_CURRENCY_URL)
    .then(response => response.json())
    .then(data => this.setState({data: data}))
  }

  handleChange(event){
    this.setState({text: event.target.value})
  }

  async postData(event){
    const data = {content:this.state.text, id:0}
    await fetch(process.env.REACT_APP_CURRENCY_URL,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    this.fetchData()
    this.setState({text:''})
  }

  async deleteData(id){
    await fetch(process.env.REACT_APP_CURRENCY_URL + id,{
      method: "DELETE"
    })
    this.fetchData()
  }

  render(){
    return(
      <div className="Crud">

        <div className="Crud__head">
          <h1>Notes</h1>
          <button onClick = {this.fetchData}><img src = {refreshBtn} alt="" /></button>
        </div>

        <div className="Crud__notes">
          {this.state.data.map((e) => 
            <Note 
              key = {e.id} 
              onDelete = {() => this.deleteData(e.id)} 
              data = {e.content}
            />)
          }
        </div>
        
        <div className="Crud__text-container">
            <textarea className="Crud__text" onChange={this.handleChange} value={this.state.text}></textarea>
            <button className="Crud__submit" onClick={this.postData}><img src = {submitBtn} alt = ''/></button>
        </div>

      </div>
    )
  }
}

export default Crud