import { generateArray, groupArray } from "../arrayHelper";

describe("generateArray", () => {
  it("gets a generated array of 17 trues", () => {
    const result = generateArray(17, () => true);
    expect(result.length).toEqual(17);
    expect(result.every((i) => i)).toEqual(true);
  });
});

describe("groupArray", () => {
  it("groups array elements together", () => {
    const input = [true, false, true, false, false];
    const result = groupArray(input);
    expect(result.length).toEqual(2);
    const trueGroup = result.find((g) => g.key === true);
    expect(trueGroup).toBeTruthy();
    expect(trueGroup && trueGroup.values.length).toEqual(2);
    const falseGroup = result.find((g) => g.key === false);
    expect(falseGroup).toBeTruthy();
    expect(falseGroup && falseGroup.values.length).toEqual(3);
  });
});

// describe("shuffle", () => {
//   it("shuffle 100k", () => {
//     const items = [1, 2, 3, 4];
//     const results = [];
//     const amount = 600000;
//     const expect = Math.round(amount / 24);
//     for (let i = 0; i < amount; i++) {
//       results.push(shuffle(items).join());
//     }
//     // expect around 25k per item
//     console.log(
//       groupArray(results).map(
//         i =>
//           `${i.key} amount: ${i.values.length}, diff: ${expect -
//             i.values.length}`
//       )
//     );
//   });
// });
