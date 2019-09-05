import React, { Component } from 'react'
import './todoItem.scss'

export default class TodoItem extends Component {
  // componentWillReceiveProps
  componentDidUpdate() {
    if(this.props.item.edit){
      this.refs.inp.focus()
    }
  }
  render() {
    let { item, onEditItem, onBlur, onKeyUp, onShowEdit, onCheckItem, onDeleteItem} = this.props
    return (
      <li className='cp-todo-item'>
        {item.edit ?
          <div>
            <input  
              ref="inp"
              value={item.text}
              className="edit-input"
              onChange={onEditItem}
              onBlur={onBlur}
              onKeyUp={onKeyUp}/>
          </div> 
          :
          <div onDoubleClick={onShowEdit}>
            <input 
              checked={item.done}
              type="checkbox"
              onChange={onCheckItem}
            />
            <label className={ item.done ? 'line-through': '' }>
              {item.text}
            </label>
            <span className="destroy-button"
              onClick={onDeleteItem}></span>
          </div>}
      </li>

    )
  }
}

