import {calculateHand} from "./App.js"

describe("calculateHand", () => {
  it("with a straight", () => {
    const straight = calculateHand([13,1,2,3,4]);
    expect(straight[0]).toEqual(5);
  })
})
