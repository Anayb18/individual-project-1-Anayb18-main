import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Tag collection.
 *
 * This schema defines the structure for storing tags in the database.
 * Each tag includes the following fields:
 * - `name`: The name of the tag. This field is required.
 * - 'Description : a Description of the tag
 */
const tagSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,
  },
  { collection: 'Tag' },
);

export default tagSchema;
