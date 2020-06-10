import React, { useState } from 'react';
import Filter from '../components/Filter';

export default {
    title: 'Filter',
    component: Filter,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Base = () => {
    const [filterText, setFilterText] = useState('');
    return (
        <div style={{ width: 300 }}>
            <Filter
                placeholder="Filter..."
                value={filterText}
                onChange={(newFilterText) => setFilterText(newFilterText)}
            />
        </div>
    );
};
