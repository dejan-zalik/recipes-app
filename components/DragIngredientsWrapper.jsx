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

const DragIngredientsWrapper = ({
  ingredients,
  setIngredients,
  setQuantity,
  setUnit,
  setIngredient,
  handleDeleteIngredient,
}) => {
  const Ingredient = ({ id, ingredient, index }) => {
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
          className="bg-inherit pr-4 hover:cursor-grab"
          value={`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}
          name="ingredients"
          title={`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}
          readOnly
          disabled
        />
        <button
          className="btn btn-xs btn-ghost btn-circle"
          onClick={(e) => {
            e.preventDefault();
            setQuantity(ingredient.quantity);
            setUnit(ingredient.unit);
            setIngredient(ingredient.ingredient);
            handleDeleteIngredient(index);
          }}
        >
          <Pencil size={14} />
        </button>
        <button
          className="btn btn-xs btn-ghost btn-circle text-red-500"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteIngredient(index);
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

  const getIngredientPos = (id) =>
    ingredients.findIndex((ingredient) => ingredient.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setIngredients((ingredient) => {
      const originalPos = getIngredientPos(active.id);
      const newPos = getIngredientPos(over.id);

      return arrayMove(ingredient, originalPos, newPos);
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
          items={ingredients.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {ingredients.map((ingredient, index) => (
            <Ingredient
              key={ingredient.id}
              id={ingredient.id}
              ingredient={ingredient}
              index={index}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default DragIngredientsWrapper;
