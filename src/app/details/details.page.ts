import { EventsService } from './../events/events.service';
import { Component, OnInit } from "@angular/core";
import { EventResponse, EmergencyEvent, Acknowledgement } from "../interfaces";
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../events/events.service';

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  eventId: number;
  eventResponse: EventResponse;
  event: EmergencyEvent;
  acknoledgments: Acknowledgement[] = [];
  newNote = '';
  
  constructor(private route: ActivatedRoute, private eventService: EventsService) {}

  async ngOnInit() {
    this.eventId = this.route.snapshot.params.eventId;
    console.log('eventId', this.eventId);
    this.eventResponse = await this.eventService.getById(this.eventId)
      .toPromise();
    this.event = this.eventResponse.event;
    this.acknoledgments = await this.eventService.getAcknowledgements(this.eventResponse).toPromise();
    
  }
}
