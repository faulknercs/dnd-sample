import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';

export default function DraggableLayout({
  items,
  onItemsChange,
  children
}) {
  const [activeDragItem, setActiveDragItem] = useState(null);

  function onDragStart(e) {
    
    console.log('drag start')

    if (!e.active) {
      return;
    }

    setActiveDragItem(e.active.data.current);
  }

  function onDragEnd(e) {
    console.log('drag end')

    setActiveDragItem(null);
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}

      <DragOverlay dropAnimation={null}>
        {activeDragItem ? (
          <div>
            Overlay
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}