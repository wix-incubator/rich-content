import React from 'react';
import { RicosContent, RicosNode } from 'ricos-schema';

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const supportedDecorations: Record<
  RicosNode['type'],
  (inner: string, node?: RicosNode) => string
> = {
  ricos_link: (inner, { ricosLink }) => {
    const { url, rel, target } = ricosLink;
    return `<a href='${url}' rel='${rel}' target='${target}'>${inner}</a>`;
  },
  bold: inner => `<strong>${inner}</strong>`,
  italic: inner => `<i>${inner}</i>`,
  underline: inner => `<u>${inner}</u>`,
  ricos_color: (inner, { ricosColor }) => {
    let style = '';
    if (ricosColor.foreground) {
      style += `color: ${ricosColor.foreground};`;
    }
    if (ricosColor.background) {
      style += `background-color: ${ricosColor.background};`;
    }
    return `<span style="${style}">${inner}</x>`;
  },
};

const supportedTypes: Record<RicosNode['type'], (inner: string, node?: RicosNode) => string> = {
  text: (inner, { ricosText }) => {
    const { text, decorations } = ricosText;

    let res = text;
    decorations.forEach(deco => (res = (supportedDecorations[deco.type] || (x => x))(res, deco)));
    return res;
  },
  heading: inner => `<h1>${inner}</h1>`,
  paragraph: inner => `<p>${inner}</p>`,
  blockquote: inner =>
    `<div style="border-left: 5px solid blue; padding-left:20px; margin-left: 20px;">${inner}</div>`,
  codeblock: inner => `<pre style="background: black; color: white;">${escapeHtml(inner)}</pre>`,
  ricos_divider: (inner, { ricosDivider }) => {
    const { type } = ricosDivider;
    const border = type === 'DASHED' ? 'dashed' : 'solid';
    return `<hr style="border-top: ${border};">`;
  },
  ricos_giphy: (inner, { ricosGiphy }) => {
    const {
      gif: { originalUrl },
    } = ricosGiphy;
    return `<img role="img" aria-label="gif" src="${originalUrl}" alt="gif" />`;
  },

  ricos_gallery: inner => `<div><<< Missing no gallery plugin quite yet >>></div>`,
};

const nodeToHTML = (node: RicosNode) => {
  let res = '';
  if (node.nodes.length > 0) {
    res += node.nodes.map(nodeToHTML).join('');
  }
  const typeFn = supportedTypes[node.type];
  if (typeFn) {
    return typeFn(res, node);
  } else {
    return node.type + '|' + res;
  }
};

const toHTML = (content: RicosContent) => {
  const { nodes } = content.doc;
  return nodes.map(nodeToHTML).join('');
};

export default (props: { content: RicosContent }) => (
  <div dangerouslySetInnerHTML={{ __html: toHTML(props.content) }} />
);
