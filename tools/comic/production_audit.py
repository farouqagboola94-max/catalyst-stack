#!/usr/bin/env python3
"""Offline checks for a private comic production pack; no remote calls."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import struct
import sys
import zlib

def safe_path(root, value):
    if not isinstance(value, str) or not value:
        raise ValueError("asset path must be a nonempty string")
    relative = PurePosixPath(value)
    if relative.is_absolute() or ".." in relative.parts or "\\" in value:
        raise ValueError("asset path must stay inside pack")
    path = (root / value).resolve()
    if not path.is_relative_to(root.resolve()):
        raise ValueError("asset path escapes pack")
    return path

def png_dimensions(path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("invalid PNG signature")
    offset, dimensions, seen_data, ended = 8, None, False, False
    while offset < len(data):
        if len(data) - offset < 12:
            raise ValueError("truncated PNG chunk")
        length = struct.unpack(">I", data[offset:offset+4])[0]
        kind = data[offset+4:offset+8]
        end = offset+8+length
        if end+4 > len(data):
            raise ValueError("truncated PNG payload")
        payload = data[offset+8:end]
        expected = struct.unpack(">I", data[end:end+4])[0]
        if zlib.crc32(kind+payload) & 0xffffffff != expected:
            raise ValueError("PNG checksum mismatch")
        if dimensions is None:
            if kind != b"IHDR" or length != 13:
                raise ValueError("PNG must begin with IHDR")
            dimensions = struct.unpack(">II", payload[:8])
            if min(dimensions) < 1:
                raise ValueError("invalid PNG dimensions")
        if kind == b"IDAT":
            seen_data = seen_data or length > 0
        offset = end+4
        if kind == b"IEND":
            if length != 0 or offset != len(data):
                raise ValueError("invalid PNG end")
            ended = True
            break
    if not ended or not seen_data:
        raise ValueError("PNG is incomplete")
    return dimensions

def validate(manifest, root, minimum_story_pages=150):
    errors, warnings = [], []
    assets = manifest.get("assets", [])
    if not isinstance(assets, list):
        return {"ok":False, "errors":["assets must be a list"], "warnings":[]}
    ids, hashes, paths, valid_images = set(), {}, set(), 0
    for asset in assets:
        if not isinstance(asset, dict):
            errors.append("asset must be an object")
            continue
        aid = asset.get("id")
        if not isinstance(aid, str) or not aid or aid in ids:
            errors.append("missing or duplicate asset ID")
        ids.add(aid if isinstance(aid,str) else "")
        try:
            path = safe_path(root, asset.get("path"))
            if path in paths:
                raise ValueError("asset path is listed twice")
            paths.add(path)
            width, height = png_dimensions(path)
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            if digest in hashes:
                raise ValueError("exact image duplicate of "+hashes[digest])
            hashes[digest] = str(aid)
            if asset.get("sha256") != digest:
                raise ValueError("asset hash differs from manifest")
            if asset.get("width") != width or asset.get("height") != height:
                raise ValueError("asset dimensions differ from manifest")
            if not asset.get("character_reference"):
                raise ValueError("character/style reference is missing")
            if asset.get("status") != "reviewed":
                warnings.append(str(aid)+": visual review remains pending")
            valid_images += 1
        except (ValueError, OSError) as error:
            errors.append(str(aid)+": "+str(error))
    canva = manifest.get("canva_designs", [])
    cids = [d.get("id") for d in canva if isinstance(d,dict)]
    if len(cids) != len(canva) or len(cids) != len(set(cids)):
        errors.append("missing or duplicate Canva design IDs")
    for design in canva:
        if not isinstance(design, dict):
            continue
        if not str(design.get("url","")).startswith(("https://www.canva.com/","https://canva.link/")):
            errors.append(str(design.get("id"))+": invalid Canva URL")
        if design.get("editable_text_verified") is not True:
            warnings.append(str(design.get("id"))+": editable text not verified")
    expected = manifest.get("expected", {})
    for name, actual in [("generated_images",valid_images),("canva_designs",len(canva))]:
        count = expected.get(name)
        if type(count) is not int or count < 0:
            errors.append("expected "+name+" must be a nonnegative integer")
        elif actual < count:
            errors.append(name+": "+str(actual)+" present, "+str(count)+" required")
    issue_summaries = []
    for issue in manifest.get("issues", []):
        pages = issue.get("reading_order", [])
        folios = [p.get("folio_id") for p in pages]
        if any(not isinstance(f,str) or not f for f in folios) or len(folios) != len(set(folios)):
            errors.append(str(issue.get("id"))+": missing or duplicate folio IDs")
        story = [p for p in pages if p.get("page_role") == "story"]
        if any(p.get("page_role") not in ("story","frontmatter","credits") for p in pages):
            errors.append(str(issue.get("id"))+": each folio needs an explicit page_role")
        if len(story) < minimum_story_pages:
            errors.append(str(issue.get("id"))+": below minimum story page count")
        if [p.get("story_page") for p in story] != list(range(1,len(story)+1)):
            errors.append(str(issue.get("id"))+": story page numbers are not consecutive")
        issue_summaries.append({"id":issue.get("id"),"story_pages":len(story),"total_folios":len(pages)})
    if not manifest.get("issues"):
        warnings.append("no issue manuscript supplied; page minimum has not been checked")
    return {"ok":not errors,"errors":errors,"warnings":warnings,"generated_images":valid_images,
            "canva_designs":len(canva),"issues":issue_summaries}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--minimum-story-pages",type=int,default=150)
    args = parser.parse_args()
    if args.minimum_story_pages < 1:
        parser.error("minimum story pages must be positive")
    try:
        manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
        if not isinstance(manifest,dict):
            raise ValueError("manifest must be an object")
        result = validate(manifest,args.manifest.parent,args.minimum_story_pages)
    except (OSError,ValueError,TypeError,KeyError) as error:
        result = {"ok":False,"errors":[str(error)],"warnings":[]}
    print(json.dumps(result,ensure_ascii=False,indent=2))
    return 0 if result["ok"] else 1

if __name__ == "__main__":
    sys.exit(main())

