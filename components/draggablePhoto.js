import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { useDraggable, useDroppable } from '@dnd-kit/core';

const DraggingAnimation = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0.7
  }
`;

const DropZone = styled.div`
  opacity: ${({ isOver }) => isOver ? 0.5 : 1};
`;

const Draggable = styled.div`
  margin: auto;
  cursor: grab;
  opacity: ${({ isDragging }) => isDragging ? 0.7 : 1};
  animation: ${({ isDragging }) => isDragging ? css`${DraggingAnimation} 550ms cubic-bezier(0.18, 0.67, 0.6, 1.22)` : 'none'};
`;

export default function DraggablePhoto({
  image,
  imageIndex,
  pageIndex
}) {
  const imageDescr = {
    id: image,
    data: {
      pageIndex: pageIndex,
      imageIndex: imageIndex,
      image: image
    }
  }

  const { 
    active, 
    isOver, 
    setNodeRef: setDroppableRef, 
    over 
  } = useDroppable(imageDescr);
  const { 
    isDragging, 
    attributes, 
    listeners, 
    setNodeRef 
  } = useDraggable(imageDescr);

  return (
    <DropZone ref={setDroppableRef} isOver={isOver && active?.id !== over?.id}>
      <Draggable
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        isDragging={isDragging}
      >
        <img src={image} alt="" />
      </Draggable>
    </DropZone>
  );
}