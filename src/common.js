const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);


// NOTE: We need this because older courses may not have an `order` property.
const getOrderFromSlug = (slug) => {
  const matches = /^(\d{2})-.+$/.exec(slug);
  return (!matches || matches.length < 2)
    ? slug
    : parseInt(matches[1], 10);
};


const getOrder = (key, obj) => (
  hasOwnProperty(obj, 'order')
    ? (typeof obj.order === 'string' && parseInt(obj.order, 10)) || obj.order
    : getOrderFromSlug(key)
);


// Used to convert syllabus and part collectiosn from objects to arrays.
exports.orderedObjectToArray = v => (
  (Array.isArray(v))
    ? v
    : Object.keys(v)
      .sort((a, b) => {
        const aOrder = getOrder(a, v[a]);
        const bOrder = getOrder(b, v[b]);
        if (aOrder > bOrder) {
          return 1;
        }
        if (aOrder < bOrder) {
          return -1;
        }
        return 0;
      })
      .map(slug => ({ ...v[slug], slug }))
);
