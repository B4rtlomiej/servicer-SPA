import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  mostTicketsLabels = [];
  mostTicketsData = [];
  mostTicketsChartType = 'pie';
  mostTicketsOptions = {
    title: {
      display: true,
      position: 'bottom',
      text: 'Najwięcej zamkniętych zgłoszeń'
    }
  }

  mostProductTicketsLabels = [];
  mostProductTicketsData = [];
  mostProductTicketsChartType = 'pie';
  mostProductTicketsOptions = {
    title: {
      display: true,
      position: 'bottom',
      text: 'Najwięcej zgłoszeń'
    }
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes',
    'Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33, 45, 37, 60, 70, 46, 33], label: 'Zamkniętych zgłoszeń' },
    { data: [45, 37, 60, 70, 46, 33, 45, 37, 60, 70, 46, 33], label: 'Zgłoszeń' }
  ];

  reports: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.reports = data.reports;
    });

    const agentTickets = JSON.parse(this.reports.agentTickets);
    agentTickets.forEach(ticket => {
      this.mostTicketsLabels.push(`${ticket.FirstName} ${ticket.LastName}`);
      this.mostTicketsData.push(ticket.TicketCount);
    });

    const productTickets = JSON.parse(this.reports.productTickets);
    productTickets.forEach(ticket => {
      this.mostProductTicketsLabels.push(`${ticket.Manufacturer} ${ticket.Series} ${ticket.Name}`);
      this.mostProductTicketsData.push(ticket.TicketCount);
    });

    window.dispatchEvent(new Event('resize'));
  }

}
