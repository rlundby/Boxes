import React from 'react';
import {mount, shallow } from 'enzyme';

import ConfirmModal from './ConfirmModal';

const clickFn = jest.fn();

describe('ConfirmModal', () => {
    it('should fire function on button press', () => {
        const component = shallow(<ConfirmModal type="success" hideModal={clickFn}/>);
        component.find('button#button-toggle').simulate('click')
        expect(clickFn).toHaveBeenCalled();
    })

    it('should match snapshot', () => {
        const component = shallow(<ConfirmModal/>);
        expect(component).toMatchSnapshot();
    })

    it('should have className failed if post failed', () => {
        const component = mount(<ConfirmModal type="failed"/>);
        expect(component.childAt(0).hasClass('failed-modal')).toBe(true);
    })

    it('should not have className failed if post was successful', () => {
        const component = mount(<ConfirmModal type="success"/>);
        expect(component.childAt(0).hasClass('failed-modal')).toBe(false);
    })
})