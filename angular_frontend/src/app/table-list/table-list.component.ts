import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { BullyEvent } from '../bully-event';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [DataServiceService]
})
export class TableListComponent implements OnInit {

  students: Student[] = [];
  bullyEvents: BullyEvent[] = [];
  recentEvents: BullyEvent[] = [];
  classroomScore: number;

  pageStart: number = 0;

  constructor(private dataService: DataServiceService) { }

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
      });
    });
    this.dataService.getBullyingEvents().subscribe(result => {
      this.bullyEvents = [];
      (<Array<any>>result).forEach(element => {
        const newEvent: BullyEvent = new BullyEvent();
        newEvent.bully = element.bully;
        newEvent.datetime = element.datetime;
        console.log(newEvent.datetime);
        newEvent.date = new Date(newEvent.datetime / 1000).toLocaleTimeString();
        newEvent.location = element.location;
        newEvent.statement = element.statement;
        newEvent.toxicity = element.toxicity;
        newEvent.victim = element.victim;
        this.bullyEvents.push(newEvent);
        this.classroomScore = 300;

      });
      console.log(this.bullyEvents.slice(this.bullyEvents.length - 10, this.bullyEvents.length - 1));
      this.recentEvents = this.bullyEvents.slice(this.bullyEvents.length - 100, this.bullyEvents.length - 1);
    });
  }

  adjustPageRight() {
    this.pageStart = this.pageStart + 10;
    if (this.pageStart + 10 > this.bullyEvents.length) {
      this.recentEvents = this.bullyEvents.slice(this.pageStart, this.bullyEvents.length - 1);
      this.pageStart = 0;
    } else {
      this.recentEvents = this.bullyEvents.slice(this.pageStart, this.pageStart + 10);
    }
  }

}
