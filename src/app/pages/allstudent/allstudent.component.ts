import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-allstudent',
  templateUrl: './allstudent.component.html',
  styleUrls: ['./allstudent.component.scss'],
})
export class AllstudentComponent implements OnInit {
  student: any[] = [];
  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.db.getStudent().subscribe((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.student.push(doc.data());
      });
    });
  }
}
