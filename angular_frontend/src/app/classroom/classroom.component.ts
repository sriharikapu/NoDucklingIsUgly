import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Student } from '../student';
import { BullyEvent } from '../bully-event';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
  providers: [DataServiceService]
})
export class ClassroomComponent implements OnInit {

  students: Student[] = [];
  bullyEvents: BullyEvent[] = [];
  recentEvents: BullyEvent[] = [];

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
      this.students = this.students.sort((a, b) => a.lastName.localeCompare(b.lastName));
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
          bully.incidents = bully.incidents + 1;
        });
        console.log(this.bullyEvents.slice(this.bullyEvents.length - 10, this.bullyEvents.length - 1));
      });
    });
    
  }

}
