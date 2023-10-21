import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleThemeButton } from 'react-admin';
import React from "react";
test('renders learn react link', () => {
    // Check if the component renders
    render(<ToggleThemeButton />);

    const toggleButton = screen.getByLabelText('Toggle Theme');

    const firstButtonIcon = screen.getByTestId('Brightness4Icon');

    // Check if the component renders
    expect(toggleButton).toBeInTheDocument();


    fireEvent.click(toggleButton);

    expect(firstButtonIcon).not.toBeInTheDocument();
});