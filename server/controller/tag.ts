import express, { Request, Response, Router } from 'express';
import { getTagCountMap } from '../models/application';
import TagModel from '../models/tags';

const router: Router = express.Router();

/**
 * Retrieves a list of tags along with the number of questions associated with each tag.
 * If there is an error, the HTTP response's status is updated.
 *
 * @param _ The HTTP request object (not used in this function).
 * @param res The HTTP response object used to send back the tag count mapping.
 * @returns A Promise that resolves to void.
 */
const getTagsWithQuestionNumber = async (_: Request, res: Response): Promise<void> => {
  try {
    const tagcountmap = await getTagCountMap();
    if (!(tagcountmap instanceof Map)) {
      throw new Error('Error while fetching tag count map');
    } else {
      res.json(
        Array.from(tagcountmap, ([name, qcnt]: [string, number]) => ({
          name,
          qcnt,
        })),
      );
    }
  } catch (err) {
    res.status(500).send(`Error when fetching tag count map: ${(err as Error).message}`);
  }
};

// Add appropriate HTTP verbs and their endpoints to the router.
router.get('/getTagsWithQuestionNumber', getTagsWithQuestionNumber);

export default router;
/**
 * Retrieves a tag by its name from the database.
 *
 * @param req The request object, containing the tag name in the URL parameters.
 * @param res The response object used to send back the tag or an error message.
 * @returns A Promise that resolves to void.
 */
export const getTagByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  try {
    const tag = await TagModel.findOne({ name });

    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).send(`Tag with name "${name}" not found`);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send(`Error when fetching tag: ${err.message}`);
    } else {
      res.status(500).send(`Error when fetching tag`);
    }
  }
};

