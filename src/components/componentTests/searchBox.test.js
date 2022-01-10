import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import SearchBox from "../searchBox";

configure({ adapter: new Adapter() });
test("renders searchBox component", () => {
  const text = "Amadeus";
  const mockFunction = jest.fn(() => null);
  const wrapper = shallow(<SearchBox value={text} onChange={mockFunction} />);
  expect(wrapper.find(text)).toBeDefined();
});
