from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()
print("All imports successful")
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 

class SudokuResponse(BaseModel):
    board: list[int]  # 9x9 board of ints

@app.get("/ping")
def ping():
    return {"status": "o2k"}

@app.get("/puzzle", response_model=SudokuResponse)
def get_game():
    # Dummy 9x9 board
    dummy_board = [7] * 81
    return {"board": dummy_board}



@app.get("/puzzle2") # select a puzzle
def get_game():
    # Load the dataset
    df = pd.read_csv('backend/sudoku.csv')

    # Select a random row from the dataset
    random_row = df.sample(n=1).iloc[0]

    # Extract the 'quizzes' and 'solutions' values
    quizzes = random_row['quizzes']

    # Convert the string representation of the list to an actual list of integers
    quizzes_list = [int(x) for x in str(quizzes)]

    board=[quizzes_list[i:i+9] for i in range(0, 81, 9)]
    return {"board": board}



if __name__ == "__miain.py__":
    print("Starting API server...")
    uvicorn.run(app, host="0.0.0.0", port=8000,reload=True)