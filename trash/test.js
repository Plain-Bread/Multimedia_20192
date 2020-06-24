const text = "Xã La Phù, huyện Hoài Đức cách trung tâm thành phố chưa tới 20km";

function replaceAll(string, find, replace) {
  return string.split(find).join(replace);
}

function replaceAllCharacters(string, characters, replace) {
  //   console.log(string);
  let output = string;
  for (const character of characters) {
    // console.log(character);
    output = replaceAll(output, character, replace);
    // console.log(output);
  }

  return output;
}

console.log(replaceAllCharacters(text, ",.:", ""));
// console.log(replaceAll(text, ",", ""));
// const array = ["axc ", "b", "ddd", "e"];

// const string = "axc ybydddye";
// console.log(string.split("y"));
// console.log(array.join("y"));

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
