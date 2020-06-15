import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import * as Auth0Hooks from '../../react-auth0-spa';

describe('<Navbar /> component', () => {
  it('should show only login button when unauthenticated', () => {
    jest.spyOn(Auth0Hooks, 'useAuth0').mockImplementation(() => ({
      isAuthenticated: false
    }));

    const { getByText} = render(<Navbar setPastSearchVisible={() => {}} getPastSearches={() => {}}/>);

    expect(getByText('Login')).toBeTruthy();
    expect(() => {getByText('Logout')}).toThrowError();
  })

  it('should show only logout and past searches button when unauthenticated', () => {
    jest.spyOn(Auth0Hooks, 'useAuth0').mockImplementation(() => ({
      isAuthenticated: true
    }));

    const { getByText} = render(<Navbar setPastSearchVisible={() => {}} getPastSearches={() => {}}/>);

    expect(getByText('Logout')).toBeTruthy();
    expect(getByText('Past Searches')).toBeTruthy();
    expect(() => {getByText('Login')}).toThrowError();
  })

  it('should call loginWithRedirect when clicked', () => {
    const myMock = jest.fn();
    jest.spyOn(Auth0Hooks, 'useAuth0').mockImplementation(() => ({
      isAuthenticated: false,
      loginWithRedirect: myMock
    }));

    const { getByText} = render(<Navbar setPastSearchVisible={() => {}} getPastSearches={() => {}}/>);

    fireEvent.click(getByText('Login'));
    expect(myMock.mock.calls.length).toBe(1);
  })

  it('should call logout when clicked', () => {
    const myMock = jest.fn();
    jest.spyOn(Auth0Hooks, 'useAuth0').mockImplementation(() => ({
      isAuthenticated: true,
      logout: myMock
    }));

    const { getByText} = render(<Navbar setPastSearchVisible={() => {}} getPastSearches={() => {}}/>);

    fireEvent.click(getByText('Logout'));
    expect(myMock.mock.calls.length).toBe(1);
  })


})