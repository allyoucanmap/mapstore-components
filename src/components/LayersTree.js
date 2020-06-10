
import React, { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import BorderLayout from './BorderLayout';

import LayerNode from './LayerNode';
import GroupNode from './GroupNode';

import Filter from './Filter';
import Toolbar from './Toolbar';

import { getTitleAndTooltip } from '../MapStore2/web/client/utils/TOCUtils';

function LayerOrGroupNode({
    node,
    groupNode,
    layerNode,
    ...props
}) {
    if (node.nodes) {
        return cloneElement(
            groupNode,
            { node, ...props },
            <LayerOrGroupNode
                groupNode={groupNode}
                layerNode={layerNode}
            />
        );
    }
    return cloneElement(layerNode, { node, ...props });
}

export function Tree({
    nodes,
    header,
    nodeButtons,
    groupNodeComponent,
    layerNodeComponent,
    filter,
    onChange,
    setSelectedNode,
    onSelect,
    showTitleTooltip,
    replaceNodeOptions,
    filterText
}) {

    const getGroup = () => {
        const Group = groupNodeComponent;
        return (<Group />);
    };

    const getLayer = () => {
        const Layer = layerNodeComponent;
        return (<Layer />);
    }

    return (
        <BorderLayout
            className="layer-tree"
            header={<div className="layer-tree-head">{header}</div>}
        >
            <ul>
                {nodes.map((node) => {
                    return (
                        <LayerOrGroupNode
                            key={node.id}
                            node={node}
                            groupNode={getGroup()}
                            layerNode={getLayer()}
                            filter={filter}
                            onChange={onChange}
                            onClick={onSelect}
                            isSelected={setSelectedNode}
                            showTitleTooltip={showTitleTooltip}
                            replaceNodeOptions={replaceNodeOptions}
                            filterText={filterText}
                            buttons={nodeButtons}
                        />
                    );
                })}
            </ul>
        </BorderLayout>
    );
}

Tree.propTypes = {
    nodes: PropTypes.array,
    header: PropTypes.node,
    nodeButtons: PropTypes.array,
    groupNodeComponent: PropTypes.func,
    layerNodeComponent: PropTypes.func,
    filter: PropTypes.func,
    onChange: PropTypes.func,
    setSelectedNode: PropTypes.func,
    onSelect: PropTypes.func,
    replaceNodeOptions: PropTypes.func,
    filterText: PropTypes.string,
    showTitleTooltip: PropTypes.bool
};

Tree.defaultProps = {
    nodes: [],
    nodeButtons: [],
    filter: () => true,
    onChange: () => {},
    groupNodeComponent: GroupNode,
    layerNodeComponent: LayerNode,
    setSelectedNode: () => false,
    onSelect: () => {}
};

const loopFilter = ({ node, filterText, currentLocale }) => {
    return !!node?.nodes?.find((nd) => {
        if (nd?.nodes) {
            return loopFilter({ node: nd, filterText, currentLocale });
        }
        const { title: currentTitle } = getTitleAndTooltip({ node: nd, currentLocale });
        return currentTitle.toLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1;
    });
};

function LayersTree({
    nodes,
    buttons,
    nodeButtons,
    groupNodeComponent,
    layerNodeComponent,
    onChange,
    setSelectedNode,
    onSelect,
    showTitleTooltip
}) {

    const [filterText, setFilterText] = useState('');

    return (
        <Tree
            header={<>
            <Filter
                placeholder="Filter layers..."
                value={filterText}
                onChange={(newFilterText) => setFilterText(newFilterText)}
            />
            {buttons.length > 0 && <div className="layer-tree-toolbar">
                <Toolbar
                    buttonProps={{
                        square: true,
                        size: 'md'
                    }}
                    buttons={buttons}
                />
            </div>}
            </>}
            nodes={nodes}
            replaceNodeOptions={(currentNode, nodeType) => ({
                ...currentNode,
                ...(nodeType === 'group' && filterText && { expanded: true })
            })}
            filterText={filterText}
            filter={(currentNode, nodeType) => {
                if (nodeType === 'group' && filterText) {
                    return loopFilter({ node: currentNode, filterText });
                }
                if (nodeType === 'layer' && filterText) {
                    const { title: currentTitle } = getTitleAndTooltip({ node: currentNode });
                    return currentTitle.toLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1;
                }
                return true;
            }}
            showTitleTooltip={showTitleTooltip}
            nodeButtons={nodeButtons}
            groupNodeComponent={groupNodeComponent}
            layerNodeComponent={layerNodeComponent}
            setSelectedNode={setSelectedNode}
            onSelect={onSelect}
            onChange={onChange}
        />
    )
}

LayersTree.propTypes = {
    nodes: PropTypes.array,
    buttons: PropTypes.array,
    nodeButtons: PropTypes.array,
    groupNodeComponent: PropTypes.func,
    layerNodeComponent: PropTypes.func,
    onChange: PropTypes.func,
    setSelectedNode: PropTypes.func,
    onSelect: PropTypes.func,
    showTitleTooltip: PropTypes.bool
};

LayersTree.defaultProps = {
    nodes: [],
    buttons: [],
    nodeButtons: [],
    onChange: () => {},
    groupNodeComponent: GroupNode,
    layerNodeComponent: LayerNode,
    setSelectedNode: () => false,
    onSelect: () => {}
};

export default LayersTree;
