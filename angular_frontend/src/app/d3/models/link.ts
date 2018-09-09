import { Node } from './';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node | string | number;
  target: Node | string | number;

  intensity: number = 0;
  thickness: number = 0;

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }

  updateThickness() {
    this.thickness = Math.sqrt(this.intensity);
  }
}
