
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import logging
import numpy as np
from umap_model import load_umap_model

reducer = load_umap_model()

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")
logging.basicConfig(level=logging.INFO)


class Message(BaseModel):
    text: str

@app.post("/embed")
def get_embedding(msg: Message):
    logging.info("embedding message")
    embedding = model.encode(msg.text).tolist()
    return (embedding)

class EmbeddedArray(BaseModel):
    array: List[List[float]]

@app.post("/UMAP")
def get_umap(eArray: EmbeddedArray):
    logging.info("umapping messages")
    print("log didnt work so am printing")
    X = np.array(eArray.array, dtype=np.float32)
    umap_coords = reducer.transform(X)
    return ("eArray given: " + str(eArray) + 
            "X" + str(X) +
            "umap_coords" + str(umap_coords))

