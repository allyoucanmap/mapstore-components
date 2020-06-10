import React from 'react';
import Glyph from '../components/Glyph';

export default {
    title: 'Glyph',
    component: Glyph,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
};

export const Name = () => (<>
    <Glyph name="polygon" />
</>);

export const Sqaure = () => (<>
    <Glyph name="search" square size="sm" />
    <Glyph name="search" square size="md" />
    <Glyph name="search" square size="lg" />
</>);
