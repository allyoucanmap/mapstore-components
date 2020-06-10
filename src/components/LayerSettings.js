import React from 'react';
import PropTypes from 'prop-types';
import VerticalLayout from './VerticalLayout';
import Input from './Input';
import Label from './Label';

const fields = {
    title: ({ id, value, onChange }) => {
        return (
            <>
            <Label htmlFor={id}>Title</Label>
            <Input
                id={id}
                value={value || ''}
                onChange={onChange}
            />
            </>
        );
    },
    name: ({ id, value, onChange }) => {
        return (
            <>
            <Label htmlFor={id}>Name</Label>
            <Input
                id={id}
                value={value || ''}
                onChange={onChange}
            />
            </>
        );
    },
    url: ({ id, value, onChange }) => {
        return (
            <>
            <Label htmlFor={id}>Url</Label>
            <Input
                id={id}
                value={value || ''}
                onChange={onChange}
            />
            </>
        );
    }
};

function LayerSettings({
    id,
    className,
    style,
    settings,
    onChange,
    sections
}) {
    const customClassName = className ? ' ' + className : '';
    return (
        <VerticalLayout
            id={id}
            className={`layer-settings${customClassName}`}
            style={style}
        >
            {(sections?.[settings.type] || []).map((key) => {
                if (key[0] === 'section') {
                    return <div key={key[1]} className="layer-settings-section">{key[1]}</div>;
                }
                const Field = fields[key];
                if (!Field) {
                    return null;
                }
                return (<Field
                    key={key}
                    id={`layer-settings-${key}`}
                    value={settings[key]}
                    onChange={(value) => onChange({ ...settings, [key]: value })}
                />)
            })}
        </VerticalLayout>
    );
}

LayerSettings.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    settings: PropTypes.object,
    onChange: PropTypes.func,
    sections: PropTypes.object
};

LayerSettings.defaultProps = {
    settings: {},
    onChange: () => {},
    sections: {
        wms: [
            ['section', 'General'],
            'title',
            'name',
            'url'
        ],
        vector: [
            ['section', 'General'],
            'title'
        ]
    }
};

export default LayerSettings;
