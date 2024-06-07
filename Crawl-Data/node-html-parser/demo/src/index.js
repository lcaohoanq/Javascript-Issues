import { parse } from "node-html-parser";

const root = parse('<ul id="list"><li>Hello World</li></ul>');

console.log(root.firstChild.structure);
// ul#list
//   li
//     #text

console.log(root.querySelector("#list"));
// { tagName: 'ul',
//   rawAttrs: 'id="list"',
//   childNodes:
//    [ { tagName: 'li',
//        rawAttrs: '',
//        childNodes: [Object],
//        classNames: [] } ],
//   id: 'list',
//   classNames: [] }

console.log(root.toString());
// <ul id="list"><li>Hello World</li></ul>

root.set_content("<li>Hello World</li>");
root.toString(); // <li>Hello World</li>
