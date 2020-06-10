
import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import Glyph from './Glyph';
import Card from './Card';
import Toolbar from './Toolbar';
import withTooltip from '../hoc/withTooltip';
import { getTitleAndTooltip } from '../MapStore2/web/client/utils/TOCUtils';
import Slider from './Slider';

const defaultLayerToolsByTypes = {
    wms: {
        isActive: () => true,
        Tools: () => {
            return (
                <div>
                    LEGEND
                </div>
            );
        }
    }
};

const NodeInfo = withTooltip(({ children, ...props }) => {
    return (
        <div { ...props } className="node-info">
            {children}
        </div>
    );
});

const GlyphIndicator = ({ name, square, size }) => {
    return <Glyph name={name} square={square} size={size}/>;
}

function LayerNode(props) {

    const {
        node: nodeProp,
        filter,
        currentLocale,
        replaceNodeOptions,
        onClick,
        onChange,
        layerToolsByTypes,
        isSelected,
        showTitleTooltip,
        filterText,
        buttons
    } = props;

    const node = replaceNodeOptions?.(nodeProp, 'layer') || nodeProp;

    if (filter(node, 'layer')) {

        const { title, tooltipText } = getTitleAndTooltip({ node, currentLocale });
        const { Tools = null, isActive = () => true } = layerToolsByTypes[node.type] || {};
        const Body = isActive(props) && Tools;

        const expanded = node.expanded !== undefined ? node.expanded : true;
        const opacity = node.opacity !== undefined ? node.opacity : 1;
        const selectedClassName = isSelected(node) ? ' selected' : '';
        const visibleClassName = node.visibility ? ' visible' : '';
        const errorClassName = node.loadingError === 'Error' ? ' error' : '';
        const warningClassName = node.loadingError === 'Warning' ? ' warning' : '';
        const titleComponent = filterText
            ? <Highlighter
                highlightClassName="mark"
                searchWords={[ filterText ]}
                autoEscape
                textToHighlight={title || node.id}
            />
            : title || node.id;
        return (
            <li className={`layer node${visibleClassName}`}>
                <Card
                    className={`node-head${selectedClassName}${errorClassName}${warningClassName}`}
                    onClick={(event) =>
                        onClick(node, 'layer', event.ctrlKey)
                    }
                >
                    <Toolbar
                        className="node-left-tools"
                        buttonProps={{
                            square: true,
                            size: 'md'
                        }}
                        buttons={[
                            {
                                glyph: expanded ? 'collapse-down' : 'expand',
                                visible: !!Body,
                                onClick: (event) => {
                                    event.stopPropagation();
                                    onChange(node.id, 'layer', { expanded: !expanded });
                                }
                            }
                        ]}
                    />
                    <NodeInfo
                        tooltip={showTitleTooltip ? tooltipText : undefined}
                    >
                        {titleComponent}
                    </NodeInfo>
                    <Toolbar
                        className="node-right-tools"
                        buttonProps={{
                            square: true,
                            size: 'md'
                        }}
                        buttons={[
                            {
                                visible: !!errorClassName,
                                name: 'exclamation-mark',
                                Component: GlyphIndicator
                            },
                            ...(buttons.map(({ Component, ...button}) => {
                                if (Component) {
                                    return {
                                        ...button,
                                        Component: (props) => (
                                            <Component
                                                {...props}
                                                node={node}
                                                nodeType="layer"
                                            />)
                                    };
                                }
                                return button;
                            })),
                            {
                                glyph: node.visibility ? 'eye-open' : 'eye-close',
                                loading: !!node.loading,
                                onClick: (event) => {
                                    event.stopPropagation();
                                    onChange(node.id, 'layer', { visibility: !node.visibility });
                                }
                            }
                        ]}
                    />
                </Card>
                {expanded && <div className="node-body">
                    {Body && <Body {...props} />}
                </div>}
                <Slider
                    min={0}
                    max={1}
                    step={1 / 100}
                    showTooltip
                    formatTooltip={value => `${Math.floor(value * 100)}%`}
                    defaultValue={opacity}
                    onAfterChange={(value) => {
                        onChange(node.id, 'layer', { opacity: value });
                    }}
                    disabled={!node.visibility}
                />
            </li>
        );
    }
    return null;
}

LayerNode.propTypes = {
    node: PropTypes.object,
    filter: PropTypes.func,
    currentLocale: PropTypes.string,
    replaceNodeOptions: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    layerToolsByTypes: PropTypes.object,
    isSelected: PropTypes.func,
    showTitleTooltip: PropTypes.bool,
    filterText: PropTypes.string,
    buttons: PropTypes.array
};

LayerNode.defaultProps = {
    filter: () => true,
    onClick: () => {},
    onChange: () => {},
    isSelected: () => false,
    layerToolsByTypes: defaultLayerToolsByTypes,
    showTitleTooltip: false,
    buttons: []
};

export default LayerNode;
