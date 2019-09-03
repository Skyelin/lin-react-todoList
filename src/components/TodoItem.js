import React, { Component } from 'react'
import './TodoItem.scss'

export default class TodoItem extends Component {
  // componentWillReceiveProps
  componentDidUpdate() {
    if(this.props.item.edit){
      this.refs.inp.focus()
    }
  }
  render() {
    let item = {...this.props.item}
    return (
      <li className='cp-todo-item'>
        {item.edit ?
          <div>
            <input  
              ref="inp"
              onFocus={this.onFocus}
              value={item.text}
              className="edit-input"
              onChange={this.props.onchangeText}
              onBlur={this.props.blur}
              onKeyUp={this.props.keyUp}/>
          </div> 
          :
          <div onDoubleClick={this.props.handlerChangeEdit}>
            <input 
              checked={item.done}
              type="checkbox"
              onChange={this.props.checkTodoItem}
            />
            <label className={ item.done ? 'line-through': '' }>
              {item.text}
            </label>
            <span className="destroy-button"
              onClick={this.props.deleteTodoItem}></span>
          </div>}
      </li>

    )
  }
}

