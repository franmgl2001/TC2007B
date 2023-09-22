import React from 'react';
import { useDeleteMany } from 'react-admin';

interface BulkDeletePostsButtonProps {
    selectedIds: string[]; // Replace with the actual type of your selectedIds
}

const BulkDeletePostsButton: React.FC<BulkDeletePostsButtonProps> = ({ selectedIds }) => {
    const [deleteMany, { isLoading, error }] = useDeleteMany(
        'posts',
        { ids: selectedIds }
    );

    const handleClick = () => {
        deleteMany();
    };

    if (error) {
        return <p>ERROR</p>;
    }

    return <button disabled={isLoading} onClick={handleClick}>Delete selected posts</button>;
};

export default BulkDeletePostsButton;
