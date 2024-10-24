'use client';

import { useState, useEffect } from 'react';
import DragInstructionsWrapper from './DragInstructionsWrapper';

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
      instructions.push({ id: Date.now(), instruction: instruction });
    } else {
      window.alert('Please add instructions');
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
    setInstructions(recipe.instructions);
    localStorage.setItem('instructions', JSON.stringify(recipe.instructions));
  }, []);

  useEffect(() => {
    localStorage.setItem('instructions', JSON.stringify(instructions));
  }, [instructions]);

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

      <DragInstructionsWrapper
        instructions={instructions}
        instruction={instruction}
        setInstruction={setInstruction}
        setInstructions={setInstructions}
        handleDeleteInstruction={handleDeleteInstruction}
      />

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
