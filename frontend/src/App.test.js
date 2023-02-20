import { render, screen } from '@testing-library/react';
import ReactThreeTestRenderer from '@react-three/test-renderer'
import App from './App';
import Model from './components/Model.js';
import { shallow } from "enzyme";

test('app contains the model component', () => {
  /*
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  */
  
  const component = shallow(<App />);
  const modelElement = component.find(Model);
  expect(modelElement.length).toBe(1);
  
});

const findByType = (renderer, type) => {
  return renderer.toTree()[0].children.find((mesh) => mesh.type === type);
};

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Model 
    position={[0, 0, 0]}
    vertices={new Float32Array(0)} 
    vertexCount={0}
  />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBe(2)
});

test('material has default color light grayish yellow', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Model 
    position={[0, 0, 0]}
    vertices={new Float32Array(0)} 
    vertexCount={0}
  />)
  const material = findByType(renderer, "meshStandardMaterial")
  expect(material.props.color).toBe("#FEFBEA")
});

test('mesh is positioned at (0,0,0)', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Model 
    position={[0, 0, 0]}
    vertices={new Float32Array(0)} 
    vertexCount={0}
  />)
  const mesh = renderer.scene.children[0]
  expect(mesh.props.position).toEqual([0, 0, 0])
});