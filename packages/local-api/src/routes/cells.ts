import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    //Make sure the cell storage file exists
    //If it does not exist add in a default list of cells
    //Read file
    //Parse list of cells
    //Send list of cella back to browser

    try {
      //Read file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      console.log("Result ", result);

      res.send(JSON.parse(JSON.stringify(result)));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        //Add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    //Take list of cells from request object
    //Serialize them
    const { cells }: { cells: Cell[] } = req.body;
    //Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
