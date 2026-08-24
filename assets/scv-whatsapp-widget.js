(function () {
function safeText(value) {
return value ? String(value).trim() : '';
}
function getSelectedVariant() {
const variantIdInput = document.querySelector('form[action*="/cart/add"] [name="id"]');
const variantId = variantIdInput ? variantIdInput.value : '';
let selectedOptions = [];
document.querySelectorAll('select[name^="options"], input[name^="options"]:checked').forEach(function (el) {
if (el.value) selectedOptions.push(el.value);
});
document.querySelectorAll('[data-option-value][aria-pressed="true"], [data-option-value].is-selected').forEach(function (el) {
const value = el.getAttribute('data-option-value') || el.textContent;
if (value) selectedOptions.push(value.trim());
});
selectedOptions = Array.from(new Set(selectedOptions.filter(Boolean)));
return {
variantId: variantId,
selectedOptions: selectedOptions.join(' / ')
};
}
function getQuantity() {
const qtyInput = document.querySelector('form[action*="/cart/add"] [name="quantity"], input[name="quantity"]');
return qtyInput && qtyInput.value ? qtyInput.value : '1';
}
function getMadeToMeasureContext() {
const selectors = {
usageArea: '[name="usage_area"], [data-mtm-field="usage_area"]',
matType: '[name="mat_type"], [data-mtm-field="mat_type"]',
width: '[name="width"], [data-mtm-field="width"]',
length: '[name="length"], [data-mtm-field="length"]',
unit: '[name="unit"], [data-mtm-field="unit"]',
area: '[name="calculated_area"], [data-mtm-field="calculated_area"]',
estimatedPrice: '[name="estimated_price"], [data-mtm-field="estimated_price"]',
colour: '[name="colour"], [data-mtm-field="colour"]',
notes: '[name="notes"], [data-mtm-field="notes"]'
};
const data = {};
Object.keys(selectors).forEach(function (key) {
const el = document.querySelector(selectors[key]);
if (!el) {
data[key] = '';
return;
}
if (el.type === 'radio' || el.type === 'checkbox') {
const checked = document.querySelector(selectors[key] + ':checked');
data[key] = checked ? checked.value : '';
} else {
data[key] = el.value || el.textContent || '';
}
data[key] = safeText(data[key]);
});
return data;
}
function detectIntent(widget, mtm) {
const template = safeText(widget.dataset.template).toLowerCase();
const pageTitle = safeText(widget.dataset.pageTitle).toLowerCase();
const url = window.location.href.toLowerCase();
if (
pageTitle.includes('made') ||
pageTitle.includes('measure') ||
url.includes('made-to-measure') ||
mtm.width ||
mtm.length
) {
return 'Made to Measure Quote';
}
if (template.includes('product') || widget.dataset.productTitle) {
return 'Product Enquiry';
}
if (template.includes('collection') || widget.dataset.collectionTitle) {
return 'Category Enquiry';
}
if (
pageTitle.includes('commercial') ||
pageTitle.includes('bulk') ||
pageTitle.includes('architect') ||
url.includes('commercial') ||
url.includes('bulk') ||
url.includes('architect')
) {
return 'Commercial / Bulk Enquiry';
}
return 'General Website Enquiry';
}
function buildMessage(widget) {
const pageTitle = safeText(widget.dataset.pageTitle || document.title);
const pageUrl = window.location.href;
const productTitle = safeText(widget.dataset.productTitle);
const productUrl = safeText(widget.dataset.productUrl);
const productType = safeText(widget.dataset.productType);
const collectionTitle = safeText(widget.dataset.collectionTitle);
const variant = getSelectedVariant();
const quantity = getQuantity();
const mtm = getMadeToMeasureContext();
const intent = detectIntent(widget, mtm);
let lines = [];
if (intent === 'Made to Measure Quote') {
lines.push('Hello Ultimats team, I need a made-to-measure mat quote.');
} else if (intent === 'Product Enquiry') {
lines.push('Hello Ultimats team, I need help with this product.');
} else if (intent === 'Category Enquiry') {
lines.push('Hello Ultimats team, I need help choosing from this category.');
} else if (intent === 'Commercial / Bulk Enquiry') {
lines.push('Hello Ultimats team, I need help with a commercial/bulk requirement.');
} else {
lines.push('Hello Ultimats team, I need help from your website.');
}
lines.push('');
lines.push('Intent: ' + intent);
lines.push('Page: ' + pageTitle);
lines.push('URL: ' + pageUrl);
if (collectionTitle) {
lines.push('');
lines.push('Collection: ' + collectionTitle);
}
if (productTitle) {
lines.push('');
lines.push('Product: ' + productTitle);
if (productType) lines.push('Product Type: ' + productType);
if (productUrl) lines.push('Product URL: ' + productUrl);
if (variant.selectedOptions) lines.push('Selected Variant: ' + variant.selectedOptions);
if (variant.variantId) lines.push('Variant ID: ' + variant.variantId);
lines.push('Quantity: ' + quantity);
}
if (mtm.usageArea || mtm.matType || mtm.width || mtm.length) {
lines.push('');
lines.push('Made-to-Measure Details:');
if (mtm.usageArea) lines.push('Usage Area: ' + mtm.usageArea);
if (mtm.matType) lines.push('Mat Type: ' + mtm.matType);
if (mtm.width) lines.push('Width: ' + mtm.width);
if (mtm.length) lines.push('Length: ' + mtm.length);
if (mtm.unit) lines.push('Unit: ' + mtm.unit);
if (mtm.area) lines.push('Calculated Area: ' + mtm.area);
if (mtm.estimatedPrice) lines.push('Estimated Price: ' + mtm.estimatedPrice);
if (mtm.colour) lines.push('Colour / Style: ' + mtm.colour);
if (mtm.notes) lines.push('Notes: ' + mtm.notes);
}
lines.push('');
lines.push('Please guide me.');
return lines.join('\n');
}
function openWhatsApp(widget) {
const number = safeText(widget.dataset.whatsappNumber);
if (!number) {
console.warn('SCV WhatsApp Widget: Missing WhatsApp number');
return;
}
const message = buildMessage(widget);
const encodedMessage = encodeURIComponent(message);
const whatsappUrl = 'https://wa.me/' + number + '?text=' + encodedMessage;
window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
document.addEventListener('DOMContentLoaded', function () {
const widget = document.getElementById('scv-whatsapp-widget');
if (!widget) return;
const button = widget.querySelector('button');
if (!button) return;
button.addEventListener('click', function () {
openWhatsApp(widget);
});
});
})();
