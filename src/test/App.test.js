import {render, screen} from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
    render(<App/>);

    testByCustomeElement();
});
const testByCustomeElement = () => {
    // you can test any component by custom element
    const linkElement = screen.getByTestId('app-element')
    expect(linkElement).toBeInTheDocument();
}