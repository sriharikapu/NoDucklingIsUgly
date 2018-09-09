import { Component, OnInit } from '@angular/core';
import {Node, Link } from '../d3';
import { DataServiceService } from '../data-service.service';
import { Student } from '../student';
import { BullyEvent } from '../bully-event';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
  providers: [DataServiceService]
})
export class AnalysisComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  idx = 1;
  studentInputDone = false;
  eventInputDone = false;
  commonEvents: Link[] = [];
  sexism: {name: string, value: number}[] = [];

  students: Student[] = [];
  bullyEvents: BullyEvent[] = [];

  constructor(private dataService: DataServiceService) {
    // const N = APP_CONFIG.N, getIndex = number => number - 1;
  }



  ngOnInit() {
    this.dataService.getAllStudents().subscribe(result => {
      this.students = [];
      (<Array<any>>result).forEach(element => {
        const newStudent: Student = new Student();
        newStudent.firstName = element.firstName;
        newStudent.dateOfBirth = element.dateOfBirth;
        newStudent.gender = element.gender;
        newStudent.lastName = element.lastName;
        newStudent.race = element.race;
        this.students.push(newStudent);
        const newNode = new Node(this.idx);
        this.idx = this.idx + 1;
        newNode.name = newStudent.firstName;
        this.nodes.push(newNode);
      });
      this.studentInputDone = true;
      this.dataService.getBullyingEvents().subscribe(result2 => {
        this.bullyEvents = [];
        (<Array<any>>result2).forEach(element => {
          const newEvent: BullyEvent = new BullyEvent();
          newEvent.bully = element.bully;
          newEvent.datetime = element.datetime;
          newEvent.location = element.location;
          newEvent.statement = element.statement;
          newEvent.toxicity = element.toxicity;
          newEvent.victim = element.victim;
          this.bullyEvents.push(newEvent);
          const bully = this.students.find((elem) => elem.firstName === newEvent.bully);
          if (bully) {
            bully.incidents = bully.incidents + 1;
          }
          const bullyNode = this.nodes.find((node) => node.name === newEvent.bully);
          const victimNode = this.nodes.find((node) => node.name === newEvent.victim);
          if (bullyNode && victimNode) {
            bullyNode.linkCount++;
            victimNode.linkCount++;
            if (this.links.some(link => (link.source === bullyNode.id && link.target === victimNode.id))) {
              const knownLink = this.links.find(link => (link.source === bullyNode.id && link.target === victimNode.id));
              knownLink.intensity++;
              knownLink.updateThickness();
            } else {
              this.links.push(new Link(bullyNode.id, victimNode.id));
            }
          }
      //     this.nodes[getIndex(i * m)].linkCount++;
  
      //     /** connecting the nodes before starting the simulation */
      //     this.links.push(new Link(i, i * m));
        });
        this.nodes.forEach(node => {
          node.student = this.students.find(elem => elem.firstName === node.name);
          const sortedByToxicity = this.students.sort((a, b) => a.incidents - b.incidents);
          //node.totalToxicity = sortedByToxicity.indexOf(node.student);
          node.totalToxicity = this.bullyEvents.length;
        });
        this.eventInputDone = true;
        let commonEvents = this.links.sort((a, b) => a.intensity - b.intensity);
        this.commonEvents = this.links.reverse().slice(0, 15);
        this.computeSexism();
      });
    });
  }

  computeSexism() {
    this.nodes.forEach((student) => {
      let sexismCounter = 0;
      let gender = student.student.gender;
      let bullyingIncidents = this.links.filter((link) => link.source == student.id);
      bullyingIncidents.forEach((event) => {
        let targetStudent = this.nodes.find((node) => node.id == event.target);
        if (targetStudent.student.gender != gender) {
          sexismCounter = sexismCounter + event.intensity;
        } else {
          sexismCounter = sexismCounter - event.intensity;
        }
      });
      console.log(sexismCounter);
      sexismCounter = Math.sqrt(Math.abs(sexismCounter));
      this.sexism.push({name: student.student.firstName, value: sexismCounter});
    })
    this.sexism = this.sexism.sort((a, b) => b.value - a.value);
    console.log(this.sexism);
  }

  someNodeSelected() {
    let result = this.nodes.some(node => node.isSelected);
    if (result) {
      let selectedNode = this.nodes.find(node => node.isSelected);
    }
    return this.nodes.some((node) => node.isSelected);
  }

}
