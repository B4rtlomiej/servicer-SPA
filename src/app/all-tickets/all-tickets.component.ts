import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {
  AllTickets: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllTickets();
  }
  getAllTickets() {
    this.http.get("http://localhost:5000/api/tickets").subscribe(response =>{
    this.AllTickets = response;
  }, error => {
    console.log(error);
  })
  }
}
