import { Schema, model, models } from 'mongoose';

const RecipeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        _id: false,
        id: {
          type: Number,
        },
        quantity: {
          type: String,
        },
        unit: {
          type: String,
        },
        ingredient: {
          type: String,
        },
      },
    ],
    instructions: [
      {
        _id: false,
        id: {
          type: Number,
        },
        instruction: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
