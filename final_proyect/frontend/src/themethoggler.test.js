import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleThemeButton } from 'react-admin';
import '@testing-library/jest-dom';


test('toggle theme button toggles the theme', () => {
    // Render the component
    render(<ToggleThemeButton />);

    // Find the button element
    const toggleButton = screen.getByLabelText('Toggle Theme');
    // Get the button icon
    const firstButtonIcon = screen.getByTestId('Brightness4Icon');

    //Check if the button element is present in the document
    expect(toggleButton).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(toggleButton);


    // Expect the button icon to change so it should not be present in the document
    expect(firstButtonIcon).not.toBeInTheDocument();

});
