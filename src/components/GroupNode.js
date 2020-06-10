import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import Card from './Card';
import Toolbar from './Toolbar';
import withTooltip from '../hoc/withTooltip';
import { getTitleAndTooltip } from '../MapStore2/web/client/utils/TOCUtils';

const NodeInfo = withTooltip(({ children, ...props }) => {
    return (
        <div { ...props } className="node-info">
            {children}
        </div>
    );
});

function GroupNode(props) {
    
    const {
        node: nodeProp,
        children,
        filter,
        onClick,
        onChange,
        currentLocale,
        replaceNodeOptions,
        isSelected,
        filterText,
        showTitleTooltip,
        buttons
    } = props;

    const node = replaceNodeOptions?.(nodeProp, 'group') || nodeProp;

    if (filter(node, 'group')) {
        const { title, tooltipText } = getTitleAndTooltip({ node, currentLocale });
        const expanded = node.expanded !== undefined ? node.expanded : true;
        const selectedClassName = isSelected(node) ? ' selected' : '';
        const visibleClassName = node.visibility ? ' visible' : '';
        const titleComponent = filterText
            ? <Highlighter
                highlightClassName="mark"
                searchWords={[ filterText ]}
                autoEscape
                textToHighlight={title || node.id}
            />
            : title || node.id;
        return (
            <li className={`group node${visibleClassName}`}>
                <Card
                    className={`node-head${selectedClassName}`}
                    onClick={(event) =>
                        onClick(node, 'group', event.ctrlKey)
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
                                visible: !!(node?.nodes?.length > 0 && !filterText),
                                onClick: (event) => {
                                    event.stopPropagation();
                                    onChange(node.id, 'group', { expanded: !expanded });
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
                            ...(buttons.map(({ Component, ...button}) => {
                                if (Component) {
                                    return {
                                        ...button,
                                        Component: (props) => (
                                            <Component
                                                {...props}
                                                node={node}
                                                nodeType="group"
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
                                    onChange(node.id, 'group', { visibility: !node.visibility });
                                }
                            }
                        ]}
                    />
                </Card>
                {expanded && <div className="node-body">
                    <ul>
                        {node?.nodes?.map?.(childNode => cloneElement(children, {
                            ...props,
                            key: childNode.id,
                            node: childNode
                        }))}
                    </ul>
                </div>}
            </li>
        );
    }
    return null;
}

GroupNode.propTypes = {
    node: PropTypes.object,
    filter: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    currentLocale: PropTypes.string,
    replaceNodeOptions: PropTypes.func,
    isSelected: PropTypes.func,
    showTitleTooltip: PropTypes.bool,
    filterText: PropTypes.string,
    buttons: PropTypes.array
};

GroupNode.defaultProps = {
    filter: () => true,
    onClick: () => {},
    onChange: () => {},
    isSelected: () => false,
    showTitleTooltip: false,
    buttons: []
};

export default GroupNode;
