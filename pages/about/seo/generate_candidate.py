#!/usr/bin/env python3
"""Prepare a local-only About native SEO candidate. Makes no network requests."""
import argparse
import hashlib
import json
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--review-dir', required=True)
parser.add_argument('--baseline-dir', required=True)
args = parser.parse_args()
out = Path(__file__).resolve().parent
root = out.parent
review = Path(args.review_dir).resolve()
baseline_dir = Path(args.baseline_dir).resolve()
cfg = json.loads((review / 'build-manifest.json').read_text())['config']
baseline = json.loads((baseline_dir / 'wix-about-native-seo-before.json').read_text())
faq = json.loads((review / 'faq-schema.json').read_text())
before = baseline['aboutSeo']['itemSeoTags']['tags']
page = cfg['pageUrl']
site = 'https://www.matrixmassage.net/'
business_id = site + '#business'
person_id = page + '#danelle-borglin'
breadcrumb_id = page + '#breadcrumb'
portrait = 'https://static.wixstatic.com/media/e4cc43_3cc3a5eeb061404aac3c6714d22cdb8f~mv2.jpg'
logo = 'https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg'
facebook = 'https://www.facebook.com/411300892070855'
instagram = 'https://www.instagram.com/matrixmassagewi/'
directions = 'https://www.google.com/maps/dir/?api=1&destination=24804+75th+St%2C+Salem%2C+WI+53168'
graph = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'AboutPage',
            '@id': page + '#webpage',
            'url': page,
            'name': cfg['seoTitle'],
            'description': cfg['seoDescription'],
            'inLanguage': 'en-US',
            'about': [{'@id': business_id}, {'@id': person_id}],
            'mainEntity': {'@id': business_id},
            'breadcrumb': {'@id': breadcrumb_id},
            'primaryImageOfPage': {
                '@type': 'ImageObject',
                'url': portrait,
                'caption': 'DaNelle Borglin, owner and licensed massage therapist at Matrix Massage & Bodywork in Salem, Wisconsin'
            }
        },
        {
            '@type': 'Person',
            '@id': person_id,
            'name': 'DaNelle Borglin',
            'givenName': 'DaNelle',
            'familyName': 'Borglin',
            'jobTitle': 'Owner and Licensed Massage Therapist',
            'description': 'DaNelle Borglin is a Wisconsin licensed massage therapist and the owner of Matrix Massage & Bodywork in Salem, Wisconsin.',
            'url': page + '#ma-meet',
            'image': portrait,
            'worksFor': {'@id': business_id},
            'subjectOf': {'@id': page + '#webpage'}
        },
        {
            '@type': 'HealthAndBeautyBusiness',
            '@id': business_id,
            'name': 'Matrix Massage & Bodywork',
            'url': site,
            'description': 'Independently owned massage, spa, beauty, and wellness studio in Salem, Wisconsin.',
            'telephone': '+12629399325',
            'logo': logo,
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': '24804 75th St',
                'addressLocality': 'Salem',
                'addressRegion': 'WI',
                'postalCode': '53168',
                'addressCountry': 'US'
            },
            'areaServed': [
                'Salem, Wisconsin', 'Salem Lakes, Wisconsin', 'Paddock Lake, Wisconsin',
                'Bristol, Wisconsin', 'Pleasant Prairie, Wisconsin', 'Twin Lakes, Wisconsin',
                'Trevor, Wisconsin', 'Kenosha, Wisconsin', 'Burlington, Wisconsin',
                'Union Grove, Wisconsin', 'Genoa City, Wisconsin', 'Antioch, Illinois'
            ],
            'hasMap': directions,
            'sameAs': [facebook, instagram],
            'subjectOf': {'@id': page + '#webpage'}
        },
        {
            '@type': 'BreadcrumbList',
            '@id': breadcrumb_id,
            'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': site},
                {'@type': 'ListItem', 'position': 2, 'name': 'About Matrix', 'item': page}
            ]
        }
    ]
}

compact = lambda value: json.dumps(value, ensure_ascii=False, separators=(',', ':'))
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
faq_indexes = [i for i, tag in enumerate(before) if tag.get('meta', {}).get('schemaType') == 'Bp05JGMH']
assert len(faq_indexes) == 1
assert faq['@type'] == 'FAQPage' and len(faq['mainEntity']) == 7
assert len({q['name'] for q in faq['mainEntity']}) == 7
tags = json.loads(json.dumps(before))
tags[faq_indexes[0]]['children'] = compact(faq)
tags += [
    {'type': 'title', 'children': cfg['seoTitle']},
    {'type': 'meta', 'props': {'name': 'description', 'content': cfg['seoDescription']}},
    {'type': 'script', 'props': {'type': 'application/ld+json'}, 'children': compact(graph)}
]
assert len(tags) == len(before) + 3
protected = [entry for entry in baseline['aboutSeo']['itemSeoTags']['resolvedTags'] if
             (entry['tag']['type'] == 'link' and entry['tag'].get('props', {}).get('rel') == 'canonical') or
             entry['tag'].get('props', {}).get('name') == 'robots' or
             entry['tag'].get('props', {}).get('property') in ['og:image', 'og:image:width', 'og:image:height'] or
             entry['tag'].get('props', {}).get('name') == 'twitter:image']
expected = {
    'siteId': 'cdec8df6-d518-4859-9f1e-f06bf5346d41',
    'pageId': 'yzabl',
    'revision': cfg['revision'],
    'nativeElementId': cfg['elementId'],
    'nativeTagName': cfg['tagName'],
    'bodySha256': sha(review / 'body.html'),
    'cssSha256': sha(review / 'style.css'),
    'rendererSha256': sha(review / 'renderer.js'),
    'seoSnippetSha256': sha(review / 'WIX_SEO_SNIPPET_CANDIDATE.js'),
    'faqSha256': sha(review / 'faq-schema.json')
}
request = {'itemSeoTags': {'tags': tags}, 'fieldMask': 'tags', 'publish': False}
sources = [
    'https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags',
    'https://dev.wix.com/docs/api-reference/business-management/seo/item-seo-tags-v1/set-item-seo-tags',
    'https://schema.org/AboutPage', 'https://schema.org/Person',
    'https://schema.org/HealthAndBeautyBusiness',
    'https://developers.google.com/search/docs/appearance/structured-data/breadcrumb'
]
candidate = {
    'status': 'LOCAL CANDIDATE ONLY; NOT APPLIED TO WIX',
    'siteId': expected['siteId'], 'pageId': expected['pageId'], 'pageUrl': page,
    'sourceReview': review.name, 'expectedNativeBodyEvidence': expected,
    'baselineCapturedAt': baseline['fetchedAt'], 'baselineTags': before,
    'protectedResolvedTags': protected,
    'endpoint': 'https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/yzabl',
    'method': 'PATCH', 'setRequest': request,
    'desiredResolvedSocial': {
        'og:title': cfg['seoTitle'], 'og:description': cfg['seoDescription'],
        'twitter:title': cfg['seoTitle'], 'twitter:description': cfg['seoDescription']
    },
    'socialPolicy': 'Keep title/description inheritance. Do not add explicit OG/Twitter overrides or change inherited image.',
    'schemaIdentityPolicy': 'Preserve observed FAQ meta.schemaType Bp05JGMH. New graph omits optional meta; no native Wix ID is invented. Proposed JSON-LD @ids are distinct semantic identifiers.',
    'newBusinessIdStatus': 'Proposed for this page; no business @id was present in audited public Home, Spa & Beauty, or Red Light schemas.',
    'facebookVerification': 'Owner-confirmed business Page ID 411300892070855 in project context; public destination readback still required. No claim that it differs from legacy NPE profile ID.',
    'executionPrerequisite': 'Matching native body, source/tag, complete SEO markup and seven FAQ answers must be installed, read back and saved before this draft-only patch.',
    'documentation': sources
}
for name, value in [('schema-graph.json', graph), ('native-seo-patch-candidate.json', candidate), ('faq-schema.json', faq)]:
    (out / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

template = (out / 'execute-template.js').read_text()
generated = template.replace('__CANDIDATE_JSON__', json.dumps(candidate, ensure_ascii=False, indent=2))
(out / 'EXECUTE_NATIVE_SEO_DRAFT_CANDIDATE.js').write_text(generated)
evidence_template = dict(expected)
evidence_template.update({
    'status': 'TEMPLATE ONLY - REPLACE WITH OBSERVED WIX READBACK EVIDENCE',
    'verifiedAt': '', 'evidenceReceipt': '', 'sourceCommit': '', 'immutableSourceUrl': '',
    'nativeDraftSaved': False, 'nativeBodyReadbackVerified': False,
    'nativeSeoMarkupReadbackVerified': False, 'nativeFaqReadbackVerified': False,
    'nativeSourceTagReadbackVerified': False
})
(out / 'native-about-installation-evidence-template.json').write_text(json.dumps(evidence_template, indent=2) + '\n')
print(json.dumps({'files': {p.name: {'bytes': p.stat().st_size, 'sha256': sha(p)} for p in out.iterdir() if p.is_file()}, 'review': review.name, 'nativeTagCount': len(tags), 'faqCount': len(faq['mainEntity']), 'titleCharacters': len(cfg['seoTitle']), 'descriptionCharacters': len(cfg['seoDescription'])}, indent=2))
