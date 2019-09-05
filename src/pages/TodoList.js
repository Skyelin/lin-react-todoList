import React, { Component } from 'react'
import TodoItem from '../components/todoItem'
import './todoList.scss'

export default class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [],
      isAllChecked: false,
      numDone: 0,
    }
    this.handlerOnchange = this.handlerOnchange.bind(this)
    this.handlerAddNewTodo = this.handlerAddNewTodo.bind(this)
    this.handlerAllChecked = this.handlerAllChecked.bind(this)
    this.handlerDeleteAll = this.handlerDeleteAll.bind(this)
    this.handlerSetState = this.handlerSetState.bind(this)
  }
  handlerOnchange(e) {
    this.setState({
      newTodo: e.target.value
    })
  }
  handlerAddNewTodo(e) {
    let item = {text: this.state.newTodo,done:false,edit:false}
    let list = [...this.state.todoList]
    list.unshift(item)
    if(e.keyCode === 13 && item.text.trim()) {
      this.handlerSetState(list,'add')    
      // this.setState({
      //   // todoList: this.state.todoList.push(item) //不能这样写，因为.push等函数用于操作调用他的数组，返回的是修改后的数组长度
      //   todoList: list,
      //   newTodo: '',
      //   isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
      //   numDone: list.filter(x => x.done === true).length
      // })
    }
  }
  handlerCheckItem(index) {
    let list = [...this.state.todoList]
    list[index].done = !list[index].done
    this.handlerSetState(list)    
    // this.setState({
    //   todoList: list,
    //   isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
    //   numDone: list.filter(x => x.done === true).length
    // })
  }
  handlerDeleteItem(index) {
    let list = [...this.state.todoList]
    list.splice(index, 1)
    this.handlerSetState(list)    
    // this.setState({
    //   todoList: list,
    //   isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
    //   numDone: list.filter(x => x.done === true).length
    // })
  }
  handlerKeyUp(index,e) {
    if(e.keyCode === 13){
      this.handlerBlur(index)
    }
  }
  handlerBlur(index) {
    let list = [...this.state.todoList]
    list[index].edit=!list[index].edit
    this.handlerSetState(list)    
      // this.setState({
      //   todoList: list
      // })
  }
  handlerShowEdit(index) {
    let list = [...this.state.todoList]
    list[index].edit= !list[index].edit
    this.handlerSetState(list)    
    // this.setState({
    //   todoList: list
    // })
  }
  handlerEditItem(index,e) {
    let text = e.target.value
    let list = [...this.state.todoList]
    list[index].text=text
    this.handlerSetState(list)
    // this.setState({
    //   todoList: list
    // })
  }
  handlerAllChecked() {
    let list = [...this.state.todoList]
    list.forEach(item => item.done = !this.state.isAllChecked)
    this.handlerSetState(list)
    // this.setState({
    //   todoList: list,
    //   isAllChecked: !this.state.isAllChecked,
    //   numDone: this.state.todoList.filter(x => x.done === true).length
    // })
  }
  handlerDeleteAll() {
    let list = this.state.todoList.filter(x => x.done !== true)
    this.handlerSetState(list)
    // this.setState({
    //   todoList: list,
    //   isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
    //   numDone: list.filter(x => x.done === true).length
    // })
  }
  handlerSetState(list,type) {
    let newTodo = ''
    if(type !== 'add') {
      newTodo = this.state.newTodo
    }
    this.setState({
      todoList: list,
      isAllChecked: list.findIndex(x => x.done === false) === -1 ? true:false,
      numDone: list.filter(x => x.done === true).length,
      newTodo: newTodo
    })
  }
  render() {
    let { newTodo, isAllChecked, numDone, todoList} = this.state
    return (
      <div className="pg-todo-list">
        <div className="todo-box">
          <h1>TodoList</h1>
          <input 
            className="todo-input"
            value={newTodo}
            type="text"
            onChange={this.handlerOnchange} 
            onKeyUp={this.handlerAddNewTodo}
            placeholder="请输入计划"/>
            <div className="all-check">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={this.handlerAllChecked}
              />全部已完成
            </div>
            <ul className="todo-list">
              {todoList.map((item,index) =>
                <TodoItem 
                  item={item}
                  index={index}
                  key={index}
                  onCheckItem={this.handlerCheckItem.bind(this,index)}
                  onDeleteItem={this.handlerDeleteItem.bind(this,index)}
                  onKeyUp={this.handlerKeyUp.bind(this,index)}
                  onBlur={this.handlerBlur.bind(this,index)}
                  onEditItem={this.handlerEditItem.bind(this,index)}
                  onShowEdit={this.handlerShowEdit.bind(this,index)}
                  />
              )}
            </ul>
            <div className={todoList.length===0?"todo-footer-dis-none":"todo-footer"}>
              <span className="fl">
                <b>{ todoList.length-numDone }</b>个未完成</span>
              <span 
                className="todo-clear-done" 
                onClick={this.handlerDeleteAll}>删除{ numDone }个已完成</span>
            </div>
        </div>
      </div>
    )
  }
}
