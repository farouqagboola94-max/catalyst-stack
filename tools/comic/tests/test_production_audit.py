import copy
import hashlib
import importlib.util
from pathlib import Path
import struct
import tempfile
import unittest
import zlib

SPEC = importlib.util.spec_from_file_location("audit",Path(__file__).parents[1]/"production_audit.py")
audit = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(audit)

def chunk(kind,payload):
    return struct.pack(">I",len(payload))+kind+payload+struct.pack(">I",zlib.crc32(kind+payload)&0xffffffff)

def png():
    return b"\x89PNG\r\n\x1a\n"+chunk(b"IHDR",struct.pack(">IIBBBBB",1,1,8,2,0,0,0))+chunk(b"IDAT",zlib.compress(b"\x00\xff\x00\x00"))+chunk(b"IEND",b"")

class ProductionChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        data = png()
        (self.root/"a.png").write_bytes(data)
        self.manifest = {"expected":{"generated_images":1,"canva_designs":1},
          "assets":[{"id":"A1","path":"a.png","width":1,"height":1,"sha256":hashlib.sha256(data).hexdigest(),"character_reference":"reference-v1","status":"reviewed"}],
          "canva_designs":[{"id":"C1","url":"https://canva.link/example","editable_text_verified":True}],
          "issues":[{"id":"I1","reading_order":[{"folio_id":"P"+str(i),"page_role":"story","story_page":i} for i in range(1,151)]}]}
    def check(self, value=None):
        return audit.validate(value or self.manifest,self.root)
    def test_valid_pack(self):
        self.assertTrue(self.check()["ok"])
    def test_frontmatter_does_not_count(self):
        self.manifest["issues"][0]["reading_order"][0]["page_role"]="frontmatter"
        self.assertFalse(self.check()["ok"])
    def test_missing_asset(self):
        (self.root/"a.png").unlink()
        self.assertFalse(self.check()["ok"])
    def test_corrupted_png(self):
        data=bytearray(png());data[45]^=1
        (self.root/"a.png").write_bytes(data)
        self.assertFalse(self.check()["ok"])
    def test_duplicate_image(self):
        (self.root/"b.png").write_bytes(png())
        other=copy.deepcopy(self.manifest["assets"][0]);other.update(id="A2",path="b.png")
        self.manifest["assets"].append(other)
        self.assertFalse(self.check()["ok"])
    def test_path_escape(self):
        self.manifest["assets"][0]["path"]="../a.png"
        self.assertFalse(self.check()["ok"])
    def test_symlink_escape(self):
        with tempfile.TemporaryDirectory() as outside:
            target=Path(outside)/"a.png";target.write_bytes(png())
            (self.root/"link.png").symlink_to(target)
            self.manifest["assets"][0]["path"]="link.png"
            self.assertFalse(self.check()["ok"])
    def test_stale_hash_and_dimensions(self):
        self.manifest["assets"][0].update(sha256="wrong",width=2)
        self.assertFalse(self.check()["ok"])
    def test_wrong_page_order(self):
        pages=self.manifest["issues"][0]["reading_order"]
        pages[0],pages[1]=pages[1],pages[0]
        self.assertFalse(self.check()["ok"])
    def test_asset_count_not_met(self):
        self.manifest["expected"]["generated_images"]=30
        self.assertFalse(self.check()["ok"])
    def test_duplicate_folio(self):
        pages=self.manifest["issues"][0]["reading_order"];pages[1]["folio_id"]=pages[0]["folio_id"]
        self.assertFalse(self.check()["ok"])
    def test_unverified_is_reported(self):
        self.manifest["assets"][0]["status"]="draft"
        self.assertTrue(self.check()["warnings"])
    def test_truncated_png(self):
        (self.root/"a.png").write_bytes(png()[:-4])
        self.assertFalse(self.check()["ok"])
    def test_no_issue_is_not_silently_passed(self):
        self.manifest["issues"]=[]
        self.assertIn("no issue manuscript supplied",self.check()["warnings"][0])

if __name__=="__main__":
    unittest.main()

