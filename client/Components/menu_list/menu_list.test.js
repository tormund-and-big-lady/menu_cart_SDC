import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MenuList from './menu_list';

describe('testing MenuList component', ()=> {

	//shallow rendering by Enzyme
	it('should return a single-node wrapper.', ()=> {
		expect(shallow(<MenuList menuData={[]}/>).length).toEqual(0)
    })
    
    
	//snapshot testing by Jest
	// it('should grab a snapshot of the component.', ()=> {
	// 	const component = renderer.create(<App />)
	// 	let tree = component.toJSON();
	// 	expect(tree).toMatchSnapshot();
	// })

})