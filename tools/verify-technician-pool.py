"""Verify the vendored public-domain PDF against the complete catalog import.

Requires Poppler's pdftotext. Does not download or mutate any files.
"""
import hashlib
import json
import re
import subprocess
import unicodedata
from pathlib import Path

root = Path(__file__).resolve().parents[1]
pool = json.loads((root / 'courses/catalog.json').read_text())['technicianPool']
pdf = root / pool['provenance']['sourcePdfPath']
assert hashlib.sha256(pdf.read_bytes()).hexdigest() == pool['provenance']['sourcePdfSha256']
text = subprocess.check_output(['pdftotext', '-layout', str(pdf), '-'], text=True).replace('\f', '\n')
parsed = {}
normalize = lambda s: re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', s)).strip()
for match in re.finditer(r'(?m)^(T\d[A-Z]\d\d) \(([ABCD])\)[^\n]*\n(.*?)^~~', text, re.S | re.M):
    question_id, key, body = match.groups()
    parts = re.split(r'(?m)^([ABCD])\.\s*', body)
    assert len(parts) == 9, question_id
    assert question_id not in parsed, question_id
    parsed[question_id] = (normalize(parts[0]), [normalize(parts[i]) for i in (2, 4, 6, 8)], 'ABCD'.index(key))
assert len(parsed) == 409
assert set(parsed) == {q['id'] for q in pool['questions']}
for q in pool['questions']:
    prompt, choices, answer = parsed[q['id']]
    assert normalize(q['q']) == prompt, q['id']
    assert [normalize(c) for c in q['choices']] == choices, q['id']
    assert q['answer'] == answer, q['id']
for question_id, prompt in pool['corrections'].items():
    assert parsed[question_id][0] == prompt
print('PASS: all 409 prompts, four choices, answer keys and four errata match the fingerprinted revised NCVEC PDF')
