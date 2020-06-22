const array = ["axc ", "b", "ddd", "e"];

const string = "axc ybydddye";
console.log(string.split("y"));
console.log(array.join("y"));

// const array = ["v", "a", "b", "c", "v", "v", "v", "x", "y", "v", "o", "p"];

// let tempVerbs = [];
// let output = [];
// let lastWord = "";

// array.forEach((element) => {
//   if (element === "v") {
//     if (lastWord !== "v") {
//       output = output.concat(tempVerbs);
//       tempVerbs = [];
//     }
//     tempVerbs.push(element);
//   } else {
//     output.push(element);
//   }

//   lastWord = element;
// });

// output = output.concat(tempVerbs);

// console.log(output, output.length, array.length);
