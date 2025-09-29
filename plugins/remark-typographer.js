export default function remarkTypographer() {
  return (tree) => {
    function visitor(node) {
      if (node.type === "text") {
        node.value = node.value
          .replace(/\(c\)/gi, "©")
          .replace(/\(r\)/gi, "®")
          .replace(/\(tm\)/gi, "™")
          .replace(/\(p\)/gi, "℗")
          .replace(/\+\-/g, "±");
      }
    }

    function walk(node) {
      visitor(node);
      if (node.children) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
  };
}
