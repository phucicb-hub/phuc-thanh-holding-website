const transitions = {
  draft: new Set(['pending_review', 'trashed']), pending_review: new Set(['fact_checked', 'rejected', 'draft']),
  fact_checked: new Set(['approved', 'rejected', 'draft']), approved: new Set(['scheduled', 'published', 'draft']),
  scheduled: new Set(['published', 'cancelled', 'approved']), published: new Set(['unpublished', 'archived']),
  unpublished: new Set(['draft', 'archived']), rejected: new Set(['draft', 'trashed']), archived: new Set(['restored']),
  trashed: new Set(['restored']), restored: new Set(['draft']),
};
export function canTransition(from, to) { return transitions[from]?.has(to) === true; }
export function assertTransition(from, to) { if (!canTransition(from, to)) { const e = new Error(`Invalid content transition: ${from} -> ${to}`); e.status = 409; throw e; } }
export function validatePublishableContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) return false;
  if (['title', 'title_en'].some((key) => typeof content[key] !== 'string' || !content[key].trim())) return false;
  if (content.slug !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(content.slug)) return false;
  if (!content.seo) return true;
  if (typeof content.seo !== 'object' || Array.isArray(content.seo)) return false;
  if (['title', 'description'].some((key) => typeof content.seo[key] !== 'string' || !content.seo[key].trim())) return false;
  if (content.seo.canonical && !/^https:\/\//.test(content.seo.canonical)) return false;
  return !content.seo.og_image || typeof content.seo.og_image === 'string';
}
