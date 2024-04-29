import { todos } from '../reducers';
import { expect } from 'chai';

describe('todos reducer', () => {
  it('Adds a new todo when CREATE_TODO action is received', () => {
    const fakeTodo = { text: 'fake todo', isCompleted: false };
    const fakeAction = {
      type: 'CREATE_TODO',
      payload: {
        todo: fakeTodo,
      },
    };

    const OriginalState = {
      isLoading: false,
      data: [],
    };

    const expected = {
      isLoading: false,
      data: [fakeTodo],
    };

    const actual = todos(OriginalState, fakeAction);
    expect(actual).to.deep.equal(expected);
  });
});
