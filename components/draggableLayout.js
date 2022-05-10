import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import styled, { keyframes } from "styled-components";

const PreviewAnimation = keyframes`
  0% {
    transform: translate3d(-5px, -5px, 0) scale(1);
  }
  100% {
    transform: translate3d(0px, 0px, 0) scale(1.025);
  }
`;

const DragPreview = styled.div`
  border: 5px white solid;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  max-width: 160px;
  overflow: hidden;

  transform: translate3d(0px, 0px, 0) scale(1.025);
  animation: ${PreviewAnimation} 550ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 6px 0 rgba(34, 33, 81, 0.3);
  cursor: grabbing;
  margin: auto;

  img {
    object-fit: cover;
    height: 150px;
    width: 150px;
  }
`;

export default function DraggableLayout({
  items,
  onItemsChange,
  children
}) {
  const [activeDragItem, setActiveDragItem] = useState(null);

  function onDragEnd(e) {
    if (e.over) {
      const target = e.over.data.current;
      const dragging = e.active.data.current;
      const newItems = [...items];

      [
        newItems[target.pageIndex].images[target.imageIndex],
        newItems[dragging.pageIndex].images[dragging.imageIndex]
      ] = [
        items[dragging.pageIndex].images[dragging.imageIndex],
        items[target.pageIndex].images[target.imageIndex]
      ];

      onItemsChange(newItems);
    }

    setActiveDragItem(null);
  }

  return (
    <DndContext onDragStart={e => setActiveDragItem(e.active.data.current)} onDragEnd={onDragEnd}>
      {children}

      <DragOverlay
        dropAnimation={{ duration: 300, easing: 'ease-in-out', dragSourceOpacity: 0.7 }}
        modifiers={[snapCenterToCursor]}
      >
        {activeDragItem ? (
          <div>
            <DragPreview>
              <img src={activeDragItem.image} alt="" />
            </DragPreview>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}