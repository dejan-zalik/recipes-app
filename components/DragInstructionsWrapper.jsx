'use client';
import { X, Pencil } from 'lucide-react';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  TouchSensor,
} from '@dnd-kit/core';
import {
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DragInstructionsWrapper = ({
  instructions,
  setInstructions,
  setInstruction,
  handleDeleteInstruction,
}) => {
  const Instruction = ({ id, instruction, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const style = { transition, transform: CSS.Transform.toString(transform) };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="flex w-fit shadow hover:bg-secondary m-0.5 p-0.5 touch-none"
      >
        <input
          className="bg-inherit pr-4 hover:cursor-grab select-none"
          value={
            'Step ' + (1 + index).toString() + ': ' + instruction.instruction
          }
          name="instructions"
          title={`${instruction.instruction}`}
          readOnly
          disabled
        />
        <button
          className="btn btn-xs btn-ghost btn-circle"
          onClick={(e) => {
            e.preventDefault();
            setInstruction(instruction.instruction);
            handleDeleteInstruction(index);
          }}
        >
          <Pencil size={14} />
        </button>
        <button
          className="btn btn-xs btn-ghost btn-circle text-red-500"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteInstruction(index);
          }}
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(
      KeyboardSensor,
      {
        coordinateGetter: sortableKeyboardCoordinates,
      },
      {
        activationConstraint: {
          distance: 5,
        },
      }
    )
  );

  const getInstructionPos = (id) =>
    instructions.findIndex((instruction) => instruction.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setInstructions((instruction) => {
      const originalPos = getInstructionPos(active.id);
      const newPos = getInstructionPos(over.id);

      return arrayMove(instruction, originalPos, newPos);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div>
        <SortableContext
          items={instructions.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {instructions.map((instruction, index) => (
            <Instruction
              key={instruction.id}
              id={instruction.id}
              instruction={instruction}
              index={index}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default DragInstructionsWrapper;
