import React from "react";
import { render } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Input from "../common/input";

configure({ adapter: new Adapter() });
test("renders Input component", () => {
  const wrapper = shallow(<Input label="Password" />);
  expect(wrapper.find("Password")).toBeDefined();
});
