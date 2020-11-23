import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Button } from 'antd';

import Search from './Search';
import { getMockStore } from '../../test-utils/mocks'
import { history } from '../../store/store'

import userActionCreators from '../../store/actions/user';
import tagActionCreators from '../../store/actions/tag';

jest.mock('../../components/SearchedUser/SearchedUser', () => {
    return jest.fn(props => {
        return (
            <div className="spySearchedUser">
                <div className="click-searched-user" onClick={props.onClick}> 
                    {props.addOrDelete}
                </div>
            </div>
        )
    });
});

jest.mock('../../components/SearchedTag/SearchedTag', () => {
    return jest.fn(props => {
        return (
            <div className="spySearchedTag">
                <div className="click-searched-user" onClick={props.onClick}> 
                    {props.addOrDelete}
                </div>
            </div>
        )
    });
});

const stubInitialState = {
    userList: null,
    currentUser: null,
    tagList: null,
}

const mockStore = getMockStore(stubInitialState);

describe('<Search />', () => {
    let search, spyGetUserList, spyGetCurrentUser, spyPutUser, spyGetTagList;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        search = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={Search} />
              </Switch>
              </ConnectedRouter>
            </Provider>
        );
        spyGetUserList = jest.spyOn(userActionCreators, 'getUserList')
            .mockImplementation(() => { return dispatch => {}; });
        spyGetCurrentUser = jest.spyOn(userActionCreators, 'getCurrentUser')
            .mockImplementation(() => { return dispatch => {}; });
        spyPutUser = jest.spyOn(userActionCreators, 'putUser')
            .mockImplementation(() => { return dispatch => {}; });
        spyGetTagList = jest.spyOn(tagActionCreators, 'getTagList')
            .mockImplementation(user => { return dispatch => {}; });
    })

    it('should render SearchedUser', () => {
        const component = mount(search);
        const wrapper = component.find('.spySearchedUser');
        expect(wrapper.length).toBe(1);
        //expect(wrapper.at(0).text()).toBe('ARTICLE_TITLE');
    });
});