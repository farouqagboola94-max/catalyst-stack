---
skill: vexor-search
category: Engineering | Semantic Search
catalyst_use: CatalystOS knowledge base, Chambers document search, content archive retrieval
---

# VEXOR SEARCH SKILL — Vector-Powered Semantic Search

Vector-powered search system that intelligently finds files and hidden contextual information.

## How Vector Search Works
Unlike keyword search (exact match), vector search:
1. Converts text to numerical vectors (embeddings) using an embedding model
2. Stores vectors in a vector database
3. On query, converts query to vector
4. Finds documents with closest vector distance (semantic similarity)
Result: "sneakers event Lagos" finds documents about "Sneakers Fest Nigeria" even without exact keywords

## Tech Stack Options

### Local (CatalystOS)
- Embeddings: sentence-transformers (Python), nomic-embed-text
- Vector DB: ChromaDB (embedded, no server needed)
- Search: cosine similarity via ChromaDB query

### Cloud
- Embeddings: OpenAI text-embedding-3-small | Cohere embed
- Vector DB: Pinecone | Weaviate | Qdrant
- Hybrid search: vector + keyword (BM25) for best results

## ChromaDB Quick Setup
```python
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./catalystos_kb")
ef = embedding_functions.SentenceTransformerEmbeddingFunction("all-MiniLM-L6-v2")
collection = client.get_or_create_collection("documents", embedding_function=ef)

# Add documents
collection.add(documents=["Full text of document"], ids=["doc_001"])

# Search
results = collection.query(query_texts=["my search query"], n_results=5)
```

## CatalystOS Knowledge Base Architecture
- Collections: projects | clients | substack_essays | sops | legal_docs
- Metadata fields: date, category, project_code, source
- Update cadence: daily sync from Obsidian vault

## Output
Vector search setup for CatalystOS, ChromaDB configuration, query interface.
