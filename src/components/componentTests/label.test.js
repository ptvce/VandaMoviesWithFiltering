import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Label from "../common/label";

configure({ adapter: new Adapter() });
test("renders label component", () => {
  const tags = ["one", "two", "three"];
  const wrapper = shallow(<Label text={tags} />);
  expect(wrapper.find(".form-group")).toBeDefined();
  expect(wrapper.find(".item")).toHaveLength(tags.length);
});
