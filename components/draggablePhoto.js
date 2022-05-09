import React from 'react';
import styled from "styled-components";
import { useDraggable, useDroppable } from '@dnd-kit/core';

const DropZone = styled.div`
  opacity: ${({ isOver }) => isOver ? 0.5 : 1};
`;

const Draggable = styled.div`
  margin: auto;
  cursor: grab;
`;

export default function DraggablePhoto({
  image,
  imageIndex,
  pageIndex,
  children
}) {
  const imageDescr = {
    id: image,
    data: {
      pageIndex: pageIndex,
      imageIndex: imageIndex,
      image: image
    }
  }
  
  const { active, isOver, setNodeRef: setDroppableRef, over } = useDroppable(imageDescr);
  const { attributes, listeners, setNodeRef } = useDraggable(imageDescr);

  return (
    <DropZone ref={setDroppableRef} isOver={isOver && active?.id !== over?.id}>
      <Draggable
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        {children}
      </Draggable>
    </DropZone>
  );
}