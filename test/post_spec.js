import { expect } from 'chai';
import * as types from '../src/constants';
import reducer from '../src/routes/Post/reducer';

// Remove this
import fakeDB from '../src/server/fakeDB.js';

describe('Post Reducer', () => {

  it('should return default state if action is undefined', () => {
    const initialState = [];
    const nextState = reducer(initialState, 'BLAH');
    expect(nextState).to.deep.equal(initialState);
  });

  it('should handle LOAD_POSTS_REQUEST', () => {
    const initialState = {
      lastFetched: null,
      isLoading: false,
      error: null,
      data: [],
    };

    const action = {
      type: types.LOAD_POST_REQUEST,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      lastFetched: null,
      isLoading: true,
      error: null,
      data: [],
    });
  });

  it('should handle LOAD_POSTS_SUCCESS', () => {
    const initialState = {
      lastFetched: null,
      isLoading: false,
      error: null,
      data: [],
    };

    const post = {
      id: '128sd043hd',
      title: 'Cloth Talk Part I',
      slug: 'cloth-talk-part-i',
      content: 'Khaled Ipsum is a major key to success.',
    };

    const action = {
      type: types.LOAD_POST_SUCCESS,
      body: post,
      lastFetched: Date.now(),
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      lastFetched: Date.now(),
      isLoading: false,
      error: null,
      data: post,
    });
  });

  it('should handle LOAD_POST_FAILURE', () => {
    const initialState = {
      lastFetched: null,
      isLoading: false,
      error: null,
      data: {},
    };
    const action = {
      type: types.LOAD_POST_FAILURE,
      error: 'Invalid Request',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      lastFetched: null,
      isLoading: false,
      error: 'Invalid Request',
      data: {},
    });
  });
});
