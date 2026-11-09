#!/usr/bin/env python3
"""Summarize normalized aggregate reports; no network, authentication or writes."""
import argparse
import json
import math
from datetime import date
from pathlib import Path

COUNTS = ('clicks', 'impressions', 'sessions', 'organic_sessions', 'booking_clicks')


def number(value):
    if value is None:
        return None
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value < 0:
        raise ValueError('Metrics must be nonnegative finite numbers or null')
    return value


def delta(now, before):
    now, before = number(now), number(before)
    if now is None or before is None:
        return {'current': now, 'previous': before, 'absolute_change': None, 'percent_change': None}
    return {'current': now, 'previous': before, 'absolute_change': now-before,
            'percent_change': (now-before)/before*100 if before else None}


def ctr(metrics):
    c, i = number(metrics.get('clicks')), number(metrics.get('impressions'))
    if c is not None and i is not None and c > i:
        raise ValueError('Clicks exceed impressions in normalized row')
    return c/i*100 if c is not None and i else None


def summarize(data):
    for name in ('source', 'property', 'timezone', 'filters', 'pages'):
        if name not in data:
            raise ValueError('Missing provenance field: ' + name)
    periods = []
    for name in ('period_current', 'period_previous'):
        p = data[name]
        start, end = date.fromisoformat(p['start']), date.fromisoformat(p['end'])
        if end < start:
            raise ValueError('Reversed reporting period')
        periods.append((start, end))
    current, previous = periods
    if current[1]-current[0] != previous[1]-previous[0] or previous[1] >= current[0]:
        raise ValueError('Periods must be equal length, with previous before current and no overlap')
    rows, seen = [], set()
    for page in data['pages']:
        url = page['url']
        if url in seen:
            raise ValueError('Duplicate page row: ' + url)
        seen.add(url)
        now, before = page.get('current') or {}, page.get('previous') or {}
        values = {k: delta(now.get(k), before.get(k)) for k in COUNTS if k in now or k in before}
        if any(k in now or k in before for k in ('clicks', 'impressions')):
            nc, pc = ctr(now), ctr(before)
            values['ctr_percent'] = {'current': nc, 'previous': pc,
                                     'percentage_point_change': nc-pc if nc is not None and pc is not None else None}
        if 'average_position' in now or 'average_position' in before:
            values['average_position'] = delta(now.get('average_position'), before.get('average_position'))
            values['average_position']['note'] = 'Source average; lower number is better; not a live/map-pack rank'
        rows.append({'url': url, 'metrics': values, 'source_status': page.get('source_status', 'not specified')})
    return {**{k: v for k, v in data.items() if k != 'pages'}, 'pages': rows,
            'limitations': ['Missing values remain null', 'Zero-baseline percentage change is undefined',
                            'Booking clicks are not completed bookings', 'Source truth and metric scope require independent verification']}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('input', type=Path)
    args = ap.parse_args()
    try:
        print(json.dumps(summarize(json.loads(args.input.read_text())), indent=2, allow_nan=False))
    except (ValueError, KeyError, TypeError) as exc:
        ap.exit(2, str(exc) + '\n')
