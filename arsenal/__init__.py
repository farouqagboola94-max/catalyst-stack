"""Open Source Arsenal — module records and routers for CatalystOS.

Each module (e.g. ComfyUI, the local video lane) ships a canonical
``*.arsenal.json`` record plus a ``register_*.py`` that both upserts the record
into the arsenal registry and exposes a FastAPI router to mount in CatalystOS.
"""
