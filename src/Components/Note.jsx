import React from "react";
import close from '../Icons/delete.svg'

class Note extends React.Component{

  render (){
    return(
      <div className="Note">
        <p className="Note__text">{this.props.data}</p>
        <button className="Note__delete" onClick={this.props.onDelete}>
          <img src={close} alt = ''></img>
        </button>
      </div>
    )
  }
}

export default Note