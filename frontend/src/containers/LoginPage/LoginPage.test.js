import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import { getMockStore } from '../../test-utils/mocks'
import { history } from '../../store/store'

import * as userActionCreators from '../../store/actions/user';

jest.mock('../../../node_modules/antd/lib/button', () => {
    return jest.fn(props => {
        return (
            <div className="spyButton" onClick={() => props.onClick()}/>
        )
    });
});

const stubInitialState = {
    currentUser: {
        id: 1, 
        username: 'User1',
        login: true,
        avatar: null, 
        chatroom: -1, 
        friendList: [2],
        postList: [1, 5],
        shallWeRoomList: [1], 
        watchedPostList: [1, 2, 3], 
        tagList: [1]
    }
}

const mockStore = getMockStore(stubInitialState);

describe('<RoomInfo />', () => {
    let login, spyLogin;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={LoginPage} />
              </Switch>
              </ConnectedRouter>
            </Provider>
        );

        spyLogin= jest.spyOn(userActionCreators, 'login')
            .mockImplementation(() => { return dispatch => {}; });
    })

    it('should handle login', () => {
        const component = mount(login);
        let wrapper = component.find('.LoginPage');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.spyButton');
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
    });

});