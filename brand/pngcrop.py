"""Minimal stdlib PNG top-crop: keep the top `target_h` rows. 8-bit RGB/RGBA."""
import struct, zlib

def _paeth(a, b, c):
    p = a + b - c; pa = abs(p-a); pb = abs(p-b); pc = abs(p-c)
    return a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)

def crop_top(path, out, target_h):
    data = open(path, "rb").read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "not a PNG"
    pos = 8; w = h = bd = ct = None; idat = b""
    while pos < len(data):
        ln = struct.unpack(">I", data[pos:pos+4])[0]; typ = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+ln]
        if typ == b"IHDR":
            w, h, bd, ct = struct.unpack(">IIBB", chunk[:10])
        elif typ == b"IDAT":
            idat += chunk
        elif typ == b"IEND":
            break
        pos += 12 + ln
    assert bd == 8 and ct in (2, 6), f"need 8-bit RGB/RGBA, got bd={bd} ct={ct}"
    bpp = 3 if ct == 2 else 4
    raw = zlib.decompress(idat)
    stride = w * bpp
    prev = bytearray(stride)
    rows = []
    off = 0
    for y in range(h):
        f = raw[off]; line = bytearray(raw[off+1:off+1+stride]); off += 1 + stride
        if f == 1:
            for i in range(bpp, stride): line[i] = (line[i] + line[i-bpp]) & 255
        elif f == 2:
            for i in range(stride): line[i] = (line[i] + prev[i]) & 255
        elif f == 3:
            for i in range(stride):
                a = line[i-bpp] if i >= bpp else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
        elif f == 4:
            for i in range(stride):
                a = line[i-bpp] if i >= bpp else 0
                c = prev[i-bpp] if i >= bpp else 0
                line[i] = (line[i] + _paeth(a, prev[i], c)) & 255
        rows.append(bytes(line)); prev = line
        if len(rows) >= target_h: break
    out_raw = b"".join(b"\x00" + r for r in rows)  # filter type 0
    comp = zlib.compress(out_raw, 9)
    def chunk(typ, payload):
        return struct.pack(">I", len(payload)) + typ + payload + struct.pack(">I", zlib.crc32(typ+payload) & 0xffffffff)
    ihdr = struct.pack(">IIBBBBB", w, target_h, 8, ct, 0, 0, 0)
    open(out, "wb").write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", comp) + chunk(b"IEND", b""))
    return w, target_h

if __name__ == "__main__":
    import sys
    print(crop_top(sys.argv[1], sys.argv[2], int(sys.argv[3])))
