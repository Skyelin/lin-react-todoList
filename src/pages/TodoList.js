import React, { Component } from 'react'
import TodoItem from '../components/TodoItem'
import './TodoList.scss'

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
    if(e.keyCode === 13) {
      this.setState({
        // todoList: this.state.todoList.push(item) //不能这样写，因为.push等函数用于操作调用他的数组，返回的是修改后的数组长度
        todoList: list,
        newTodo: '',
        isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
        numDone: list.filter(x => x.done === true).length
      })
    }
  }
  handlerCheckTodoItem(index) {
    let list = [...this.state.todoList]
    list[index].done = !list[index].done
    this.setState({
      todoList: list,
      isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
      numDone: list.filter(x => x.done === true).length
    })
  }
  handlerDeleteTodoItem(index) {
    let list = [...this.state.todoList]
    list.splice(index, 1)
    this.setState({
      todoList: list,
      isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
      numDone: list.filter(x => x.done === true).length
    })
  }
  handlerKeyUp(index,e) {
    if(e.keyCode === 13){
      this.handlerBlur(index)
    }
  }
  handlerBlur(index) {
    let list = JSON.parse(JSON.stringify(this.state.todoList))
      list[index].edit=!list[index].edit
      this.setState({
        todoList: list
      })
  }
  handlerChangeEdit(index) {
    let list = JSON.parse(JSON.stringify(this.state.todoList))
    list[index].edit= !list[index].edit
    this.setState({
      todoList: list
    })
  }
  handlerOnchangeText(index,e) {
    let text = e.target.value
    let list = [...this.state.todoList]
    list[index].text=text
    this.setState({
      todoList: list
    })
  }
  handlerAllChecked() {
    let list = [...this.state.todoList]
    list.forEach(item => item.done = !this.state.isAllChecked)
    this.setState({
      todoList: list,
      isAllChecked: !this.state.isAllChecked,
      numDone: this.state.todoList.filter(x => x.done === true).length
    })
  }
  handlerDeleteAll() {
    let list = this.state.todoList.filter(x => x.done !== true)
    this.setState({
      todoList: list,
      isAllChecked: list.findIndex(x => x.done === false) === -1 ? true: false,
      numDone: list.filter(x => x.done === true).length
    })
  }
  render() {
    return (
      <div className="pg-todo-list">
        <div className="todo-box">
          <h1>TodoList</h1>
          <input 
            className="todo-input"
            value={this.state.newTodo}
            type="text"
            onChange={this.handlerOnchange} 
            onKeyUp={this.handlerAddNewTodo}
            placeholder="请输入计划"/>
            <div className="all-check">
              <input
                type="checkbox"
                checked={this.state.isAllChecked}
                onChange={this.handlerAllChecked}
              />全部已完成
            </div>
            <ul className="todo-list">
              {this.state.todoList.map((item,index) =>
                <TodoItem 
                  item={item}
                  index={index}
                  key={index}
                  checkTodoItem={this.handlerCheckTodoItem.bind(this,index)}
                  deleteTodoItem={this.handlerDeleteTodoItem.bind(this,index)}
                  keyUp={this.handlerKeyUp.bind(this,index)}
                  blur={this.handlerBlur.bind(this,index)}
                  onchangeText={this.handlerOnchangeText.bind(this,index)}
                  handlerChangeEdit={this.handlerChangeEdit.bind(this,index)}
                  />
              )}
            </ul>
            <div className={this.state.todoList.length===0?"todo-footer-dis-none":"todo-footer"}>
              <span className="fl">
                <b>{ this.state.todoList.length-this.state.numDone }</b>个未完成</span>
              <span 
                className="todo-clear-done" 
                onClick={this.handlerDeleteAll}>删除{ this.state.numDone }个已完成</span>
            </div>
        </div>
      </div>
    )
  }
}
