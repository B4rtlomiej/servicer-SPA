import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  baseURL ="http://localhost:5000/api/tickets"
  model: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  sendTicket() {
    console.log(this.model);
    return this.http.post(this.baseURL, this.model).subscribe(() => {
      console.log('sent successful');
    }, error => {
      console.log(error)
    })
  }

}
