import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../slices/TodoSlice'
import styled, { css } from 'styled-components';

const TodoForm = () => {

  const dispatch = useDispatch()

  const [todo, setTodo] = useState('')
  const [level, setLevel] = useState('low')
  const btnDisabled = todo.length > 0 ? false : true



  const handleSubmit = (e) => {
    if (todo !== '') {
      dispatch(addNewTodo(todo, level));
      setTodo('')
    }
    // 
    e.preventDefault()
  }


  return <div>
    <Form onSubmit={handleSubmit}>
      <FormTop>
        <Input
          onChange={e => setTodo(e.target.value)}
          value={todo}
          placeholder='type a todo...'
        />
        <Select
          onChange={e => setLevel(e.target.value)}
          value={level}
        >
          <option value={'low'} >
            just do it
          </option>
          <option value={'middle'}>
            remember to do
          </option>
          <option value={'high'}>
            it's really important
          </option>

        </Select>
      </FormTop>
      <Button disabled={btnDisabled}>Add to list</Button>
    </Form>
  </div>;
};

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
 
`

const FormTop = styled.div`
  border: 1px solid #eee;
  border-radius: 0.5rem;
  width: 80%;
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  border-style: none;
  padding: 0.7rem;
  outline: none;
  width: 100%;
`

const Select = styled.select`
  border-style: none;
  border-radius: 0.5rem;
  padding: 0.7rem;

  ${props => props.value === 'low' && css`
    background-color: lightcyan;
  `}
  ${props => props.value === 'middle' && css`
    background-color: gold;
  `}
  ${props => props.value === 'high' && css`
    background-color: tomato;
  `}
`

const Button = styled.button`
  border: 1px dotted teal;
  border-radius: 0.5rem;
  background-color: greenyellow;
  padding: 0 1rem;
  width: 18%;
  cursor: pointer;
    :hover {
      background-color: lightgreen;
    }
  ${props => props.disabled === true && css`
    background-color: #eee;
  `}
`




export default TodoForm;
