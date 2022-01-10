import Enzyme, { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;
