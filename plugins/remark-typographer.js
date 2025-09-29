// plugins/remark-typographer.js
export function remarkTypographer() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'text') {
        node.value = node.value
          .replace(/\(c\)/gi, '©')
          .replace(/\(r\)/gi, '®')
          .replace(/\(tm\)/gi, '™')
          .replace(/\(p\)/gi, '℗')
          .replace(/\+\-/g, '±');
      }
      if (node.children) node.children.forEach(walk);
    }
    walk(tree);
  };
}
