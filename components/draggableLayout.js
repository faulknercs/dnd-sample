import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import styled, { keyframes } from "styled-components";

const PreviewAnimation = keyframes`
  0% {
    height: inherit;
    width: 250px;
    transform: translate3d(0px, 0px, 0) scale(1);
  }
  100% {
    height: 150px;
    width: 150px;
    transform: translate3d(10px, 10px, 0) scale(1.025);
  }
`;

const DragPreview = styled.div`
  border: 5px white solid;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  overflow: hidden;

  transform: translate3d(10px, 10px, 0) scale(1.025);
  animation: ${PreviewAnimation} 550ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 6px 0 rgba(34, 33, 81, 0.3);
  cursor: grabbing;

  img {
    height: inherit;
  }
`;

export default function DraggableLayout({
  items,
  onItemsChange,
  children
}) {
  const [activeDragItem, setActiveDragItem] = useState(null);

  function onDragStart(e) {

    console.log('drag start', e)

    if (!e.active) {
      return;
    }

    setActiveDragItem(e.active.data.current);
  }

  function onDragEnd(e) {
    console.log('drag end', e)

    if(e.over) {
      const target = e.over.data.current;
      const dragging = e.active.data.current;

      const targetPage = target.pageIndex;
      const fromPage = dragging.pageIndex;

      const newImages = [...items]

      [
        newImages[targetPage].images[target.imageIndex], 
        newImages[fromPage].images[dragging.imageIndex]
      ] 
      = [
        items[fromPage].images[dragging.imageIndex], 
        items[targetPage].images[target.imageIndex]
      ];

      onItemsChange(newImages);
    }


    setActiveDragItem(null);
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}

      <DragOverlay dropAnimation={null}>
        {activeDragItem ? (
          <DragPreview>
            <img src={activeDragItem.image} alt="" />
          </DragPreview>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}