import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-would-you-rather',
  templateUrl: './would-you-rather.component.html',
  styleUrls: ['./would-you-rather.component.css'],
})
export class WouldYouRatherComponent implements OnInit {
  jsonData: any;
  ngOnInit() {
    this.http
      .get('http://localhost:8084/GetQuestions?questionId=1')
      .subscribe((data: any) => {
        this.jsonData = data;
      });
  }
  constructor(private http: HttpClient) {}
  updateData() {
    this.http
      .get('http://localhost:8084/GetQuestions?questionId=1')
      .subscribe((data: any) => {
        this.jsonData = data;
      });
  }
}
