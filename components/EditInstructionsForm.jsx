'use client';

import { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';

const EditInstructionsForm = ({ recipe }) => {
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);

  const fillInstructions = () => {
    let instructions;
    if (localStorage.getItem('instructions') === null) {
      instructions = recipe.instructions;
    } else {
      instructions = JSON.parse(localStorage.getItem('instructions'));
    }

    if (instruction !== '') {
      instructions.push(instruction);
    } else {
      window.alert('Please add instructions');
      // return;
    }

    localStorage.setItem('instructions', JSON.stringify(instructions));

    setInstructions(instructions);
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = instructions.filter(
      (instruction) => instruction !== instructions[index]
    );

    localStorage.setItem('instructions', JSON.stringify(updatedInstructions));
    setInstructions(updatedInstructions);
  };

  useEffect(() => {
    if (localStorage.getItem('instructions') === null) {
      setInstructions(recipe.instructions);
    } else {
      setInstructions(JSON.parse(localStorage.getItem('instructions')));
    }
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-left text-gray-700 font-bold mb-2">
        Instructions
      </label>

      <div className="flex">
        <div className="pr-2">
          <input
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            type="text"
            id="instruction"
            // name="instruction"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="instruction"
          />
        </div>
        <div
          className="hover: cursor-pointer"
          onClick={() => {
            fillInstructions();
            setInstruction('');
          }}
        >
          <div className="shadow rounded border hover:bg-secondary py-2 px-4">
            Add
          </div>
        </div>
      </div>

      {/* This will display it, but not send data to server */}
      <div className='className="border text-left rounded w-full pt-2 px-3'>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex">
            <input
              className="bg-inherit pr-4"
              value={'Step ' + (1 + index).toString() + ': ' + instruction}
              name="instructions"
              readOnly
              disabled
            />
            <button
              className="btn btn-xs btn-ghost btn-circle shadow-md"
              onClick={(e) => {
                e.preventDefault();
                setInstruction(instruction);
                handleDeleteInstruction(index);
              }}
            >
              <Pencil size={14} />
            </button>
            <button
              className="btn btn-xs btn-ghost btn-circle shadow-md text-red-500"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteInstruction(index);
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* This will not display it, but will send data to server */}
      <div>
        <input
          value={JSON.stringify(instructions)}
          name="instructions"
          readOnly
          hidden
        />
      </div>
    </div>
  );
};

export default EditInstructionsForm;
