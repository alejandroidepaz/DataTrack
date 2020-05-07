import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../src/Home';
import { TouchableOpacity } from 'react-native';

const promise = Promise.resolve('success')
const mockFn = jest.fn(() => promise);

const mockNavigation = {
  navigate: mockFn
}

describe('Home Component', () => {
  const component = renderer.create(<Home navigation={mockNavigation}/>);

  it('should render', () => {
    expect(component).not.toBeNull();
  });

  const addNewChart = component.root.findByProps({ title: "Create new..." });

  it(`should include a 'Create new' chart button`, () => {
    expect(addNewChart).not.toBeNull();
  });

  it(`should navigate to the charts page when pressing the 'Create new' button`, () => {
    // simulate click on 'create new' button
    addNewChart.findByType(TouchableOpacity).props.onPress();

    // ensure navigation function was called 1 time with the argument 'Chart'
    expect(mockNavigation.navigate.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('Chart');
  });
});