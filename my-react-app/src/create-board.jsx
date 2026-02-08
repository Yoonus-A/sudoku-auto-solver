import "./index.css";

function CreateBoardButton({create}) {
    return (
        <button onClick={create} className="create-board-button">Create Board</button>
    )
}

export default CreateBoardButton;