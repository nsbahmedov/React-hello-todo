import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllTodos, removeTodo } from '../slices/TodoSlice'
import styled, { css } from 'styled-components';

const NewTodo = styled.div`
    padding: 0.5rem;
    border: 2px dotted #eee;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;

    ${props => props.level === 'middle' && css`
        background-color: gold;
    ` }
    ${props => props.level === 'low' && css`
        background-color: lightcyan;
    ` }
    ${props => props.level === 'high' && css`
        background-color: tomato;
    ` }
`

const RemoveBtn = styled.button`
    border-style: none;
    padding: 0 0.5rem;
    background-color: transparent;
    margin-left: 0.5rem;
    cursor: pointer;
     :hover {
         transform: scale(1.1);
     }
`

const TodoList = () => {

    const dispatch = useDispatch()

    const allTodos = useSelector(state => getAllTodos(state))



    let displayTodos = allTodos.map(td => (
        <NewTodo level={td.level} key={td.id}>
            <p>{td.text}</p>
            <div className='buttons'>
                <input
                    type='checkbox'
                    onChange={(e) => {
                        let element = e.target.parentElement.parentElement
                        element.style.textDecoration = e.target.checked
                            ? 'line-through'
                            : null
                        element.style.color = e.target.checked
                            ? 'grey'
                            : null
                    }}
                />
                <RemoveBtn
                    onClick={() => {
                        let finded = allTodos.find(todo => todo.id === td.id)
                        let index = allTodos.indexOf(finded)
                        dispatch(removeTodo(index))
                    }}
                >X</RemoveBtn>
            </div>
        </NewTodo>
    ))

    if (allTodos.length > 0) {
        return (
            <div>
                {displayTodos}
            </div>
        )
    }


    else {
        return (
            <div>
                <h4>You have no todos yet :)</h4>
            </div>
        )
    }
};



export default TodoList;
