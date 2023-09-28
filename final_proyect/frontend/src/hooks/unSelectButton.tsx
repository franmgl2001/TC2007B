import { useListContext, useUnselect } from 'react-admin';
import React from 'react';

export const UnselectButton = () => {
    const { resource, selectedIds } = useListContext();
    const unselect = useUnselect(resource);

    const handleClick = () => {
        unselect(selectedIds);
    };

    return (
        <button onClick={handleClick}>
            {`Unselect ${selectedIds.length} records`}
        </button>
    );
};
