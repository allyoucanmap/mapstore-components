import React from 'react';
import Toolbar from '../components/Toolbar';

export default {
    title: 'Toolbar',
    component: Toolbar,
    parameters: {
        info: {
            header: false,
            source: true,
            inline: true
        },
    },
};

export const SquareButtons = () => (<>
    <Toolbar
        buttonProps={{
            square: true,
            size: 'sm'
        }}
        buttons={[
            {
                glyph: 'plus',
                theme: 'primary'
            },
            {
                glyph: 'minus',
                disabled: true
            },
            {
                glyph: 'user',
                theme: 'success'
            },
            {
                glyph: 'polygon',
                loading: true
            },
            {
                glyph: 'line',
                visible: false
            }
        ]}
    />
    <Toolbar
        buttonProps={{
            square: true,
            size: 'md'
        }}
        buttons={[
            {
                glyph: 'plus',
                theme: 'primary'
            },
            {
                glyph: 'minus',
                disabled: true
            },
            {
                glyph: 'user',
                theme: 'success'
            },
            {
                glyph: 'polygon',
                loading: true
            },
            {
                glyph: 'line',
                visible: false
            }
        ]}
    />
    <Toolbar
        buttonProps={{
            square: true,
            size: 'lg'
        }}
        buttons={[
            {
                glyph: 'plus',
                theme: 'primary'
            },
            {
                glyph: 'minus',
                disabled: true
            },
            {
                glyph: 'user',
                theme: 'success'
            },
            {
                glyph: 'polygon',
                loading: true
            },
            {
                glyph: 'line',
                visible: false
            }
        ]}
    />
</>);

export const Vertical = () => (
    <>
        <Toolbar
            buttonProps={{
                square: true,
                size: 'sm'
            }}
            buttons={[
                {
                    glyph: 'plus',
                    theme: 'primary'
                },
                {
                    glyph: 'minus',
                    disabled: true
                },
                {
                    glyph: 'user',
                    theme: 'success'
                },
                {
                    glyph: 'polygon',
                    loading: true
                },
                {
                    glyph: 'line',
                    visible: false
                }
            ]}
            vertical
        />
        <Toolbar
            buttonProps={{
                square: true,
                size: 'md'
            }}
            buttons={[
                {
                    glyph: 'plus',
                    theme: 'primary'
                },
                {
                    glyph: 'minus',
                    disabled: true
                },
                {
                    glyph: 'user',
                    theme: 'success'
                },
                {
                    glyph: 'polygon',
                    loading: true
                },
                {
                    glyph: 'line',
                    visible: false
                }
            ]}
            vertical
        />
        <Toolbar
            buttonProps={{
                square: true,
                size: 'lg'
            }}
            buttons={[
                {
                    glyph: 'plus',
                    theme: 'primary'
                },
                {
                    glyph: 'minus',
                    disabled: true
                },
                {
                    glyph: 'user',
                    theme: 'success'
                },
                {
                    glyph: 'polygon',
                    loading: true
                },
                {
                    glyph: 'line',
                    visible: false
                }
            ]}
            vertical
        />
    </>
);
