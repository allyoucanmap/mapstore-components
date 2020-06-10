import React from 'react';
import Card from '../components/Card';

export default {
    title: 'Card',
    component: Card,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
}

export const Container = () => (
    <div style={{ width: 300 }}>
        <Card
            style={{ padding: 'var(--padding-lg)', border: '1px solid var(--border-color)' }}>
            Card
        </Card>
    </div>
);