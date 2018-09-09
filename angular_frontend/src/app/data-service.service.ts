import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from './student';
@Injectable()
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getBullyingEvents() {
    return this.http.get('http://lit-forest-54107.herokuapp.com/api/getBullyingEvents');
  }

  getRecentBullyingEvents() {
    return this.http.get('http://lit-forest-54107.herokuapp.com/api/getRecentBullyingEvents');
  }

  getBullyingEventsByStudent(id: number) {
    return this.http.get(`http://lit-forest-54107.herokuapp.com/api/getBullyingEventsByStudent/${id}`);
  }

  getBullyingEventsWithinTime(hours: number) {
    return this.http.get(`http://lit-forest-54107.herokuapp.com/api/getBullyingEventsByTime/${hours}`);
  }

  getAllStudents() {
    return this.http.get('http://lit-forest-54107.herokuapp.com/api/getStudents');
  }

  createNewStudent(student: Student) {
    return this.http.post('http://lit-forest-54107.herokuapp.com/api/logStudent', student);
  }

  updateStudent(student: Student) {
    return this.http.put('http://lit-forest-54107.herokuapp.com/api/updateStudent', student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`http://lit-forest-54107.herokuapp.com/api/deleteStudent/${id}`);
  }


}
