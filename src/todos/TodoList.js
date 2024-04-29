import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {
  getTodos,
  getTodosLoading,
  getIncompleteTodos,
  getCompletedTodos,
} from './selectors';
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from './thunks';
import { isLoading } from './reducers';
import styled from 'styled-components';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  incompleteTodos,
  completedTodos,
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessege = <div>Loading todos...</div>;
  const content = (
    <>
      <ListWrapper>
        <NewTodoForm />
        <h3>Incompleted Todos:</h3>
        {incompleteTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
          />
        ))}
      </ListWrapper>
      <ListWrapper>
        <h3>Completed Todos:</h3>
        {completedTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
          />
        ))}
      </ListWrapper>
    </>
  );

  return isLoading ? loadingMessege : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
