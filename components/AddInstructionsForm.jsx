'use client';

import { useState, useEffect } from 'react';

const AddInstructionsForm = () => {
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);

  const fillInstructions = () => {
    let instructions;
    if (localStorage.getItem('instructions') === null) {
      instructions = [];
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

  useEffect(() => {
    if (localStorage.getItem('instructions') === null) {
      setInstructions([]);
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
          <div key={index}>
            <input
              className="w-full bg-inherit"
              value={'Step ' + ++index + ': ' + instruction}
              key={index}
              name="instructions"
              readOnly
              disabled
            />
          </div>
        ))}
      </div>

      {/* This will not display it, but will send data to server */}
      <div>
        {instructions.map((instruction, index) => (
          <input
            className="w-full bg-inherit"
            value={instruction}
            key={index}
            name="instructions"
            readOnly
            hidden
          />
        ))}
      </div>
    </div>
  );
};

export default AddInstructionsForm;
