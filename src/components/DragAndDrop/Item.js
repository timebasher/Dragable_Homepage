import React, { Component } from 'react';
import { DragSource, ConnectDragPreview } from 'react-dnd';

import Toolbar from '../AppFrame/Toolbar';

const itemSource = {
    beginDrag(props) {
        console.log(props.item)
        return props.item;
    },
    endDrag(props, monitor, component) {
        return props.handleDrop(props.item);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class Item extends Component {


    render() {
        const { isDragging, connectDragSource, connectDragPreview, item, minimized, focused } = this.props;
        if (isDragging) {
            return null
        }

        return (
            connectDragPreview &&
            connectDragSource &&
            connectDragPreview(
                <div className="app-frame"
                    onClick={this.props.clickAppFrame}
                    id={`app-frame-${item.id}`}
                    style={{
                        //cursor: minimized ? 'zoom-in' : 'cursor',
                        zIndex: focused === item.id ? '600' : '500',
                        left: item.left,
                        top: item.top,
                        width: item.width,
                        height: item.height,
                        backgroundColor: item.color,
                        transform: `scale(${item.scale})`
                    }}>
                    {connectDragSource(<div className='app-header'>

                        <Toolbar
                            CloseClick={this.props.CloseClick}
                            MinimizeClick={this.props.MinimizeClick}
                            title={item.name}
                        />
                        <div className='app-header__pattern'>
                        </div>
                    </div>)}
                    <div
                        style={{ widht: '100%', height: '100%', background: 'green' }}
                        onClick={this.props.clickAppBody}
                    >
                        hi
                    </div>

                </div>
            )
        );
    }
}

export default DragSource('item', itemSource, collect)(Item);