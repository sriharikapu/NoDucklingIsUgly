import APP_CONFIG from '../../app.config';
import { Student } from '../../student';
import { rgb } from 'd3';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  name?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  student?: Student;
  totalToxicity?: number;
  isSelected ? = false;

  id: string;
  linkCount= 0;

  constructor(id) {
    this.id = id;
  }

  // TODO: TOXICITY
  normal = () => {
    //let result = Math.sqrt(this.totalToxicity + 1);
    let result = 5 * (this.student.incidents ** 1.25 / this.totalToxicity);
    return result;
  }

  get r() {
    return Math.sqrt(50 * this.normal() * this.normal()) + 10;
  }

  get fontSize() {
    return Math.sqrt(30 * this.normal() + 10) + 'px';
  }

  get color() {
    return rgb(255 - (45 * this.normal()),0,0);
  }
}
