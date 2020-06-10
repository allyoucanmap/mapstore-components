import React, { useState } from 'react';
import Label from '../components/Label';
import Input from '../components/Input';

export default {
    title: 'Input',
    component: Input,
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
            <Input
                placeholder="Input..."
                value={filterText}
                onChange={(value) => setFilterText(value)}
            />
        </div>
    );
};

export const WithLabel = () => {
    const [filterText, setFilterText] = useState('');
    return (
        <div style={{ width: 300 }}>
            <Label>Input</Label>
            <Input
                placeholder="Input..."
                value={filterText}
                onChange={(value) => setFilterText(value)}
            />
        </div>
    );
};
