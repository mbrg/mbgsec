#!/usr/bin/env python3

import sys

from pypdf import PdfReader


def main() -> None:
    if len(sys.argv) not in (2, 3):
        raise SystemExit("usage: extract_pdf_text.py <pdf> [max-characters]")
    limit = int(sys.argv[2]) if len(sys.argv) == 3 else 18000
    text = "\n".join((page.extract_text() or "") for page in PdfReader(sys.argv[1]).pages)
    lines = []
    seen = set()
    for raw_line in text.splitlines():
        line = " ".join(raw_line.split())
        if line and line not in seen:
            seen.add(line)
            lines.append(line)
    sys.stdout.write("\n".join(lines)[:limit])


if __name__ == "__main__":
    main()
