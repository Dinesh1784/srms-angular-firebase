import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}

  // adding teacher to firebase
  addUser(
    id: any,
    name: string,
    subject: string,
    email: string,
    phone: string
  ) {
    return this.firestore.collection('teacher').doc(id).set({
      teacherName: name,
      subject: subject,
      email: email,
      phone: phone,
    });
  }
  // adding student to firebase
  addStudent(name: string, stdclass: string, rollno: string) {
    return this.firestore.collection('student').add({
      studentName: name,
      studentClass: stdclass,
      studentRollno: rollno,
    });
  }

  // getting all student from firestore
  getStudent() {
    return this.firestore.collection('student').get();
  }

  //get Current Teacher Details
  getCurrentTeacher(id: string) {
    return this.firestore.collection('teacher').doc(id).get();
  }

  //create student mark for specific teacher
  createMarkSpecific(
    id: string,
    name: string,
    stdClass: string,
    stdRegno: string,
    subject: string,
    mark: string
  ) {
    return this.firestore
      .collection('teacher')
      .doc(id)
      .collection('marks')
      .add({
        stdName: name,
        stdClass: stdClass,
        stdRegno: stdRegno,
        subject: subject,
        mark: mark,
      });
  }
  // getting all student from firestore
  getMarkSpecific(id: string) {
    return this.firestore
      .collection('teacher')
      .doc(id)
      .collection('marks')
      .get();
  }
}
