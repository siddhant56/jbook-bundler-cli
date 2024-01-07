import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { Fragment } from "react";
import "./cell-list.css";
import { useActions } from "../hooks/use-actions";
import { useEffect } from "react";

const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  useEffect(() => {
    saveCells();
  }, [JSON.stringify(cells)]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id}></AddCell>
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <div className={cells.length === 0 ? "force-visible" : ""}>
        <AddCell previousCellId={null}></AddCell>
      </div>
      {renderedCells}
    </div>
  );
};

export default CellList;
