# Comic production checks

Run an offline audit before packaging an illustrated issue or campaign batch. The checker uses Python's standard library, makes no network calls and does not upload artwork.

```bash
python3 tools/comic/production_audit.py /absolute/private-pack/asset_manifest.json
python3 -m unittest discover -s tools/comic/tests
```

The private manifest contains `expected.generated_images`, `expected.canva_designs`, `assets`, `canva_designs` and optional `issues`.

Each PNG asset needs `id`, relative `path`, `sha256`, `width`, `height`, `character_reference`, and `status` (`reviewed` or `draft`). Each Canva entry needs `id`, editor/view `url`, and `editable_text_verified`. Each issue carries an `id` and `reading_order`; every folio needs `folio_id`, `page_role` (`story`, `frontmatter`, or `credits`), and a consecutive `story_page` number for story pages.

The default floor is 150 story pages per issue. Covers and credits do not count. There is no maximum. Repeated file hashes, missing files, corrupt PNG checksums, stale hashes/dimensions, escaping paths, duplicate IDs, incomplete asset counts and incorrect reading order fail the audit. Draft artwork and unverified text appear as warnings. A pack without an issue manuscript explicitly reports that the page floor was not checked.

This checker catches structural errors. It cannot verify story canon, drawn hands, speaker tails, phone readability, Yoruba spelling or visually similar images. Those still require visual proofing. PNG validation covers chunk integrity, not decompressed pixel correctness.

Keep private artwork, unpublished scripts, Canva access links, production manifests, reference images and personal files outside this public checkout. Run the checker locally against their protected pack. Publish only reusable code here. A successful audit does not authorize a release or change website authentication.

