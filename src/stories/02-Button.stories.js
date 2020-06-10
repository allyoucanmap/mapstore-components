import React from 'react';
import Button from '../components/Button';
import Glyph from '../components/Glyph';

export default {
    title: 'Button',
    component: Button,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
};

export const Square = () => (
    <>
        <Button square size="lg">
            <Glyph name="polygon" />
        </Button>
        <Button square size="md">
            <Glyph name="polygon" />
        </Button>
        <Button square size="sm">
            <Glyph name="polygon" />
        </Button>
        <Button square active size="lg">
            <Glyph name="polygon" />
        </Button>
        <Button square active size="md">
            <Glyph name="polygon" />
        </Button>
        <Button square active size="sm">
            <Glyph name="polygon" />
        </Button>
        <Button square disabled size="lg">
            <Glyph name="polygon" />
        </Button>
        <Button square disabled size="md">
            <Glyph name="polygon" />
        </Button>
        <Button square disabled size="sm">
            <Glyph name="polygon" />
        </Button>
        <Button square theme="primary" size="lg">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" size="md">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" size="sm">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" active size="lg">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" active size="md">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" active size="sm">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" disabled size="lg">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" disabled size="md">
            <Glyph name="search" />
        </Button>
        <Button square theme="primary" disabled size="sm">
            <Glyph name="search" />
        </Button>
        <Button square theme="success" size="lg">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" size="md">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" size="sm">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" active size="lg">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" active size="md">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" active size="sm">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" disabled size="lg">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" disabled size="md">
            <Glyph name="plus" />
        </Button>
        <Button square theme="success" disabled size="sm">
            <Glyph name="plus" />
        </Button>
    </>
);

export const Theme = () => (
    <>
        <Button>Default</Button>
        <Button theme="primary">Primary</Button>
        <Button theme="success">Success</Button>
    </>
);

export const Size = () => (
    <>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
    </>
);

export const State = () => (
    <>
        <Button active>Active</Button>
        <Button disabled>Disabled</Button>
    </>
);