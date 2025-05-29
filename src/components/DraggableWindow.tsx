'use client';
import React, { useState, useRef, useEffect } from 'react';

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  resizable?: boolean;
  width?: number | string;
  height?: number | string;
  initialX?: number;
  initialY?: number;
}


const DraggableWindowXP: React.FC<DraggableWindowProps> = ({
  title,
  onClose,
  children,
  resizable = false,
  width = 640,
  height = 'auto',
  initialX = 120,
  initialY = 120,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
      x: initialX ?? 120,
      y: initialY ?? 120,
  });

  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={windowRef}
      className={`window fixed z-50 ${resizable ? 'resize overflow-auto' : ''}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minWidth: resizable ? '300px' : undefined,
        minHeight: resizable ? '200px' : undefined,
      }}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose} />
        </div>
      </div>

      <div className="window-body h-[calc(100%-24px)]">
            {children}
      </div>

    </div>
  );
};

export default DraggableWindowXP;
