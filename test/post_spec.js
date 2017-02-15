import { expect } from 'chai';
import * as types from '../common/routes/Post/constants';
import reducer from '../common/routes/Post/reducer';

describe('Post Reducer', () => {
  const initialState = {
    lastFetched: null,
    isLoading: false,
    error: null,
    tags: [],
    title: '',
    slug: '',
    subtitle: '',
    picture: '',
    client: '',
    content: '',
  };

  it('should return default state if action is undefined', () => {
    const nextState = reducer(initialState, 'BLAH');
    expect(nextState).to.deep.equal(initialState);
  });

  it('should handle LOAD_POST_REQUEST', () => {
    const action = {
      type: types.LOAD_POST_REQUEST,
    };

    const expectedNextState = {
      lastFetched: null,
      isLoading: true,
      error: null,
      tags: [],
      title: '',
      slug: '',
      subtitle: '',
      picture: '',
      client: '',
      content: '',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });

  it('should handle LOAD_POST_SUCCESS', () => {
    const post = {
      tags: ['Design', 'Front end', 'Back end', 'UX'],
      title: 'Save for something.',
      slug: 'sparebank1-savings-calculator',
      subtitle: 'Savings calculator developed for Sparebank1 in Norway',
      picture: '/media/sparebank1-sparkalkulator.jpg',
      client: '',
      content: 'Lorem hipsum dipsum',
    };
    const currentTime = Date.now();
    const action = {
      type: types.LOAD_POST_SUCCESS,
      payload: post,
      meta: {
        lastFetched: currentTime,
      },
    };

    const expectedNextState = {
      lastFetched: currentTime,
      isLoading: false,
      error: null,
      tags: ['Design', 'Front end', 'Back end', 'UX'],
      title: 'Save for something.',
      slug: 'sparebank1-savings-calculator',
      subtitle: 'Savings calculator developed for Sparebank1 in Norway',
      picture: '/media/sparebank1-sparkalkulator.jpg',
      client: '',
      content: 'Lorem hipsum dipsum',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });

  it('should handle LOAD_POST_FAILURE', () => {
    const error = new Error('Invalid request');
    const action = {
      type: types.LOAD_POST_FAILURE,
      payload: error,
      error: true,
    };

    const expectedNextState = {
      lastFetched: null,
      isLoading: false,
      error,
      tags: [],
      title: '',
      slug: '',
      subtitle: '',
      picture: '',
      client: '',
      content: '',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });
});
